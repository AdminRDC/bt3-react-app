// 选课管理页面
import React from 'react';
import Clock from '../day02/Clock';
import $ from 'jquery';
import '../day02/Student.css'
import { Button,Modal ,Calendar,Table} from 'antd';

class SC extends React.Component {
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
    this.loadSC();
}

delSCHandler(id){
    this.delSCById(id,({status,message})=>{
    if(status === 200){
        alert(message);
        this.loadSC();
    } else {
        alert(message);
    }
    })
}

delSCById(id,handler){
    let url = "http://203.195.246.58:8888/user/deleteUserById?id="+id;
    $.get(url,function(result){
    handler(result);
    })

}

loadSC(){
    let url = "http://203.195.246.58:8888/studentcourse/findAllWithStudentCourse";
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
    let name ="选课管理页面";
    let {stus,form} = this.state;
    let columns =[{
    title: '选课ID',
    dataIndex: 'id',
    },{
    title: '选课时间',
    dataIndex: 'chooseTime',
    },{
    title: '课程年级',
    dataIndex: 'grade',
    },{
    title: '选课学生',
    dataIndex: 'student.realname',
    },{
    title: '课程名称',
    dataIndex: 'course.name',
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

export default SC;