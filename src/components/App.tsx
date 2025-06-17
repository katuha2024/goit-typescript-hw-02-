import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMore from './LoadMore/LoadMore';
import SearchBar from './SearchBar/SearchBar';
import ImageModal from './ImageModal/ImageModal';
import { PuffLoader } from 'react-spinners';
import { getUnsplashData } from '../galleri';
import { ImgData } from '../../src/types/index';
import { useState, useEffect } from 'react';

function App() {
  const [requestPhrase, setRequestPhrase] = useState<string>('');
  const [galleryItem, setGalleryItem] = useState<ImgData[]>([]);
  const [loaderIsVisible, setLoaderIsVisible] = useState<boolean>(false);
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentShowImg, setCurrentShowImg] = useState<ImgData | null>(null);

  useEffect(() => {
    if (requestPhrase.trim() !== '') {
      setGalleryItem([]);
      setPageNumber(1);
    }
  }, [requestPhrase]);

  const showModal = (imgData: ImgData) => {
    setCurrentShowImg(imgData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    async function getData() {
      if (!requestPhrase.trim()) return;

      try {
        setLoaderIsVisible(true);
        setLoadMoreIsVisible(false);

        const data = await getUnsplashData({
          query: requestPhrase,
          page: pageNumber,
        });

      
        if (
          typeof data === 'object' &&
          data !== null &&
          'results' in data &&
          Array.isArray((data as any).results) &&
          'total_pages' in data &&
          typeof (data as any).total_pages === 'number'
        ) {
          const typedData = data as { results: ImgData[]; total_pages: number };
          if (typedData.total_pages > pageNumber) {
            setLoadMoreIsVisible(true);
          }
          setGalleryItem((prevImages) => [...prevImages, ...typedData.results]);
        } else {
          console.error('❌ Помилка: data.results не масив', data);
          setError(true);
        }
      } catch (e) {
        console.error('❌ Помилка при fetch:', e);
        setError(true);
      } finally {
        setLoaderIsVisible(false);
      }
    }

    getData();
  }, [requestPhrase, pageNumber]);

  const onSubmit = (inputPhrase: string) => {
    setPageNumber(1);
    setRequestPhrase(inputPhrase.trim());
  };

  const loadMore = () => {
    setPageNumber((prevPageNum) => prevPageNum + 1);
  };

  return (
    <>
      <SearchBar getRequestPhrase={onSubmit} />
      {galleryItem.length > 0 && (
        <ImageGallery imagesData={galleryItem} showModal={showModal} />
      )}
      {loaderIsVisible && <PuffLoader color="#1561f4" className="loader" />}
      {error && <ErrorMessage />}
      {loadMoreIsVisible && <LoadMore onLoadMore={loadMore} />}
      {modalVisible && currentShowImg && (
        <ImageModal isOpen={modalVisible} onClose={closeModal} currentImg={currentShowImg} />
      )}
    </>
  );
}

export default App;
