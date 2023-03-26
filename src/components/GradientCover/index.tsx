import {useRef, useState} from 'react';
import {groupRgbValues, quantizeColors} from '~/helpers/color';
import type {IImage} from '~/models/image';
import type { TPixelColor } from '~/helpers/color';
import styles from './styles.module.scss';

interface IGradientcoverProps {
  image: IImage
}

const GradientCover = (props: IGradientcoverProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gradientColor, setGradientColor] = useState<TPixelColor>();


  if (props.image && !gradientColor) {
    const image = new Image();
    image.src = props.image.url;
    image.crossOrigin = 'Anonymus'
    image.addEventListener('load', () => {
      if (canvasRef?.current) {
        canvasRef.current.width = props.image.width;
        canvasRef.current.height = props.image.height;

        const ctx = canvasRef.current.getContext('2d');
        ctx?.drawImage(image, 0, 0, props.image.width, props.image.height)
        const imageData = ctx?.getImageData(0, 0, props.image.width, props.image.height);

        if (imageData?.data) {
          const rgbValues = groupRgbValues(imageData.data);
          const quantiziedColors = quantizeColors(rgbValues, 1, 1);
          setGradientColor(quantiziedColors[0]);
        }
      }
    });
  }

  return (
    <div className={styles.gradient} style={gradientColor && {background: `linear-gradient(rgb(${gradientColor.r},${gradientColor.g},${gradientColor.b}) 0%, #181818 100%)`}}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}

export default GradientCover;
