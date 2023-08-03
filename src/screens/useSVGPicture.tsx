import { Skia } from '@shopify/react-native-skia';
import { useMemo } from 'react';

import { svgData } from './svg';

export const useSVGPicture = () => {
  return useMemo(() => {
    const recorder = Skia.PictureRecorder();
    const themedSVG = Skia.SVG.MakeFromString(svgData);
    if (!themedSVG) {
      return null;
    }
    const canvas = recorder.beginRecording(Skia.XYWHRect(0, 0, 48, 48));
    canvas.drawSvg(themedSVG);
    return recorder.finishRecordingAsPicture();
  }, []);
};
