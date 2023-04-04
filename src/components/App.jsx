import { Component } from "react";
import { Toaster } from 'react-hot-toast';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import css from "./App.module.css";

export class App extends Component {
  state = {
    searchWord: ""
  }
  
  handleFormSubmit = searchWord => { 
    this.setState({searchWord})
  }

  render() { 
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchWord={this.state.searchWord} />
        <Toaster position="top-right"/>
      </div>
    );
  } 
};
