import React, {Component} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import api from 'services/api-servise';
import Button from './Button/Button'
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
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName || prevState.page !== this.state.page){
      // console.log('prevState.searchName:', prevState.searchName);
      // console.log('this.state.searchName:', this.state.searchName);
      // console.log('Изменился запрос');
      
      api
      .getImages(this.state.searchName, this.state.page)
      .then(images => this.setState(prevState => ({images: [...prevState.images, ...images]})))
      .catch(console.log)
      .finally(() => this.setState ({isLoading: false}));
    }
  }

  handleFormSubmit = searchName => {
    if (searchName === this.state.searchName) return;
    this.setState({searchName: searchName, page: 1, images: [], isModalOpen: false, isLoading: true});
  }
  onLoadMore = () => {
    this.setState(() => ({ page: this.state.page +1, isLoading: true}));
};
onOpenModal = id => this.setState(prevState => ({
  isModalOpen: true,
  largeImage: prevState.images.find(image => image.id === id).largeImageURL,
  alt: prevState.images.find(image => image.id ===id).tags,
}));

onCloseModal = () => this.setState ({ isModalOpen: false});

render(){
  const { images, largeImage, alt, isModalOpen, isLoading} = this.state;

  return(
    <div className='App'>
      <Searchbar onSubmit={this.handleFormSubmit}/>
      <ImageGallery images={images} onOpenModal={this.onOpenModal}/>
      {isLoading && <Loader/>}
      {images.length > 0 && !isLoading && <Button onClick={this.onLoadMore}/>}
      {isModalOpen && <Modal largeImageURL= {largeImage} alt={alt} onCloseModal ={this.onCloseModal}/>}
      <ToastContainer autoClose={3000}/>

    </div>
  );
}
  
}
