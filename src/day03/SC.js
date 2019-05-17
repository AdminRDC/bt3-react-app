// 选课管理页面
import React from 'react';
import $ from 'jquery';
import '../day02/Student.css'
import {Button,Table} from 'antd';

global.constants = {
    //初始化批量删除id数组|全局变量
    ids : []
}

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

    delSCBanchByIdsHandler(){
        this.delSCBanchByIds(({status,message})=>{
            if(status === 200){
                alert(message);
                this.loadSC();
            } else {
                alert(message);
            }
        })
    }

    delSCById(id,handler){
        let url = "http://203.195.246.58:8888/studentcourse/deleteStudentCourseById?id="+id;
        $.get(url,function(result){
            handler(result);
        })
    }

    delSCBanchByIds(handler){
        $.ajax({
            type: "post",
            url: "http://203.195.246.58:8888/studentcourse/deleteScBanchByIds",
            contentType:"application/json",
            dataType: 'json',
            data: '['+[global.constants.ids]+']',
            success:function(result){
                handler(result);
            }
        });
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
            title: '操作',
            key: 'action',
            render: (text, record) => (
            <span>
                <Button>Update </Button>
                <Button onClick={this.delSCHandler.bind(this,record.id)}>Delete</Button>
            </span>
            )
        }]

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
        <div className='student'>
            <h2>{name}</h2>
            <Button type='danger' onClick={this.delSCBanchByIdsHandler.bind(this)}>批量删除</Button><br/>
            <Table rowKey={record => record.id} bordered={true} rowSelection={rowSelection} columns={columns} dataSource={stus} />
            {JSON.stringify(form)}
            <form>
            用户名 <input type='text' name="username" value={form.username} onChange={this.changeHandler}/>
            姓名 <input type='text' name="realname" value={form.realname} onChange={this.changeHandler}/>
            </form>
            
        </div>
        )
    }
}

export default SC;