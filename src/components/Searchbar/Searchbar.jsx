import { Component } from "react";
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import css from "./Searchbar.module.css";

class Searchbar extends Component { 
    state = {
        searchWord: "",
    }
        
    handleInputChange = evt => { 
        const searchWord = evt.target.value.toLowerCase()
        this.setState({ searchWord: searchWord })
    }  
    
    handleSubmit = evt => { 
        evt.preventDefault();

        if (this.state.searchWord.trim() === '') { 
            alert("Write a search word")
            return;
        }
        this.props.onSubmit(this.state.searchWord);
        this.setState({ searchWord: "" });
    }
     
    render() {
        return (
            <header className={css.searchBar}>
                <form onSubmit={this.handleSubmit} className={css.searchForm}>
                    <button type="submit" className={css.searchFormBtn}>
                        <BiSearch size={20}/>
                    </button>
                    <input
                        className={css.searchFormInput}
                        type="text"
                        name="searchWord"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        value={this.state.searchWord}
                        onChange={this.handleInputChange}
                    />
                </form>
            </header>) 
    }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};