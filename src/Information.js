import React, { Component } from 'react';
import LatestPost from './LatestPost.js';
import { faSmileBeam, faComment, faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Information.css';

class Information extends Component {

    _renderLatestPost = (displayName, paramName) => {
        const latestPost = <LatestPost displayName={displayName} paramName={paramName} />;
        return latestPost;
    }

    render() {
        return (
            <div className="Information">
                <div className="padtop80"></div>
                {this._renderLatestPost("빙수밭", "bingsubat")}
                {this._renderLatestPost("미네마네모", "minemanemo")}
                <div className="noti-panel marginlr20 padtop100">
                    <FontAwesomeIcon icon={faSmileBeam} />
                    <div className="noti-panel-text">
                        <div>기능 추가 문의 주세요.</div>
                        <div>언제든지 환경합니다.</div>
                    </div>
                </div>
                <div className="noti-panel-title padtop40 marginlr20">
                    Kakao Talk Plus
                </div>
                <div className="noti-panel marginlr20 padtop10">
                    <FontAwesomeIcon icon={faComment} />
                    <div className="noti-panel-text">
                        <div>빙수밭의 이것저것</div>
                        <div><a href="http://pf.kakao.com/_ZLnQT">http://pf.kakao.com/_ZLnQT</a></div>
                    </div>
                </div>
                <div className="noti-panel-title padtop40 marginlr20">
                    Tistory Blog
                </div>
                <div className="noti-panel marginlr20 padtop10">
                    <FontAwesomeIcon icon={faAddressCard} />
                    <div className="noti-panel-text">
                        <div><a href="https://bingsubat.tistory.com">https://bingsubat.tistory.com</a></div>
                        <div><a href="https://minemanemo.tistory.com">https://minemanemo.tistory.com</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Information;