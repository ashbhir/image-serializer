import React, { Component } from 'react';

const IMG_STATE = {
    idle: 0,
    loading: 1,
    loaded: 2
}

class ImageQueue {
    constructor(placeholders) {
        // all images should be unique in a single order
        this.imageQ = [];
        this.placeholders = placeholders;
    }

    allImagesLoaded(imgArr) {
        return imgArr.every((img) => {
            return img.state === IMG_STATE.loaded
        })
    }
    
    add(order, imgSrc, onLoad, placeholderIndex) {
        this.imageQ[order] = this.imageQ[order] || [];
        this.imageQ[order].push({imgSrc, onLoad, state: IMG_STATE.idle});
        let pImageSrc = null;
        if (placeholderIndex !== undefined) {
            pImageSrc = this.placeholders[placeholderIndex];
        }
        // load the placeholder image first
        onLoad(pImageSrc);
        // re-run the loop to check if any additional image needs to be downlaoded
        this.loopNext();
    }

    loopNext() {
        let order = 0;
        while(this.imageQ[order] === undefined || this.imageQ[order].length === 0 || this.allImagesLoaded(this.imageQ[order])) {
            order++;
            if (order > this.imageQ.length) {
                return;
            }
        }
        const imagesToLoad = this.imageQ[order];
        imagesToLoad.forEach(({imgSrc, onLoad, state}, imgIdx) => {

            if (state === IMG_STATE.loading || state === IMG_STATE.loaded) return;
            
            const image = new Image();
            image.onload = () => {
                this.imageQ[order][imgIdx].state = IMG_STATE.loaded;
                onLoad(imgSrc);
                
                if (this.allImagesLoaded(this.imageQ[order])) {
                    // all images for the given order have now loaded
                    // start looping for the next order
                    this.loopNext();
                }
            }
            image.onerror = () => {
                // TODO: see what can be done if image fails to load
                this.imageQ[order][imgIdx].state = IMG_STATE.loaded;

                if (this.allImagesLoaded(this.imageQ[order])) {
                    // all images for the given order have now loaded
                    // start looping for the next order
                    this.loopNext();
                }
            }
            image.src = imgSrc;
            this.imageQ[order][imgIdx].state = IMG_STATE.loading;
        });
    }
}

class ImageLoader extends Component {
    constructor(props) {
        super(props);
        if (!window.imageQ) {
            const placeholders = [
                'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640',
                'http://lorempixel.com/400/200/sports/1',
                'http://lorempixel.com/400/200/sports/2'
            ];
            window.imageQ = new ImageQueue(placeholders);
        }
        this.imageQ = window.imageQ;
        this.onImageLoad = this.onImageLoad.bind(this);
        
        this.state = {
            src: null
        };
    }
    onImageLoad(src) {
        this.setState({src});
    }
    componentDidMount() {
        this.imageQ.add(this.props.order, this.props.src, this.onImageLoad, this.props.placeholder);
    }
    render() {
        return (
            <img src={this.state.src} alt={this.props.alt}/>
        )
    }
}

export default ImageLoader;