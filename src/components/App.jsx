import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import api from 'services/api-servise';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    images: [],
    largeImage: '',
    alt: '',
    searchName: '',
    page: 1,
    isModalOpen: false,
    isLoading: false,
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      api
        .getImages(this.state.searchName, this.state.page)
        .then(response => {
          //const { hits: images, totalHits } = response;
          this.setState(prevState => ({
            images: [
              ...prevState.images,
              ...this.normalizetImage(response.hits),
            ],
            showBtn: this.state.page < Math.ceil(response.totalHits / 12),
          }));
        })
        .catch(error => {
          console.log(error.message);
          this.setState({ showBtn: false });
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  normalizetImage(hits) {
    return hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      tags,
    }));
  }
  handleFormSubmit = searchName => {
    if (searchName === this.state.searchName) return;
    this.setState({
      searchName: searchName,
      page: 1,
      images: [],
      isModalOpen: false,
      isLoading: true,
      showBtn: false,
    });
  };
  onLoadMore = () => {
    this.setState(() => ({ page: this.state.page + 1, isLoading: true }));
  };
  onOpenModal = id =>
    this.setState(prevState => ({
      isModalOpen: true,
      largeImage: prevState.images.find(image => image.id === id).largeImageURL,
      alt: prevState.images.find(image => image.id === id).tags,
    }));

  onCloseModal = () => this.setState({ isModalOpen: false });

  render() {
    const { images, largeImage, alt, isModalOpen, isLoading, showBtn } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        {isLoading && <Loader />}
        {showBtn && !isLoading && <Button onClick={this.onLoadMore} />}
        {isModalOpen && (
          <Modal
            largeImageURL={largeImage}
            alt={alt}
            onCloseModal={this.onCloseModal}
          />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
