import React from 'react';
import Clock from './Clock';
import $ from 'jquery';
import './Student.css'

class Student extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stus : [],
            form:{
                username:'',
                realname:''
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
    delStudentById(id,handler){
        let url = "http://203.195.246.58:8888/user/deleteById?id="+id;
        $.get(url,function(result){
        handler(result);
        })
    }
    loadStudent(){
        let url = "http://203.195.246.58:8888/user/findAll";
        $.get(
            url ,
            ({status,data})=>{
                if(status === 200){
                    this.setState({
                        stus:data
                    })
                }else{
                    alert('接口异常')
                }
            }
        );
    }
    render(){
        let name = "学生管理页面";
        let {stus,form} = this.state;
        return (
            <div className='student'>
                <h2>{name}</h2>
                <Clock />
                {JSON.stringify(form)}
                <form>
                用户名 <input type='text' name="username" value={form.username} onChange={this.changeHandler}/>
                姓名 <input type='text' name="realname" value={form.realname} onChange={this.changeHandler}/>
                </form>
                <table className='tbl'>
                    <thead>
                        <tr>
                            <th>编号</th>
                            <th>用户名</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stus.map((item)=>{
                                return (
                                    <tr key={item.id}>
                                        <td><input type='checkbox'></input>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.realname}</td>
                                        <td>{item.gender}</td>
                                        <td>
                                            <span onClick={this.delStudentHandler}>删除</span>
                                            <span>修改</span>
                                        </td>
                                    </tr>                
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Student;