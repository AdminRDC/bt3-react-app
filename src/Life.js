import React from 'react';

class Life extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            random : Math.random()*100,
            arr : [1,2,3,4]
        }
    }
    componentWillMount(){
        setInterval(()=>{
            this.setState({
                random : Math.random()*100,
                arr : [...this.state.arr,Math.random()]
            })
        },1000);
    }
    render(){
        let {random,arr} = this.state;
        return(
            <div>   
                <div>{random}</div>
                <ul>{arr.map((item,index)=><li key = {index}>{item}</li>)}</ul>
            </div>
        );
    }
}
export default Life;