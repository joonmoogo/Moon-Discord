import './sidebar.css';

import React, { useState, useEffect } from 'react';
import { Avatar, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import socket from '../util/socket';

function Sidebar() {
	const [setChannel, setNewchannel] = useState();


	function AddChannel() {
		const channelname = prompt('channel name?');
		setNewchannel(channelname);
	
		
		socket.emit('channel', (data) => {
			const newChannel = {
				channelname: data.channelname,
			};
			console.log(newChannel);
			setChannel(data.name)
		})
		
		let newCh = document.getElementById('newCh');
		let new_squircle = document.createElement('div');
		new_squircle.setAttribute('class', 'squircle');
		new_squircle.innerHTML = channelname;
		new_squircle.style.marginBottom = "10px";
		
		newCh.appendChild(new_squircle);
		
	}
	/*
	const btn = document.getElementById("btn1");
	if (btn) {
	  btn.addEventListener('click', AddChannel);
	}
	S	
	*/
	return (

		<div class="squircles">
			<div class="squircle">
			</div>

			<div class="divider">
			</div>

			<div id = "newCh">
			</div>

			
			

			<button onClick={AddChannel} id="btn1"  class ="button" ><AddIcon/></button>
			

		</div>



	);
}

export default Sidebar;