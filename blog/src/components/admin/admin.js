import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import Header from "../header/admin-header";
import {checkAuth} from "../../utils/auth";
import {getBlogList} from "../../utils/data"
import DataList from "../widget/datalist";
import Loading from "../widget/loading";

import "./index.less";


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: 0,
            data: [],
            p: 1,
            limit: 20,
            count: 10,
            link: '/write?id=',
            loading: false,
        };
    }

    componentDidMount() {
        checkAuth(this);
        this.getBlogs(this.state.p);
    }

    getBlogs = (p) => {
        getBlogList(this, p)
    };

    render() {
        let {from} = {from: {pathname: "/"}};
        let {auth} = this.state;

        if (auth === -1) return <Redirect to={from}/>;

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="admin">
                        <DataList handler={this}/>
                    </div>
                </div>
                {this.state.loading ? <Loading/> : null}
            </div>
        );
    }
}

export default connect(state => state)(Admin);
