import React from "react";
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Pagination from "./pagination";

function DataList(props) {
    const data = props.handler.state.data;
    const link = props.handler.state.link;
    const listItems = data.map((d) =>
        <div key={d._id} className="data-item">
            <div className="data-title title">
                <Link to={link + d._id}>{d.title}</Link>
            </div>
            <div>
                <span className="data-date sub-title">
                    <span className="data-icon">
                         <FontAwesomeIcon icon="calendar-alt"/>
                    </span>
                    {d.create_time.slice(0, 10)}
                </span>
            </div>
            <div className="data-body">
                <Link to={link + d._id}>
                    <article className="markdown-body">
                        <ReactMarkdown source={d.body.slice(0, 100)+' ...'}/>
                    </article>
                </Link>
            </div>
        </div>
    );
    return (
        <div className="data">
            {listItems}
            <Pagination handler={props.handler}/>
        </div>
    );
}

export default DataList;