//教师管理页面
import React from 'react';
import Clock from '../day02/Clock';
import $ from 'jquery';
import '../day02/Student.css'
import { Button,Modal ,Calendar,Table} from 'antd';

class Teacher extends React.Component {
constructor(props){
    super(props);
    this.state = {
visible:false,
    stus:[],
    form:{
        username:'terry',
        realname:'泰瑞'
    }
    }
}

changeHandler=(event)=>{
    let tagName = event.target.name;  
    let tagVal = event.target.value;
    console.log(tagName,tagVal);
    this.setState({
    form:{...this.state.form,...{[tagName]:tagVal}}
    })
}
componentWillMount(){
    this.loadTeacher();
}

delTeacherHandler(id){
    alert("删除")
    this.delTeacherById(id,({status,message})=>{
    if(status === 200){
        alert(message);
        this.loadTeacher();
    } else {
        alert(message);
    }
    })
}

delTeacherById(id,handler){
    alert(id,'删除')
    let url = "http://203.195.246.58:8888/user/deleteUserById?id="+id;
    $.get(url,function(result){
    handler(result);
    })

}

loadTeacher(){
    let url = "http://203.195.246.58:8888/user/findAllTeacher";
    $.get(url,({status,data})=>{
    if(status === 200){
        this.setState({
        stus:data
        })
    } else {
        alert('接口异常');
    }
    });
}

render(){
    let name ="教师管理页面";
    let {stus,form} = this.state;
    let columns =[{
    title: '教师ID',
    dataIndex: 'id',
    },{
    title: '教师姓名',
    dataIndex: 'realname',
    },{
    title: '教师性别',
    dataIndex: 'gender',
    },{
    title: '用户名',
    dataIndex: 'username',
    },{
    title: '教师状态',
    dataIndex: 'status',
    },{
        title: 'Action',
        key: 'action',
        render: (text, record) => (
        <span>
            <a href="javascript:;">Update </a>
            <span onClick="">Delete</span>
        </span>
        ),
    }]
    return (
    <div className='student'>
        <h2>{name}</h2>
}
        <Clock />
        {JSON.stringify(form)}
        <form>
        用户名 <input type='text' name="username" value={form.username} onChange={this.changeHandler}/>
        姓名 <input type='text' name="realname" value={form.realname} onChange={this.changeHandler}/>
        </form>
        <Table bordered={true} columns={columns} dataSource={stus} />
    </div>
    )
}
}

export default Teacher;