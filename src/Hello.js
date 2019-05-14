import React from 'react';
import './Hello.css';
import MyUl from './MyUl';

function Hello(){
	let data = [{
		id:1,
		name:'aa'
	},{
		id:2,
		name:'啦啦'
	}]
	return (
		<div>
			<h1 className='title'>你好 react</h1>
			<p>前端企业级框架</p>
			<MyUl data={data} />
		</div>
		);
}

export default Hello;
