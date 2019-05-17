import React from 'react';
import $ from 'jquery';
import '../day02/Student.css'
import {Button,Table} from 'antd';

global.constants = {
    //初始化批量删除id数组|全局变量
    ids : []
}

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

    changeHandler = (event)=>{
        let tagName = event.target.name; 
        let tagVal = event.target.value;
        console.log(tagName,tagVal);
        this.setState({
        form:{...this.state.form,...{[tagName]:tagVal}}
        })
    }

    //?
    componentWillMount(){
        this.loadTeacher();
    }

    delTeacherHandler(id){
        this.delTeacherById(id,({status,message})=>{
            if(status === 200){
                alert(message);
                this.loadTeacher();
            } else {
                alert(message);
            }
        })
    }

    delTeacherBanchByIdsHandler(){
        this.delTeacherBanchByIds(({status,message})=>{
            if(status === 200){
                alert(message);
                this.loadTeacher();
            } else {
                alert(message);
            }
        })
    }

    delTeacherById(id,handler){
        let url = "http://203.195.246.58:8888/user/deleteUserById?id="+id;
        $.get(url,function(result){
            handler(result);
        })
    }

    delTeacherBanchByIds(handler){
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
            title: '操作',
            key: 'action',
            render: (text, record) => (
            <span>
                <Button>Update </Button>
                <Button onClick={this.delTeacherHandler.bind(this,record.id)}>Delete</Button>
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
            <div className='student'>
                <h2>教师管理页面</h2>
                {/* 批量删除按钮 */}
                <Button type='danger' onClick={this.delTeacherBanchByIdsHandler.bind(this)}>批量删除</Button><br/>
                {/* antd表格 */}
                <Table  rowKey={record => record.id} bordered={true} rowSelection={rowSelection} columns={columns} dataSource={stus} />
                
                {JSON.stringify(form)}
                <form>
                用户名 <input type='text' name="username" value={form.username} onChange={this.changeHandler}/>
                姓名 <input type='text' name="realname" value={form.realname} onChange={this.changeHandler}/>
                </form>
            </div>
        )
    }
}

export default Teacher;