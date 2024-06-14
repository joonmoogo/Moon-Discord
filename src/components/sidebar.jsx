import './sidebar.css';

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import socket from '../util/socket';
import { Tooltip, Avatar, colors } from '@mui/material';
import { alpha } from '@mui/material';
import { userListState } from '../states/userList';
import { userState } from '../states/user';
import { useRecoilState } from 'recoil';


function Sidebar() {

	// const [currentChannel, setCurrentChannel, userList, setUserList, user, setUser, thisChannel, setThisChannel] = useGlobalState();

	const [user, setUser] = useRecoilState(userState)


	const buttonClick = (name) => {
		socket.emit('getChannel', name);
	}
	const plusButtonClick = () => {
		const channelName = prompt('channel name is?');
		// console.log({username:user.username,channelName:channelName});
		socket.emit('channel', { username: user.username, channelName: channelName });
	}

	const [isPlusButtonHovered, setIsPlusButtonHovered] = useState(false);

	const plusButtonMouseEnter = () => {
		setIsPlusButtonHovered(true);
	};

	const plusButtonMouseLeave = () => {
		setIsPlusButtonHovered(false);
	};

	const buttonStyle = {
		color: isPlusButtonHovered ? 'white' : '#23a559'
	};
	return (

		<div className="left_left_box" style={{ overflow: 'hidden' }}>
			<div className="squircle">
			</div>

			<div className="divider">
			</div>

			{user?.channels.map((channel, index) => (
				<Tooltip title={channel} placement="right">
					<div key={index} className="squircle" onClick={() => { buttonClick(channel) }}>
						{/* 채널 이름만 표시하도록 수정 */}
						{channel}
					</div>
				</Tooltip>
			))}

			<button onClick={plusButtonClick} id="btn1" className="button" onMouseEnter={plusButtonMouseEnter} onMouseLeave={plusButtonMouseLeave} ><AddIcon style={buttonStyle} /></button>

		</div>



	);
}

export default Sidebar;