import React from 'react';

import loading from '../../asset/loading.svg';


function Loading() {
    let style = {
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 100,
    };

    let data = <div className='loading'>
        <img src={loading} alt="loading" style={style}/>
        <div className="bg"></div>
    </div>;
    return data
}

export default Loading;
