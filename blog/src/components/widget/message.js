import React from 'react';

import './index.less'

function Message(props) {
    let data = <div className={"message " + (props.data.status ? 'success' : 'fail')}>
        <div className="message-content sub-title">
            {props.data.data}
        </div>
    </div>;
    return data
}

export default Message;
