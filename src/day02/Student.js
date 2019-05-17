// 学生管理页面
import React from 'react';
import Clock from './Clock';
import $ from 'jquery';
import './Student.css'
import { Button,Modal ,Calendar,Table} from 'antd';

class Student extends React.Component {
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
    this.loadStudent();
}

delStudentHandler(id){
    this.delStudentById(id,({status,message})=>{
    if(status === 200){
        alert(message);
        this.loadStudent();
    } else {
        alert(message);
    }
    })
}

  // ajax操作，通过id删除学生
delStudentById(id,handler){
    let url = "http://203.195.246.58:8888/user/deleteUserById?id="+id;
    $.get(url,function(result){
    handler(result);
    })

}

  // ajax操作，加载学生信息
loadStudent(){
    // 查询所有学生信息，将学生信息保存到state
    let url = "http://203.195.246.58:8888/user/findAllStudent";
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
    let name ="学生管理页面";
    let {stus,form} = this.state;
    let columns =[{
    title: '学生ID',
    dataIndex: 'id',
    },{
    title: '学生姓名',
    dataIndex: 'realname',
    },{
    title: '学生性别',
    dataIndex: 'gender',
    },{
    title: '用户名',
    dataIndex: 'username',
    },{
    title: '学生状态',
    dataIndex: 'status',
    }]
    return (
    <div className='student'>
        <h2>{name}</h2>
}

        <Clock />
        ---{JSON.stringify(form)}
        <form>
        用户名 <input type='text' name="username" value={form.username} onChange={this.changeHandler}/>
        姓名 <input type='text' name="realname" value={form.realname} onChange={this.changeHandler}/>
        </form>
        <Table bordered={true} columns={columns} dataSource={stus} />
    </div>
    )
}
}

export default Student;