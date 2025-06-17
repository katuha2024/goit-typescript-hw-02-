import mycss from './ImageModal.module.css';
import Modal from 'react-modal';
import { SlClose } from "react-icons/sl";
import { IoInformationCircleOutline } from "react-icons/io5";
import type { ImgData } from '../../types/index';


Modal.setAppElement("#root");

interface ImageModalProps {
  onClose: () => void;
  currentImg: ImgData;
  isOpen: boolean;
}

export default function ImageModal({ onClose, currentImg, isOpen }: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      contentLabel="Beautiful picture"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "0",
          border: "none",
          overflow: "visible",
          maxWidth: "100vw",
          maxHeight: "100vh",
          backgroundColor: "transparent",
        },
        overlay: {
          backgroundColor: "rgba(41, 11, 123, 0.75)",
          zIndex: 999,
        },
    
      }}
    >
      <button
        type="button"
        className={mycss.closeBtn}
        onClick={onClose}
        title="Close modal"
        aria-label="Close modal"
      >
        <SlClose />
      </button>

      <div className={mycss.thumb}>
        <img src={currentImg.urls.regular} alt={currentImg.alt_description} />
        <div className={mycss.inform}>
          <p><strong>Author: </strong>{currentImg.user.name}</p>
          <p><strong>Likes: </strong>{currentImg.likes}</p>
          <p><strong>Description: </strong>{currentImg.description}</p>
          <p>
            <a
              href={currentImg.links.download}
              target='_blank'
              download={`${currentImg.slug}.jpg`}
              rel="noreferrer"
            >
              Download
            </a>
          </p>
          <IoInformationCircleOutline style={{ width: "36px", height: "auto" }} />
        </div>
      </div>
    </Modal>
  );
}