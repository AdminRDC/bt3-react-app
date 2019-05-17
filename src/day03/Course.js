import React from 'react';
import $ from 'jquery';
import {Button,Table} from 'antd';

global.constants = {
    //初始化批量删除id数组|全局变量
    ids : []
}

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

changeHandler = (event)=>{
    let tagName = event.target.name;  
    let tagVal = event.target.value;
    console.log(tagName,tagVal);
    this.setState({
    form:{...this.state.form,...{[tagName]:tagVal}}
    })
}

delCourseHandler(id){
    this.delCourseById(id,({status,message})=>{
        if(status === 200){
            alert(message);
            this.loadCourses();
        } else {
            alert(message);
        }
    })
}

delCourseBanchByIdsHandler(){
    this.delCourseBanchByIds(({status,message})=>{
        if(status === 200){
            alert(message);
            this.loadCourses();
        } else {
            alert(message);
        }
    })
}

// 根据ID删除课程信息
delCourseById(id,handler){
    let url = "http://203.195.246.58:8888/course/deleteCourseById?id="+id;
    $.get(url,function(result){
        handler(result);
    })
}

// 根据ID批量删除课程信息
delCourseBanchByIds(handler){
    $.ajax({
        type: "post",
        url: "http://203.195.246.58:8888/course/deleteCourseBanchByIds",
        contentType:"application/json",
        dataType: 'json',
        data: '['+[global.constants.ids]+']',
        success:function(result){
            handler(result);
        }
    });
}

// 加载课程信息
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

// 数据初始化
componentWillMount(){
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

// from表单提交更新操作(未完善)
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
        title: '操作',
        key: 'action',
        render: (text, record) => (
        <span>
            <Button>Update </Button>
            <Button onClick={this.delCourseHandler.bind(this,record.id)}>Delete</Button>
        </span>
        )
    }]

    //行选择器
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            //遍历selectedRows拿到id集合
            global.constants.ids = [];
            for(let i=0;i<selectedRows.length;i++){
                let {id} = selectedRows[i];
                global.constants.ids.push(id);
            }
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
        })
    }

    return (
    <div className="course">
        <h2>课程管理</h2>
        {/* 批量删除按钮 */}
        <Button type='danger' onClick={this.delCourseBanchByIdsHandler.bind(this)}>批量删除</Button><br/>
        {/* antd表格 */}
        <Table rowKey={record => record.id} bordered={true} rowSelection={rowSelection} columns={columns} dataSource={courses} />
        {/* form表单 */}
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
    </div>
    ) 
}
}

export default Course;