import React from "react";
import {Redirect} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Header from "../header/admin-header";
import {checkAuth} from "../../utils/auth";
import {getBlogDetail} from "../../utils/data";
import Message from '../widget/message';
import Loading from "../widget/loading";

import "./write.less";
import "github-markdown-css/github-markdown.css"
import {connect} from "react-redux";

class AdminWrite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: 0,
            blogBody: "",
            blogTitle: "",
            blogLanguage: "en",
            blogType: "",
            blogTag: [],
            blogSave: false,
            blogId: "",
            blogCreateDate: "",
            isNew: true,
            message: {},
            loading: false,
            writeStyle: {},
            formStyle: {},
        };
    }

    componentDidMount() {
        checkAuth(this);
        this.boxResponse();
        let queryDict = {};
        window.location.search.substr(1).split("&").forEach(function (item) {
            queryDict[item.split("=")[0]] = item.split("=")[1]
        });
        if (queryDict.id) {
            this.setState({isNew: false});
            this.setState({blogId: queryDict.id});
            this.getBlog(queryDict.id);
        }
    }

    blogBodyChange = (event) => {
        this.setState({blogBody: event.target.value});
    };
    blogTitleChange = (event) => {
        this.setState({blogTitle: event.target.value});
    };
    blogLanguageChange = (event) => {
        this.setState({blogLanguage: event.target.value});
    };
    blogTypeChange = (event) => {
        this.setState({blogType: event.target.value});
    };
    blogTagChange = (event) => {
        this.setState({blogTag: event.target.value});
    };

    boxResponse() {
        let height = window.innerHeight - 66;
        height = height > 300 ? height : 300;
        height = height + "px";
        let writeStyle = {
            height
        };

        let width = window.innerWidth / 2 - 200;
        let left = width + "px";
        let top = (window.innerHeight) / 4 + "px";
        let formStyle = {
            left: left,
            top: top,
        };
        this.setState({formStyle});
        this.setState({writeStyle});
    }

    getBlog(id) {
        getBlogDetail(this, id);
    }

    save = () => {
        this.setState({blogSave: true});
    };
    close = () => {
        this.setState({blogSave: false});
    };
    submit = () => {
        let formdata = {
            title: this.state.blogTitle,
            body: this.state.blogBody,
            type: this.state.blogType,
            tag: this.state.blogTag,
            language: this.state.blogLanguage,
            isnew: this.state.isNew,
            _id: this.state.blogId,
        };
        let message = {
            data: "",
            status: 0
        };
        this.setState({message: message});

        if (!formdata.body) {
            message.data = "blog";
            message.status = 0;
            this.setState({message: message});
            return
        } else if (!formdata.title) {
            message.data = "title";
            message.status = 0;
            this.setState({message: message});
            return
        }

        fetch("/api/blog", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.status) {
                        message.data = result.msg;
                        message.status = 1;
                        this.setState({message: message});
                        this.setState({blogId: result.data._id});
                        this.setState({isNew: false});
                    } else {
                        message.data = "fail!";
                        message.status = 0;
                        this.setState({message: message});
                    }
                },
                (error) => {
                    message.data = "http error!";
                    message.status = 0;
                    this.setState({message: message});
                }
            )
    };
    delete = (id) => {
        let r = window.confirm("You will delete this blog!");
        if (!r) {
            return
        }

        let formdata = {
            id
        };

        fetch("/api/blog", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.status) {
                        alert("success")
                    } else {
                        alert("fail")
                    }
                },
                (error) => {
                    alert("http error")
                }
            )
    };

    render() {
        let {from} = {from: {pathname: "/"}};
        let {auth} = this.state;

        if (auth === -1) return <Redirect to={from}/>;

        return (
            <div>
                <Header/>
                <div className="write" style={this.state.writeStyle}>
                    <div className="write-box">
                        <div className="write-input">
                            <div className="button save-button"
                                 onClick={this.save}
                            >Save
                            </div>
                            <div className="button delete-button"
                                 onClick={() => this.delete(this.state.blogId)}
                            >Delete
                            </div>

                            <textarea placeholder="new blog" type="text"
                                      onChange={this.blogBodyChange}
                                      value={this.state.blogBody}>
                            </textarea>
                            {this.state.blogSave ?
                                <div>
                                    <div className="write-form-bg" onClick={this.close}></div>
                                    <div className="write-form" style={this.state.formStyle}>
                                        <div>
                                            <input type="text" placeholder="title"
                                                   onChange={this.blogTitleChange}
                                                   value={this.state.blogTitle}/>
                                        </div>
                                        <div>
                                            <input type="text" placeholder="type"
                                                   onChange={this.blogTypeChange}
                                                   value={this.state.blogType}/>
                                        </div>
                                        <div>
                                            <input type="text" placeholder="tag"
                                                   onChange={this.blogTagChange}
                                                   value={this.state.blogTag}/>
                                        </div>
                                        <div>
                                            <input type="text" placeholder="language"
                                                   onChange={this.blogLanguageChange}
                                                   value={this.state.blogLanguage}/>
                                        </div>

                                        {this.state.message.data ? <Message data={this.state.message}/> : null}

                                        <div className="button"
                                             onClick={this.submit}
                                        >
                                            Submit
                                        </div>

                                        <div className="write-form-close" onClick={this.close}>
                                            <FontAwesomeIcon icon="times"/>
                                        </div>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>

                    <div className="write-box">
                        <div className="write-item">
                            <article className="markdown-body">
                                <ReactMarkdown source={this.state.blogBody}/>
                            </article>
                        </div>
                    </div>
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        );
    }
}

export default connect(state => state)(AdminWrite);
