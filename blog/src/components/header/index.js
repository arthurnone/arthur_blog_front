import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import './index.less'

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signout: false,
        };
    }

    signOut = () => {
        let url = "/api/signout";
        fetch(url);
        this.setState({signout: true});
        this.props.dispatch({
            type: 'LOGIN', data: {
                user: "",
                nickname: "",
                auth: false
            }
        });
    };

    render() {
        let auth = this.props.user.auth;

        let { from } = { from: { pathname: "/signin" } };
        let { signout } = this.state;

        if (signout) return <Redirect to={from} />;

        return (
            <header>
                {/*<img src={process.env.PUBLIC_URL + '/star.svg'} className="App-logo" alt="logo"/>*/}
                <div className="header">
                    <div className="header-name title">Arthur None</div>

                    <div className="header-box">
                        <Link className="header-item title-2" to="/">Home</Link>
                        {/*<Link className="header-item title-2" to="/tech">Tech</Link>*/}
                        {/*<Link className="header-item title-2" to="/fun">Fun</Link>*/}
                        <Link className="header-item title-2" to="/me">Me</Link>
                        {auth ?
                            <Link className="header-item title-2" to="/admin">Admin</Link> : null}
                    </div>

                    {!auth ?
                        <div className="header-button">
                            <Link className="button" to="/signin">Sign in</Link>
                        </div> : null}
                    {auth ?
                        <div className="header-button">
                            <div className="button out-button" onClick={this.signOut}>Sign out</div>
                        </div> : null}
                </div>
            </header>
        );
    }
}


export default connect(state => state)(Index);
