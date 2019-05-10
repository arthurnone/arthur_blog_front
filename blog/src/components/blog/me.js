import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Header from "../header/index";

import telegram from '../../asset/icon/telegram-brands.svg';
import skype from '../../asset/icon/skype-brands.svg';

class Me extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {},
        };
    }

    componentDidMount() {
        let height = window.innerHeight / 3;
        height = height > 100 ? height : 100;
        let margin = height + 'px auto';
        let style = {
            margin
        };
        this.setState({style});
    }


    render() {
        let {style} = this.state;

        return (
            <div className="home">
                <Header/>
                <div className="container">
                    <div className="me" style={style}>
                        <div className="item title-2">
                            <span className="icon">
                                <FontAwesomeIcon icon="envelope"/>
                            </span>
                            root@arthurnone.com
                        </div>
                        <div className="item title-2">
                            <span className="icon">
                                <img src={telegram} alt="telegram"/>
                            </span>
                            root@arthurnone.com
                        </div>
                        <div className="item title-2">
                            <span className="icon">
                                <img src={skype} alt="skype"/>
                            </span>
                            root@arthurnone.com
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Me;
