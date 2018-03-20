import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ImageSerialized from './components/image-serializer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <ImageSerialized src="//cdn.grofers.com/app/images/promotions/merchant/1520594932_AK_2622_web.jpg" placeholder="0" order="1" afterReady/>
          <ImageSerialized src="//cdn.grofers.com/app/images/promotions/merchant/1520591605_AB-2254-web.jpg" placeholder="0" order="1"/>
          <ImageSerialized src="https://grofers.com/images/banners/default-banner-db44597.jpg" placeholder="0" order="1"/> 
        </div>
        
        <ImageSerialized src="//cdn.grofers.com/app/images/promotions/merchant/1520750513_Spoon_web.jpg" placeholder="0" order="2"/>
        <ImageSerialized src="//cdn.grofers.com/app/images/promotions/merchant/1520485014_SSD_March_Paytm_web.jpg" placeholder="0" order="2"/>
        <ImageSerialized src="//cdn.grofers.com/app/images/promotions/merchant/1520483056_SSD_March_web.jpg" placeholder="0" order="2"/>
        <ImageSerialized src="//cdn.grofers.com/app/images/promotions/merchant/1520484853_SSD_March_Mobikwik_web.jpg" placeholder="0" order="3" lazy/>
        <ImageSerialized src="//cdn.grofers.com/app/images/promotions/merchant/1520594932_AK_2622_web.jpg" placeholder="0" order="3"/>
      </div>
    );
  }
}

export default App;
