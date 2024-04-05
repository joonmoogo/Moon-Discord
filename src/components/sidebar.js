import './sidebar.css';
import React from 'react';
import { Avatar } from '@mui/material';

function Sidebar() {

  return (
    <nav>
	<ul class="squircles">
		
  <li class="squircle">
  </li>
		<li class="divider"></li>
		<li class="squircle">
        <Avatar alt="" src=""></Avatar>
		<div class ="text-box">
			<h4 class="text">home</h4>
		</div>
		</li>
		<li class="squircle">
        <Avatar alt="" src=""></Avatar>
		<div class ="text-box">
			<h4 class="text">channel</h4>
		</div>
		</li>
		<li class="squircle">
        <Avatar alt="" src=""></Avatar>
		<div class ="text-box">
			<h4 class="text">channel</h4>
		</div>
		</li>
		<li class="squircle">
        <Avatar alt="" src=""></Avatar>
		<div class ="text-box">
			<h4 class="text">add channel</h4>
		</div>
		</li>
	</ul>
</nav>
    
   
  );
}

export default Sidebar;