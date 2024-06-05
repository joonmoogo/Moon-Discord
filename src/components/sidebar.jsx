import './sidebar.css';

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import socket from '../util/socket';
import { Tooltip,Avatar } from '@mui/material';
import { alpha } from '@mui/material';

function Sidebar() {
	const [channelName, setChannelName] = useState();
	const [channels, setChannels] = useState([]);
	
	useEffect(() => {
		// 소켓을 통해 서버로부터 받은 채널 데이터를 처리하는 이벤트 핸들러
		socket.on('channel', (data) => {
			console.log(data);
			// 받은 채널 데이터를 channels 배열에 추가
			setChannels([...channels, data]);
		});

		return () => {
			socket.off('channel');
		};

	}, [channels]);

	useEffect(()=>{
		socket.on('user',(data)=>{
			const channel = data.channels;
			let arr = [];
			for(let i =0; i<channel.length; i++){
				arr.push(
					{
						channelName:channel[i]
					}
				)
			}
			setChannels(arr);
		})
	},[])

	function AddChannel() {
		const inputchannelname = prompt('channel');
		if (inputchannelname) {
			setChannelName(inputchannelname);
			socket.emit('channel', { channelName: inputchannelname });
			const localData = window.localStorage.getItem('id');
			const parsedData = JSON.parse(localData);
			socket.emit('channelJoin', {
				username: parsedData.username,
				channelName: inputchannelname
			})
		}
	}



	return (

		<div class="left_left_box" style={{overflow:'hidden'}}>
			<div class="squircle">
			</div>

			<div class="divider">
			</div>

			{channels.map((channel, index) => (
				<Tooltip title={channel.channelName} placement="right">
				<div key={index} className="squircle" onClick={()=>{
					console.log('button was clicked')
					socket.emit('getChannel',{channelName:channel.channelName})
					}}>
					{/* 채널 이름만 표시하도록 수정 */}
					<Avatar sx={{bgcolor: (theme) => alpha(theme.palette.common.white, 0.0)}}>{channel.channelName}</Avatar>
					
				</div>
				</Tooltip>
			))}

			<button onClick={AddChannel} id="btn1" class="button" ><AddIcon /></button>
			
		</div>



	);
}

export default Sidebar;