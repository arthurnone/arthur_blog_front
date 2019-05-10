import React from 'react';
import {Redirect} from 'react-router-dom'

import md5 from 'js-md5';

import Message from '../widget/message';

import './index.less';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            username: "",
            password: "",
            code: "",
            message: {
                data: "",
                status: true
            },
            loginStyle: {},
        };

        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.codeChange = this.codeChange.bind(this);
    }

    componentDidMount() {
        let height = window.innerHeight;
        let margin_height = (height - 400) / 2;
        margin_height = margin_height > 20 ? margin_height : 20;
        let margin = margin_height + "px auto";
        let loginStyle = {
            margin
        };
        this.setState({loginStyle});
    }

    usernameChange(event) {
        this.setState({username: event.target.value});
    }

    passwordChange(event) {
        this.setState({password: event.target.value});
    }

    codeChange(event) {
        this.setState({code: event.target.value});
    }

    SingIn = () => {
        let formdata = {
            username: this.state.username,
            password: this.state.password,
            code: this.state.code
        };
        let message = {
            data: "",
            status: 1
        };
        if (!formdata.username) {
            message.data = "username";
            message.status = 0;
            this.setState({message: message});
            return
        } else if (!formdata.password) {
            message.data = "password";
            message.status = 0;
            this.setState({message: message});
            return
        } else if (!formdata.code) {
            message.data = "code";
            message.status = 0;
            this.setState({message: message});
            return
        }

        let hash = md5.create();
        hash.update(formdata.password);
        formdata.password = hash.hex();

        this.setState({message: message});
        this.setState({login: false});

        fetch("/api/signin", {
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
                        this.setState({login: true});
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

    render() {
        let {from} = {from: {pathname: "/admin"}};
        let {login} = this.state;

        if (login) return <Redirect to={from}/>;

        return (
            <div className="login" style={this.state.loginStyle}>
                <div className="login-box">
                    {/*<div><img src={process.env.PUBLIC_URL + '/icon.png'} alt=""/></div>*/}
                    <div className="title">Sign in</div>

                    <div>
                        <input type="text" placeholder="USERNAME"
                               onChange={this.usernameChange}
                               value={this.state.username}/>
                    </div>
                    <div>
                        <input type="password" placeholder="PASSWORD"
                               onChange={this.passwordChange}
                               value={this.state.password}/>
                    </div>
                    <div>
                        <input type="text" placeholder="CODE: 1984"
                               onChange={this.codeChange}
                               value={this.state.code}/>
                    </div>

                    {this.state.message.data ? <Message data={this.state.message}/> : null}

                    <div className="button" onClick={this.SingIn}>Sign In</div>
                </div>
            </div>
        );
    }
}

export default Login;
