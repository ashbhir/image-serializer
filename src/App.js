import React, { Component } from 'react';

const IMG_STATE = {
    idle: 0,
    loading: 1,
    loaded: 2
}

class ImageQueue {
    constructor() {
        // all images should be unique in a single order
        this.imageQ = [];
    }

    allImagesLoaded(imgArr) {
        return imgArr.every((img) => {
            return img.state === IMG_STATE.loaded
        })
    }
    
    add(order, imgSrc, onLoad, pImageSrc) {
        this.imageQ[order] = this.imageQ[order] || [];
        this.imageQ[order].push({imgSrc, onLoad, state: IMG_STATE.idle});
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

/**
 * @name ImageSerializer
 * @description This class handles the ordering of images
 * @argument {*} props
 * @author ashbhir
 */
class ImageSerializer extends Component {

    /**
     * @constructor
     * @param {*} props
     */
    constructor(props) {
        super(props);

        if (!window.imageQ) {
            window.imageQ = new ImageQueue();
        }
        this.imageQ = window.imageQ;
        this.onImageLoad = this.onImageLoad.bind(this);
        
        this.state = {
            src: null
        };
    }

    /**
     * @name onImageLoad
     * @param {*} src
     * @method ImageSerializer
     */
    onImageLoad(src) {
        this.setState({src});
    }

    /**
     * @name componentDidMount
     * @description Once component successfully mounted add the image to Queue
     * @method ImageSerializer
     */
    componentDidMount() {
        this.imageQ.add(this.props.order, this.props.src, this.onImageLoad, this.props.placeholder);
    }

    /**
     * @name render
     * @description renders the component
     * @method ImageSerializer
     */
    render() {
        return (
            <img src={this.state.src} alt={this.props.alt}/>
        )
    }
}

export default ImageSerializer;