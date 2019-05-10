import React from 'react';
import {Redirect} from "react-router-dom";
import Header from "../header/index"
import DataList from "../widget/datalist";
import {getBlogList} from "../../utils/data"
import Loading from "../widget/loading";

import "./index.less"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: 0,
            data: [],
            p: 1,
            limit: 20,
            count: 10,
            link: '/page/',
            loading: false,
        };
    }

    componentDidMount() {
        this.getBlogs(this.state.p);
    }

    getBlogs = (p) => {
        getBlogList(this, p);
    };

    render() {
        let {from} = {from: {pathname: "/"}};
        let {auth} = this.state;

        if (auth === -1) return <Redirect to={from}/>;

        return (
            <div className="home">
                <Header/>
                <div className="container">
                    <DataList handler={this}/>
                </div>
                {this.state.loading ? <Loading /> : null}
            </div>
        );
    }
}

export default Home;
