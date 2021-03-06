import isEqual from 'lodash.isequal';

export default function isSameHotspot(hotspot0, hotspot1) {
  return Object.is(hotspot0, hotspot1) || isEqual(hotspot0, hotspot1);
}
