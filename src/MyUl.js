import React from 'react';
import jquery from 'jquery';


function MyUl(props){
	// props用于获取父组件在调用当前组件的参数
	let {data} = props;
	return (
		<div className='myul'>
			hello ,
			<div>{JSON.stringify(props)}</div>
			<ul>
				{
					data.map(item=><li>
					<span>{item.id}</span>
					<span>{item.name}</span>
					</li>)
				}
			</ul>
		</div>


		);
}

export default MyUl;