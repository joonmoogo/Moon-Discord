import './sidebar.css';

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import socket from '../util/socket';
import { Tooltip,Avatar } from '@mui/material';
import { alpha } from '@mui/material';
import { useGlobalState } from '../util/globalState';

function Sidebar() {

	const [currentChannel, setCurrentChannel, userList, setUserList, user, setUser,thisChannel,setThisChannel] = useGlobalState();

	const buttonClick = (name) =>{
		socket.emit('getChannel',name);
	}
	const plusButtonClick = () =>{
		const channelName = prompt('channel name is?');
		// console.log({username:user.username,channelName:channelName});
		socket.emit('channel',{username:user.username,channelName:channelName});
	}
	return (

		<div className="left_left_box" style={{overflow:'hidden'}}>
			<div className="squircle">
			</div>

			<div className="divider">
			</div>

			{user?.channels.map((channel, index) => (
				<Tooltip title={channel} placement="right">
				<div key={index} className="squircle" onClick={()=>{buttonClick(channel)}}>
					{/* 채널 이름만 표시하도록 수정 */}
					<Avatar sx={{bgcolor: (theme) => alpha(theme.palette.common.white, 0.0)}}>{channel}</Avatar>
				</div>
				</Tooltip>
			))}

			<button onClick={plusButtonClick} id="btn1" className="button" ><AddIcon /></button>
			
		</div>



	);
}

export default Sidebar;