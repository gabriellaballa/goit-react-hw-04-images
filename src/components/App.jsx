import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

const API_KEY = '39874564-0f11a439c7c25eb7f8c6d4ea1';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pixabay.com/api/?q=${searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        setImages(data.hits);
        setTotalHits(data.totalHits);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery !== '') {
      fetchData();
    }
  }, [searchQuery]);

  const loadMore = async () => {
    try {
      if (page * 12 < totalHits && totalHits > 0) {
        setLoading(true);
        const response = await fetch(
          `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        setImages(prevImages => [
          ...prevImages,
          ...data.hits.filter(
            newImage =>
              !prevImages.some(oldImage => oldImage.id === newImage.id)
          ),
        ]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={query => setSearchQuery(query)} />
      <ImageGallery images={images} openModal={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <Button onClick={loadMore} label="Load More" />
      )}
      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
