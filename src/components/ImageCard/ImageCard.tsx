import mycss from './ImageCard.module.css';
import type { ImgData } from '../../types/index';

// interface ImgData {
//   id: string;
//   alt_description: string;
//   urls: {
//     small: string;
//     regular: string;
//   };
// }

interface ImageCardProps {
  imgData: ImgData;
  showModal: (imgData: ImgData) => void;
}

export default function ImageCard({ imgData, showModal }: ImageCardProps) {
  const handleOpenModal = () => {
    showModal(imgData);
  };

  return (
    <div className={mycss.container}>
      <img
        onClick={handleOpenModal}
        src={imgData.urls.small}
        alt={imgData.alt_description}
      />
    </div>
  );
}