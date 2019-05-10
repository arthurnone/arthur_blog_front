let checkAuth = (handler) => {
    if(handler.props.user.auth){
        handler.setState({auth: 1});
        return
    }

    fetch("/api/auth")
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status) {
                    let user = result.data;
                    user.auth = true;
                    handler.props.dispatch({type: 'LOGIN', data: user});
                    handler.setState({auth: 1});
                } else {
                    handler.setState({auth: -1});
                }
            },
            (error) => {
                handler.setState({auth: -1});
            }
        )
};

export {checkAuth};