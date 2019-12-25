import React, { Component } from 'react';
import './Menu.css';
import logo from './spooncast.png';
import ci from './bingsubat-ci.png';

class Menu extends Component {

    render() {
        return (
            <div className="Menu" >
                <img className="ci" src={logo} alt="test" style={{width: '60px'}}/>
                <img className="ci bottom-ci" src={ci} alt="test" style={{width: '60px'}}/>
            </div>
        )
    }
}

export default Menu;