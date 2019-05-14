import React from 'react';

function UserInfo (props){
    let {usser} = props;
    if(user) {
        return (
            <div className="userinfo">
            <din>
                欢迎您，{user.name}
            </din>
        </div>
        )
    }
    return (
        <a href="#">请登录</a>
    //    <a href="#">注册</a>
    )
}

export default UserInfo;