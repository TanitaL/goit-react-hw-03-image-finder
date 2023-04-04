import { Component } from "react";
import { toast } from "react-hot-toast";
import { getImages } from "services/fetch";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import css from "./ImageGallery.module.css";

export default class ImageGallery extends Component {
    state = {
        images: [],
        isLoading: false,
        page: 1,
        totalHits: 0
    }

    changePage = () => {
        this.setState((prevState) => {
            return { page: prevState.page + 1 }
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const prevSearchWord = prevProps.searchWord;
        const nextSearchWord = this.props.searchWord;

        if (prevSearchWord !== nextSearchWord) {
            this.setState({ page: 1, images: [] })
        }

        if ((prevSearchWord !== nextSearchWord && nextSearchWord) ||
            (prevState.page !== this.state.page)) {
            
            this.setState({ isLoading: true })
            getImages(nextSearchWord, this.state.page).then((data) => {
                if (data.status === "error") return Promise.reject(data.message)
                this.setState((prevState) => {
                    return {
                        totalHits: data.totalHits,
                        images: [...prevState.images, ...data.hits]
                    }
                })
                if (!data.totalHits) {
                    toast.error('Sorry, no images')
                }
                else toast.success(`Found ${data.totalHits} images`)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.setState({ isLoading: false })
            })
        }   
    }

    render() {
        const { images, isLoading, totalHits } = this.state
        return (
            <>
                {isLoading && <Loader />}
                {images.length > 0 && (
                    <ul className={css.imageGallery}>
                        {images.map(({ id, webformatURL, largeImageURL }) => {
                            return (
                                <ImageGalleryItem
                                    key={id}
                                    webformatURL={webformatURL}
                                    largeImageURL={largeImageURL}
                                />
                            )
                        })}
                    </ul>
                )}
    
                {images.length !== totalHits && <Button changePage={this.changePage} />}
            </>
        )
    }
}