import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../components/blog/home";
import Page from "../components/blog/page";
import Me from "../components/blog/me";
import Login from "../components/auth/login";
import Admin from "../components/admin/admin";
import AdminWrite from "../components/admin/write";


function AppRouter() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/tech" component={Home}/>
                <Route path="/fun/" component={Home}/>
                <Route path="/me/" component={Me}/>
                <Route path="/page/:id" component={Page}/>

                <Route path="/admin" component={Admin}/>
                <Route path="/write" component={AdminWrite}/>

                <Route path="/signin/" component={Login}/>
            </div>
        </Router>
    );
}

export default AppRouter;