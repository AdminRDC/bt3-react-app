import React from 'react';
import './App.css';
import Student from './Student';
import Course from './day03/Course';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';


function App() {
	return (
		<div className="App">
			<heder>
			学生选课系统
			</heder>
			<BrowserRouter>
				<ul>
					<li><Link to='./student'>学生管理</Link></li>
					<li><Link to='./course'>课程管理</Link></li>
				</ul>
			<Switch>
				<Route path='./student' component={Student} />
				<Route path='./course' component={Course} />
			</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
