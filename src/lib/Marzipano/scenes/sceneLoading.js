import Marzipano from 'marzipano';

const defaultResolution = 5376;
const defaultFov = (Math.PI * 1) / 3;
const defaultViewParams = { yaw: 0, pitch: 0, roll: 0, defaultFov };
const defaultViewLimiter = Marzipano.RectilinearView.limit.traditional(
  defaultResolution,
  defaultFov
);
const defaultLevels = [{ width: defaultResolution }];

const loadScene = viewer => sceneSpec => {
  const { imageUrl, type } = sceneSpec;

  const levels = sceneSpec.levels || defaultLevels;

  const viewParams = sceneSpec.viewParams || defaultViewParams;
  const viewLimiter = sceneSpec.viewLimiter || defaultViewLimiter;
  const view = new Marzipano.RectilinearView(viewParams, viewLimiter);

  const geometry =
    type === 'equirect'
      ? new Marzipano.EquirectGeometry(levels)
      : new Marzipano.CubeGeometry(levels);
  const source =
    typeof imageUrl === 'function'
      ? new Marzipano.ImageUrlSource(imageUrl)
      : Marzipano.ImageUrlSource.fromString(imageUrl);

  return viewer.createScene({ source, geometry, view });
};

const unloadScene = viewer => scene => {
  viewer.destroyScene(scene);
};

let currentListener = null;

function switchScene(viewer, scene, transitionDuration, onLoad = null) {
  if (viewer && scene) {
    if (onLoad) {
      if (currentListener) {
        viewer.stage().removeEventListener('renderComplete', currentListener);
      }
      currentListener = onLoad;
      viewer.stage().addEventListener('renderComplete', onLoad);
    }

    scene.switchTo({ transitionDuration });
  }
}
export { loadScene, unloadScene, switchScene };
