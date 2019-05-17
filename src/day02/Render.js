import React from 'react';
import UserInfo from './UserInfo'

function Render(){
  let msg = "hello Render"
  let arr = ["terry",'larry','tom'];
  let user = {name:'terry',photo:'terry.jpg'}
  return (
    <div>
      {/* 条件渲染 */}
      <UserInfo user={user}/>
      {/* 基本渲染 */}
      <h2>{msg}</h2>
      {/* 列表渲染 */}
      <ul>
        {
          arr.map((item,index) => <li key={index}>{item}</li>)
        }
      </ul>
    </div>
  )
}
export default Render;
