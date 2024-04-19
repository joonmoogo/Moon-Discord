import './sidebar.css';

import React from 'react';
import { Avatar, Box } from '@mui/material';

function Sidebar() {

	return (

		<div class="squircles">
			<div class="squircle">
			</div>
			<div class="divider"></div>
			<div class="squircle">
				<Avatar alt="" src=""></Avatar>
			</div>
			<div class="squircle">
				<Avatar alt="" src=""></Avatar>
			</div>
			<div class="squircle">
				<Avatar alt="" src=""></Avatar>
			</div>
			<div class="squircle">
				<Avatar alt="" src=""></Avatar>
			</div>
		</div>


	);
}

export default Sidebar;