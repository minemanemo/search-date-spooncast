import React, { Component } from 'react';
import axios from 'axios';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './LatestPost.css';


class LatestPost extends Component {
    state = {
        posting: []
    }

    componentDidMount() {
        this.getBlogInfo();
    }

    _callapi = () => {
        const blogname = this.props.paramName;
        const url = 'http://219.248.50.231:8099/tistory/' + blogname;
        const data = axios.get(url)
        .then(function (response) {
            const { data } = response;
            return data;
        })
        .catch(function (error) {
            console.log(error);
        })
        ;
        return data;
    }

    getBlogInfo = async () => {
        const bloginfo = await this._callapi();
        const { posts } = bloginfo;

        this.setState({
            posting: posts.slice(0,5)
        });
    }

    getTitle = () => {
        const title = this.props.displayName + " 블로그 최신 글";
        return title;
    }

    getList = (list) => {
        const postings = this.state.posting;
        const listItem = postings.map((post, index) =>
            <li key={index}><a href={post.postUrl}>{post.title}</a></li>
        );
        return (
            <ul>{listItem}</ul>
        );
    }

    render() {
        return (
            <div className="LatestPost">
                <div className="title">
                    <FontAwesomeIcon icon={faEdit} />
                    {this.getTitle()}
                </div>
                {this.getList()}
            </div>
        )
    }
}

export default LatestPost;