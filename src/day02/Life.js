import React from 'react';

class Life extends React.Component {
  constructor(props){
    super(props);
    console.log("--constructor--");
    this.state = {
      random : Math.random()*100,
      arr:[1,2,3,4]
    }
  }
  
  // ajax操作，准备数据阶段
  componentWillMount(){
    console.log('--componentWillMount--');
    setInterval(() => {
      this.setState({
        random:Math.random()*100 ,
        arr: [...this.state.arr,Math.random()] 
      })
    }, 1000);
  }

  render(){
    console.log("--render--");
    let {random,arr} = this.state;
    return (
      <div>
        <div>{random}</div>
        <ul>
        {arr.map( (item,index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

export default Life;