import React, { Component } from 'react';
import Menu from './Menu.js';
import SearchDate from './SearchDate.js';
import Information from './Information.js';
import './Contents.css';

class Contents extends Component {

    _renderMenu = () => {
        const menu = <Menu />;
        return menu;
    }

    _renderSearchDate = () => {
        const searchDate = <SearchDate />;
        return searchDate;
    }

    _renderInformation = () => {
        const information = <Information />;
        return information;
    }

    render() {
        return (
            <div className="Contents">
                {this._renderMenu()}
                {this._renderSearchDate()}
                {this._renderInformation()}
            </div>
        )
    }
}

export default Contents;

