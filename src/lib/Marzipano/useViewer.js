import { useEffect, useState } from 'react';
import MarzipanoLib from 'marzipano';

const viewerOpts = {
  controls: {
    mouseViewMode: 'drag', // drag|qtvr
  },
};

function useViewer(container) {
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    if (container === null) {
      throw TypeError(
        'Container cannot be null, or viewer will not be initialized'
      );
    }
    if (container && container.current && viewer === null) {
      setViewer(new MarzipanoLib.Viewer(container.current, viewerOpts));
    }

    return () => {
      if (viewer !== null) {
        viewer.destroy();
        setViewer(null);
      }
    };
  }, [viewer, container]);

  return viewer;
}

export default useViewer;
