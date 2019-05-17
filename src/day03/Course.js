import React from 'react';
import $ from 'jquery';
import {Form,Input,Button,Table} from 'antd';


class Course extends React.Component {
constructor(){
    super();
    this.state = {
    teachers:[],
    courses:[],
    form:{
        name:"",
        credit:"",
        description:"",
        teacherId:""
    }
    }
}
loadTeachers(){
    let url = "http://203.195.246.58:8888/user/findAllTeacher"
    $.get(url,({status,message,data})=>{
    if(status === 200){
        this.setState({
        teachers:data,
        form:{
            ...this.state.form,
            ...{teacherId:data[0].id}
        }
        })
    } else {
        alert(message);
    }
    });}
loadCourses(){
    $.get("http://203.195.246.58:8888/course/findAllWithTeacher",({status,message,data})=>{
    if(status === 200){
        this.setState({
        courses:data
        })
    } else {
        alert(message);
    }
    });
}
  // 网络初始化
componentWillMount(){
    this.loadTeachers();
    this.loadCourses();
}
  // 将input上的状态映射到组件state中
changeHandler = (event)=>{
    let name = event.target.name;// name/description/credit
    let val = event.target.value;
    this.setState({
    form:{...this.state.form,...{[name]:val}}
    })
}

  // 提交
submitForm = (event)=>{
    // 1. 获取表单数据
    alert(JSON.stringify(this.state.form));
    // 2. 调用后台代码完成保存
    let url = "http://203.195.246.58:8888/course/saveCourse?id=15&name=2&description=2&credit=32&teacherId=2"
    $.post(url,this.state.form,({status,message})=>{
    alert(message);
    this.loadCourses();
    })
    event.preventDefault();
}

render(){
	let {teachers,courses, form} = this.state;
    let columns =[{
    title: '课程ID',
    dataIndex: 'id',
    },{
    title: '课程名称',
    dataIndex: 'name',
    },{
    title: '课程学分',
    dataIndex: 'credit',
    },{
    title: '课程简介',
    dataIndex: 'description',
    },{
    title: '任课教师',
    dataIndex: 'teacher.realname',
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
    <div className="course">
        <h2>课程管理</h2>
        {/* 表单 */}
        {JSON.stringify(form)}
        <form onSubmit={this.submitForm}>
        课程名称
        <input type="text" name="name" value={form.name} onChange={this.changeHandler}/> <br/>
        课程学分
        <input type="text" name="credit" value={form.credit} onChange={this.changeHandler}/> <br/>
        课程简介
        <textarea name="description" value={form.description} onChange={this.changeHandler}></textarea> <br/>
        任课老师
        <select name="teacherId" value={form.teacherId} onChange={this.changeHandler}>
            {
            teachers.map((item)=>{
                return <option key={item.id} value={item.id}>{item.realname}</option>
            })
            }
        </select> <br/>
        <input type="submit" value="提交"/>
        </form>
        {/* 课程信息 */}
        <Table bordered={true} columns={columns} dataSource={courses} />
    </div>
    ) 
}
}

export default Course;