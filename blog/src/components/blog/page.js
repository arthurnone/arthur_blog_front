import React from 'react';
import ReactMarkdown from "react-markdown";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Header from "../header/index"
import {getBlogDetail} from "../../utils/data";
import Loading from "../widget/loading";


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogBody: "",
            blogCreateDate: "",
            blogTitle: "",
            blogLanguage: "en",
            blogType: "",
            blogTag: [],
            blogId: "",
            loading: false,
        };
    }

    componentDidMount() {
        const bid = this.props.match.params.id;
        getBlogDetail(this, bid);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="blog">
                        <div className="title">{this.state.blogTitle}</div>
                        <div className="date b-txt">
                            <span className="icon">
                                <FontAwesomeIcon icon="calendar-alt"/>
                            </span>
                            {this.state.blogCreateDate}
                        </div>
                        <div>
                            <article className="markdown-body">
                                <ReactMarkdown source={this.state.blogBody}/>
                            </article>
                        </div>
                    </div>
                </div>
                {this.state.loading ? <Loading /> : null}
            </div>
        );
    }
}

export default Page;
