import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import type { ImgData } from '../../types/index';

interface ImageGalleryProps {
  imagesData: ImgData[];
  showModal: (imgData: ImgData) => void;
}

export default function ImageGallery({ imagesData, showModal }: ImageGalleryProps) {
  return (
    <ul className={css.container}>
      {imagesData.map((imgItem) => (
        <li key={imgItem.id}>
          <ImageCard imgData={imgItem} showModal={showModal} />
        </li>
      ))}
    </ul>
  );
}
