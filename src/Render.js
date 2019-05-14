import React from 'react';
// import UserInfo from './UserInfo';
import Student from './Student';
import Life from './Life'


function Render(){
    let msg = "hello"
    let arr = ["1","2","3"]
    // let user = {name:"terry"}
    return (
        <div>
            {/* <Life /> */}
            {/* <UserInfo user={user}></UserInfo> */}
            {/* {基本渲染} */}
                {/* <h2>{msg}</h2> */}
            {/* {列表渲染} */}
            {/* <ul>
                {
                    arr.map((item,index) => <li key={index}>{item}</li>)
                }
            </ul> */}
           
        </div> 
    )
}

export default Render;