// 学生管理页面
import React from 'react';
import $ from 'jquery';
import './Student.css'
import {Button,Table} from 'antd';

global.constants = {
    //初始化批量删除id数组|全局变量
    ids : []
}


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
    delStudentBanchByIdsHandler(){
        this.delStudentBanchByIds(({status,message})=>{
            if(status === 200){
                alert(message);
                this.loadStudent();
            } else {
                alert(message);
            }
        })
    }

    delStudentById(id,handler){
        let url = "http://203.195.246.58:8888/user/deleteUserById?id="+id;
        $.get(url,function(result){
            handler(result);
        })
    }

    delStudentBanchByIds(handler){
        $.ajax({
            type: "post",
            url: "http://203.195.246.58:8888/user/deleteUserBanchByIds",
            contentType:"application/json",
            dataType: 'json',
            data: '['+[global.constants.ids]+']',
            success:function(result){
                handler(result);
            }
        });
    }

    loadStudent(){
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
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
            <span>
                <Button>Update </Button>
                <Button onClick={this.delStudentHandler.bind(this,record.id)}>Delete</Button>
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
            <Button type='danger' onClick={this.delStudentBanchByIdsHandler.bind(this)}>批量删除</Button><br/>
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

export default Student;