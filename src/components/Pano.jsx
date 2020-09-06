import React, { useRef, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Marzipano from 'marzipano';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import linkImg from '../assets/img/link.png';
import fullScreeenImg from '../assets/img/fullscreen.png';
import windowedImg from '../assets/img/windowed.png';
import upImg from '../assets/img/up.png';
import downImg from '../assets/img/down.png';
import infoImg from '../assets/img/info.png';
import closeImg from '../assets/img/close.png';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const buttonMixin = css`
  height: 3em;
  width: 3em;
  background-color: green;

  > img {
    height: 100%;
    width: 100%;
    padding: 5%;
  }
`;

const FullScreenToggle = styled.button`
  ${buttonMixin}
  position: absolute;
  right: 0;
  z-index: 5;
`;

const Controls = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  right: 50%;
  bottom: 0;
  transform: translateX(50%);
  z-index: 5;
`;

const ViewUpElement = styled.button`
  ${buttonMixin}
  margin-right: 1em;
`;

const ViewDownElement = styled.button`
  ${buttonMixin}
`;

const Pano = ({
  data: {
    settings: { mouseViewMode },
    scenes,
  },
}) => {
  const viewerRef = useRef(null);

  const viewUpElement = useRef(null);
  const viewDownElement = useRef(null);

  const handle = useFullScreenHandle();

  const toggleFullScreen = useCallback(() => {
    if (!handle.active) handle.enter();
    if (handle.active) handle.exit();
  }, [handle]);

  useEffect(() => {
    const viewerOpts = {
      controls: { mouseViewMode },
    };

    const viewer = new Marzipano.Viewer(viewerRef.current, viewerOpts);

    //  const sanitize=(s)=> {
    //    return s
    //      .replace('&', '&amp;')
    //      .replace('<', '&lt;')
    //      .replace('>', '&gt;');
    //  }

    // const updateSceneName=(scene) =>{
    //   sceneNameElement.innerHTML = sanitize(scene.data.name);
    // }

    const switchScene = scene => {
      // stopAutorotate();
      scene.view.setParameters(scene.data.initialViewParameters);
      scene.scene.switchTo();
      // startAutorotate();
      // updateSceneName(scene);
      // updateSceneList(scene);
    };

    // Prevent touch and scroll events from reaching the parent element.
    const stopTouchAndScrollEventPropagation = element => {
      const eventList = [
        'touchstart',
        'touchmove',
        'touchend',
        'touchcancel',
        'wheel',
        'mousewheel',
      ];

      for (let i = 0; i < eventList.length; i++) {
        element.addEventListener(eventList[i], event => {
          event.stopPropagation();
        });
      }
    };

    const findSceneById = id => {
      for (let i = 0; i < panoScenes.length; i++) {
        if (panoScenes[i].data.id === id) {
          return panoScenes[i];
        }
      }
      return null;
    };

    const findSceneDataById = id => {
      for (let i = 0; i < scenes.length; i++) {
        if (scenes[i].id === id) {
          return scenes[i];
        }
      }
      return null;
    };

    const createLinkHotspotElement = hotspot => {
      // Create wrapper element to hold icon and tooltip.
      const wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('link-hotspot');

      // Create image element.
      const icon = document.createElement('img');
      icon.src = linkImg;
      icon.classList.add('link-hotspot-icon');

      // Set rotation transform.
      const transformProperties = [
        '-ms-transform',
        '-webkit-transform',
        'transform',
      ];
      for (let i = 0; i < transformProperties.length; i++) {
        const property = transformProperties[i];
        icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
      }

      // Add click event handler.
      wrapper.addEventListener('click', () => {
        switchScene(findSceneById(hotspot.target));
        // console.log(hotspot.target);
        // setCurrentScene(hotspot.target);
      });

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      stopTouchAndScrollEventPropagation(wrapper);

      // Create tooltip element.
      const tooltip = document.createElement('div');
      tooltip.classList.add('hotspot-tooltip');
      tooltip.classList.add('link-hotspot-tooltip');
      tooltip.innerHTML = findSceneDataById(hotspot.target).name;

      wrapper.appendChild(icon);
      wrapper.appendChild(tooltip);

      return wrapper;
    };

    const createInfoHotspotElement = hotspot => {
      // Create wrapper element to hold icon and tooltip.
      const wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('info-hotspot');

      // Create hotspot/tooltip header.
      const header = document.createElement('div');
      header.classList.add('info-hotspot-header');

      // Create image element.
      const iconWrapper = document.createElement('div');
      iconWrapper.classList.add('info-hotspot-icon-wrapper');
      const icon = document.createElement('img');
      icon.src = infoImg;
      icon.classList.add('info-hotspot-icon');
      iconWrapper.appendChild(icon);

      // Create title element.
      const titleWrapper = document.createElement('div');
      titleWrapper.classList.add('info-hotspot-title-wrapper');
      const title = document.createElement('div');
      title.classList.add('info-hotspot-title');
      title.innerHTML = hotspot.title;
      titleWrapper.appendChild(title);

      // Create close element.
      const closeWrapper = document.createElement('div');
      closeWrapper.classList.add('info-hotspot-close-wrapper');
      const closeIcon = document.createElement('img');
      closeIcon.src = closeImg;
      closeIcon.classList.add('info-hotspot-close-icon');
      closeWrapper.appendChild(closeIcon);

      // Construct header element.
      header.appendChild(iconWrapper);
      header.appendChild(titleWrapper);
      header.appendChild(closeWrapper);

      // Create text element.
      const text = document.createElement('div');
      text.classList.add('info-hotspot-text');
      text.innerHTML = hotspot.text;

      // Place header and text into wrapper element.
      wrapper.appendChild(header);
      wrapper.appendChild(text);

      // Create a modal for the hotspot content to appear on mobile mode.
      const modal = document.createElement('div');
      modal.innerHTML = wrapper.innerHTML;
      modal.classList.add('info-hotspot-modal');
      document.body.appendChild(modal);

      const toggle = () => {
        wrapper.classList.toggle('visible');
        modal.classList.toggle('visible');
      };

      // Show content when hotspot is clicked.
      wrapper
        .querySelector('.info-hotspot-header')
        .addEventListener('click', toggle);

      // Hide content when close icon is clicked.
      modal
        .querySelector('.info-hotspot-close-wrapper')
        .addEventListener('click', toggle);

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      stopTouchAndScrollEventPropagation(wrapper);

      return wrapper;
    };

    const panoScenes = scenes.map(data => {
      const { id, initialViewParameters, levels, faceSize } = data;

      // You need use a URL hosted with pictures /tiles
      // const urlPrefix = '//www.marzipano.net/media';
      const urlPrefix = 'tiles';
      const source = Marzipano.ImageUrlSource.fromString(
        urlPrefix + '/' + id + '/{z}/{f}/{y}/{x}.jpg',
        { cubeMapPreviewUrl: urlPrefix + '/' + id + '/preview.jpg' }
      );

      const limiter = Marzipano.RectilinearView.limit.traditional(
        faceSize,
        (100 * Math.PI) / 180,
        (120 * Math.PI) / 180
      );

      const view = new Marzipano.RectilinearView(
        initialViewParameters,
        limiter
      );

      const geometry = new Marzipano.CubeGeometry(levels);

      const scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true,
      });

      // Create link hotspots.
      data.linkHotspots.forEach(hotspot => {
        const element = createLinkHotspotElement(hotspot);
        scene
          .hotspotContainer()
          .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });

      // Create info hotspots.
      data.infoHotspots.forEach(hotspot => {
        const element = createInfoHotspotElement(hotspot);
        scene
          .hotspotContainer()
          .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });

      return {
        data: data,
        scene: scene,
        view: view,
      };
    });

    // Display the initial scene.
    panoScenes[0].scene.switchTo();

    const iframespot = document.createElement('div');

    iframespot.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/PKHSGYDU6Ek" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    // Get the hotspot container for scene.
    const container = panoScenes[0].scene.hotspotContainer();

    // Create hotspot with different sources.
    container.createHotspot(
      iframespot,
      { yaw: 0.0335, pitch: -0.102 },
      { perspective: { radius: 800, extraTransforms: 'rotateX(5deg)' } }
    );

    // Dynamic parameters for controls.
    const velocity = 0.7;
    const friction = 3;

    // Associate view controls with elements.
    const controls = viewer.controls();

    controls.registerMethod(
      'upElement',
      new Marzipano.ElementPressControlMethod(
        viewUpElement.current,
        'y',
        -velocity,
        friction
      ),
      true
    );

    controls.registerMethod(
      'downElement',
      new Marzipano.ElementPressControlMethod(
        viewDownElement.current,
        'y',
        velocity,
        friction
      ),
      true
    );

    // controls.registerMethod(
    //   'leftElement',
    //   new Marzipano.ElementPressControlMethod(
    //     viewLeftElement,
    //     'x',
    //     -velocity,
    //     friction
    //   ),
    //   true
    // );
    // controls.registerMethod(
    //   'rightElement',
    //   new Marzipano.ElementPressControlMethod(
    //     viewRightElement,
    //     'x',
    //     velocity,
    //     friction
    //   ),
    //   true
    // );
    // controls.registerMethod(
    //   'inElement',
    //   new Marzipano.ElementPressControlMethod(
    //     viewInElement,
    //     'zoom',
    //     -velocity,
    //     friction
    //   ),
    //   true
    // );
    // controls.registerMethod(
    //   'outElement',
    //   new Marzipano.ElementPressControlMethod(
    //     viewOutElement,
    //     'zoom',
    //     velocity,
    //     friction
    //   ),
    //   true
    // );
  }, [scenes, mouseViewMode]);

  return (
    <FullScreen handle={handle}>
      <Wrapper ref={viewerRef}>
        <FullScreenToggle onClick={toggleFullScreen}>
          {!handle.active ? (
            <img src={fullScreeenImg} alt="fullscreen" />
          ) : (
            <img src={windowedImg} alt="windowed" />
          )}
        </FullScreenToggle>
        <Controls>
          <ViewUpElement ref={viewUpElement}>
            <img src={upImg} alt="up" />
          </ViewUpElement>
          <ViewDownElement ref={viewDownElement}>
            <img src={downImg} alt="down" />
          </ViewDownElement>
        </Controls>
      </Wrapper>
    </FullScreen>
  );
};

Pano.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memo(Pano);
