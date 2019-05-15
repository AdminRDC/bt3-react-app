import React from 'react';
import $ from 'jquery';
class Course extends React.Component{
    constructor(){
        super();
        this.state = {
            teachers:[],
            form:{
                name:'',
                credits:'',
                description:'',
                teacherId:''
            }
        }
    }
componentWillMount(){
    let url = "http://203.195.246.58:8888/user/findAll";
        $.get(
            url ,
            ({status,data,message})=>{
                if(status === 200){
                    this.setState({
                        teachers:data,
                        form:{...this.state.form,...{teacherId:data[0].id}}
                    })
                }else{
                    alert(message)
                }
            }
        );
}
changeHandler = (event) =>{
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
        form:{...this.state.form,...{[name]:value}}
    })
}
submitForm = (event) => {
    // $.post(
    //     url,
    //     this
    // )
    event.preventDefault();
}
render(){
    let {teachers,form} = this.state;
    return(
        <div className="course">
            <h2>课程管理</h2>
            {JSON.stringify(form)}
            <form>
                课程名称
                <input type="text" name="name" value={form.name} onChange={this.changeHandler}></input><br></br>
                课程学分
                <input type="text" name="credits" value={form.credits} onChange={this.changeHandler}></input><br></br>
                课程简介
                <textarea name="description" value={form.description} onChange={this.changeHandler}></textarea><br></br>
                任课教师
                <select name="teacherId" value={form.teacherId} onChange={this.changeHandler}></select><br></br>
                <button type="submit">提交</button>
            </form>
        </div>
    )
}
}
export default Course;