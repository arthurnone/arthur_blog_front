const user = (state = {
    user: "",
    nickname: "",
    auth: false
}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        default:
            return state
    }
}

export default user