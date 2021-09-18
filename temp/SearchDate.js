import React, { Component } from 'react';
import axios from 'axios';
import './SearchDate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import CircularProgress from '@material-ui/core/CircularProgress';

class SearchDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: '',
            keyword: '',
            loading: 'hide-loading',
        };
        this.onClickSendBtn = this.onClickSendBtn.bind(this);
        this.onChangeKeywordInputBar = this.onChangeKeywordInputBar.bind(this);
        this.onKeyPressKeywordInputBar = this.onKeyPressKeywordInputBar.bind(this);
    }

    _callApi = () => {
        const url = 'http://219.248.50.231:8099/spoon/searchDateJoin';
        const { keyword } = this.state;
        const header = {
            'Content-type': 'application/x-www-form-urlencoded'
        };
        this.setState({ loading: 'loading' });
        const data = axios.post(url, {
            header,
            params: { keyword }
        })
        .then(function (response) {
            const { data } = response;
            console.log(data);
            return data;
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
        return data;
    }

    onChangeKeywordInputBar(e) {
        this.setState({
            keyword: e.target.value
        })
    }

    onKeyPressKeywordInputBar(e) {
        if (e.key === 'Enter') {
            this.formatContents();
        }
    }


    onClickSendBtn(e) {
        e.preventDefault();
        this.formatContents();
        console.log(this.state.contents);
    }

    formatContents = async () => {
        const contents = await this._callApi();
        const { nickname, date_joined } = contents;
        const formed = decodeURI(nickname) + "의 가입 날짜는 " + date_joined + "입니다.";
        this.setState({ loading: 'hide-loading' });
        this.setState({
            contents: nickname === "" || nickname === undefined ? "검색되지 않습니다." : formed
        });
    }

    getLoadingClass = () => {
        const classname =  this.state.iscomplete ? 'hide-loading' : 'loading';
        return classname;
    }

    render() {
        return (
            <div className="SearchDate">

                <div className="MainPanel">
                    <div className="TitlePanel">
                        <span className="title">Search Date</span>
                        <span className="description">고유 닉네임으로 가입 날짜를 조회 합니다.</span>
                    </div>
                    <div className="ControlPanel">
                        <div className="search">
                            <input 
                                type="text"
                                name="send-keyword"
                                placeholder="닉네임의 @ 이후부터 입력해주세요"
                                value={this.state.keyword}
                                onChange={this.onChangeKeywordInputBar}
                                onKeyPress={this.onKeyPressKeywordInputBar}
                            ></input>
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                onClick={this.onClickSendBtn}
                            />
                        </div>
                        <div className="result">
                            <CircularProgress 
                                className={this.state.loading}
                                color="secondary" 
                            />
                            {this.state.contents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchDate;
