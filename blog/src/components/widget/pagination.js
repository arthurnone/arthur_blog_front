import React from "react";

function Pagination(props) {
    let page = props.handler.state.p;
    let limit = props.handler.state.limit;
    let count = props.handler.state.count;
    let totalPage = parseInt(count / limit);
    let min, max;
    let pagelist = [];
    min = page - 4;
    min = min > 0 ? min : 1;
    max = min + 9;
    max = totalPage > max ? max : totalPage;

    for (let i = min; i < max + 1; i++) {
        pagelist.push(i)
    }
    const listItems = pagelist.map((p) =>
        <div key={p}
             className={"page-item b-txt " + (p === page ? 'page-active' : '')}
             onClick={() => props.handler.getBlogs(p)}
        >
            {p}
        </div>
    );
    return (
        <div className="page">
            {listItems}
        </div>
    );
}

export default Pagination;