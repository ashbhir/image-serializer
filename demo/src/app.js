import React from 'react';
import { render } from 'react-dom';
import ImageSerializer from '../../dist/index';

class App extends React.Component {
    render() {
        const placeholder = "http://www.tbaf.org.tw/event/2016safe/imgs/loader1.gif";
        const images = [
            { src: "https://images7.alphacoders.com/333/333198.jpg", order: "1" },
            { src: "https://images5.alphacoders.com/570/570618.jpg", order: "2" },
            { src: "https://images2.alphacoders.com/238/238870.jpg", order: "2" },
            { src: "https://images3.alphacoders.com/191/19177.jpg", order: "2" },
            { src: "https://images2.alphacoders.com/521/521718.jpg", order: "2" },
            { src: "https://images5.alphacoders.com/587/587323.jpg", order: "3" },
            { src: "https://images8.alphacoders.com/570/570189.jpg", order: "3" },
            { src: "https://images7.alphacoders.com/333/333205.jpg", order: "3" },
            { src: "https://images2.alphacoders.com/521/521718.jpg", order: "3" }
        ];
        return (
            <div>
                {
                    images.map(({src, order}, index) => (
                        <ImageSerializer src={src} order={order} placeholder={placeholder} key={index}/>
                    ))
                }
            </div>
        );
    }
}

export default App;

render(
    <App/>, document.getElementById('root')
)