module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IMG_STATE = {
    idle: 0,
    loading: 1,
    loaded: 2
};

var ImageQueue = function () {
    function ImageQueue() {
        _classCallCheck(this, ImageQueue);

        // all images should be unique in a single order
        this.imageQ = [];
    }

    _createClass(ImageQueue, [{
        key: 'allImagesLoaded',
        value: function allImagesLoaded(imgArr) {
            return imgArr.every(function (img) {
                return img.state === IMG_STATE.loaded;
            });
        }
    }, {
        key: 'add',
        value: function add(order, imgSrc, onLoad, pImageSrc) {
            this.imageQ[order] = this.imageQ[order] || [];
            this.imageQ[order].push({ imgSrc: imgSrc, onLoad: onLoad, state: IMG_STATE.idle });
            // load the placeholder image first
            onLoad(pImageSrc);
            // re-run the loop to check if any additional image needs to be downlaoded
            this.loopNext();
        }
    }, {
        key: 'loopNext',
        value: function loopNext() {
            var _this = this;

            var order = 0;
            while (this.imageQ[order] === undefined || this.imageQ[order].length === 0 || this.allImagesLoaded(this.imageQ[order])) {
                order++;
                if (order > this.imageQ.length) {
                    return;
                }
            }
            var imagesToLoad = this.imageQ[order];
            imagesToLoad.forEach(function (_ref, imgIdx) {
                var imgSrc = _ref.imgSrc,
                    onLoad = _ref.onLoad,
                    state = _ref.state;


                if (state === IMG_STATE.loading || state === IMG_STATE.loaded) return;

                var image = new Image();
                image.onload = function () {
                    _this.imageQ[order][imgIdx].state = IMG_STATE.loaded;
                    onLoad(imgSrc);

                    if (_this.allImagesLoaded(_this.imageQ[order])) {
                        // all images for the given order have now loaded
                        // start looping for the next order
                        _this.loopNext();
                    }
                };
                image.onerror = function () {
                    // TODO: see what can be done if image fails to load
                    _this.imageQ[order][imgIdx].state = IMG_STATE.loaded;

                    if (_this.allImagesLoaded(_this.imageQ[order])) {
                        // all images for the given order have now loaded
                        // start looping for the next order
                        _this.loopNext();
                    }
                };
                image.src = imgSrc;
                _this.imageQ[order][imgIdx].state = IMG_STATE.loading;
            });
        }
    }]);

    return ImageQueue;
}();

/**
 * @name ImageSerializer
 * @description This class handles the ordering of images
 * @argument {*} props
 * @author ashbhir
 */


var ImageSerializer = function (_Component) {
    _inherits(ImageSerializer, _Component);

    /**
     * @constructor
     * @param {*} props
     */
    function ImageSerializer(props) {
        _classCallCheck(this, ImageSerializer);

        var _this2 = _possibleConstructorReturn(this, (ImageSerializer.__proto__ || Object.getPrototypeOf(ImageSerializer)).call(this, props));

        if (!window.imageQ) {
            window.imageQ = new ImageQueue();
        }
        _this2.imageQ = window.imageQ;
        _this2.onImageLoad = _this2.onImageLoad.bind(_this2);

        _this2.state = {
            src: null
        };
        return _this2;
    }

    /**
     * @name onImageLoad
     * @param {*} src
     * @method ImageSerializer
     */


    _createClass(ImageSerializer, [{
        key: 'onImageLoad',
        value: function onImageLoad(src) {
            this.setState({ src: src });
        }

        /**
         * @name componentDidMount
         * @description Once component successfully mounted add the image to Queue
         * @method ImageSerializer
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.imageQ.add(this.props.order, this.props.src, this.onImageLoad, this.props.placeholder);
        }

        /**
         * @name render
         * @description renders the component
         * @method ImageSerializer
         */

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('img', { src: this.state.src, alt: this.props.alt });
        }
    }]);

    return ImageSerializer;
}(_react.Component);

exports.default = ImageSerializer;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);