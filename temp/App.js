import React, { Component } from 'react';
import Contents from './Contents.js';
import Copyright from './Copyright.js';
import './App.css';

class App extends Component {
  state = {}

  _renderContents = () => {
    const contents = <Contents />;
    return contents;
  }

  _renderCopyright = () => {
    const copyright = <Copyright />;
    return copyright;
  }

  render() {
    return (
      <div className="App" >
        {this._renderContents()}
        {this._renderCopyright()}
      </div>
    );
  }
}

export default App;