const getBlogList = (handler, p) => {
    handler.setState({loading: true});
    let url = "/api/blog?q=1&p=" + p;

    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                handler.setState({loading: false});
                if (result.status === 1) {
                    handler.setState({data: result.data});
                    handler.setState({p: result.page.p});
                    handler.setState({limit: result.page.limit});
                    handler.setState({count: result.page.count});
                } else {
                    console.warn("api fail.")
                }
            },
            (error) => {
                handler.setState({loading: false});
                console.warn("http error")
            }
        )
};


const getBlogDetail = (handler, id) => {
    handler.setState({loading: true});
    let url = "/api/blog?q=0&id=" + id;

    fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                handler.setState({loading: false});
                if (result.status === 1) {
                    if (result.data.tag) {
                        let tag = result.data.tag.join(" ");
                        handler.setState({blogTag: tag});
                    }
                    handler.setState({blogTitle: result.data.title});
                    handler.setState({blogBody: result.data.body});
                    handler.setState({blogType: result.data.type});
                    handler.setState({blogLanguage: result.data.language});
                    handler.setState({blogCreateDate: result.data.create_time});
                } else {
                    console.warn("api fail.")
                }
            },
            (error) => {
                handler.setState({loading: false});
                console.warn("http error")
            }
        )
};

export {getBlogList, getBlogDetail}