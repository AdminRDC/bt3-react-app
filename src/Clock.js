import React from 'react';

class Clock extends React.Component {
    //重写构造函数时要显示调用super
    constructor(props){
        super(props);
        //初始化state
        this.state = {
            new:new Date().toLocaleString()
        }
        // 每隔一秒改变state.now
        setInterval(() =>{
            // this.state.now =new Date().toLocaleString();
            this.setState({
                now:new Date().toLocaleString()
            })
        },1000);

    }

    render(){
        let {now} = this.state;
        return (
            <div>当前时间:{now}</div>
        )
    }
}

export default Clock;