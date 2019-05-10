import React from 'react';
import {Link, Redirect} from "react-router-dom";

class AdminHeader extends React.Component {
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
    };

    render() {
        let { from } = { from: { pathname: "/signin" } };
        let { signout } = this.state;

        if (signout) return <Redirect to={from} />;

        return (
            <header>
                <div className="header admin-header">
                    <div className="header-name title">Arthur None</div>

                    <div className="header-box">
                        <Link className="header-item title-2" to="/">Home</Link>
                        <Link className="header-item title-2" to="/admin">Admin</Link>
                        <Link className="header-item title-2" to="/write">Write</Link>
                    </div>
                    <div className="header-button">
                        <div className="button out-button" onClick={this.signOut}>Sign out</div>
                    </div>
                </div>
            </header>
        );
    }
}


export default AdminHeader;
