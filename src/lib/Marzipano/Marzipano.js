import React, { useRef } from 'react';
import styles from './Marzipano.css';
import useMarzipano from './useMarzipano';

export default function Marzipano(props) {
  const viewerCanvas = useRef(null);
  const className = props.className || '';
  const style = props.style || {};
  useMarzipano(viewerCanvas, props);

  return (
    <div
      className={`${styles.viewerCanvas} ${className}`}
      ref={viewerCanvas}
      style={style}
    />
  );
}
