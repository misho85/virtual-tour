import MarzipanoLib from 'marzipano';
import useViewer from './useViewer';
import { useScenes } from './scenes';
import { useHotspots } from './hotspots';

function useMarzipano(viewerCanvas, props) {
  // Viewer initialization
  const viewer = useViewer(viewerCanvas);

  const {
    scenes: sceneSpecs,
    hotspots: hotspotSpecs,
    onLoad,
    settings,
  } = props;

  if (settings && settings.autorotateEnabled) {
    const autorotate = MarzipanoLib.autorotate({
      yawSpeed: 0.03, // Yaw rotation speed
      targetPitch: 0, // Pitch value to converge to
      targetFov: Math.PI / 2, // Fov value to converge to
    });
    // Start autorotation immediately
    viewer && viewer.startMovement(autorotate);
  }

  // Scene Loading
  const [scenes, currentScene] = useScenes(viewer, sceneSpecs, onLoad);

  // Hotspot Loading
  const hotspotContainer =
    currentScene && currentScene.hotspotContainer
      ? currentScene.hotspotContainer()
      : null;
  const hotspots = useHotspots(hotspotContainer, hotspotSpecs);
}

export default useMarzipano;
