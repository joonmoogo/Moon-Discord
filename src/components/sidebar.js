import './sidebar.css';

import React, { useState, useEffect } from 'react';
import { Avatar, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import socket from '../util/socket';

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

	function AddChannel() {
		const inputchannelname = prompt('channel');
		if (inputchannelname) {
			setChannelName(inputchannelname);
			socket.emit('channel', { channelName: inputchannelname});
			const localData = window.localStorage.getItem('id');
			const parsedData = JSON.parse(localData);
			socket.emit('channelJoin',{
				username:parsedData.username,
				channelName:inputchannelname
			})
		}
	}

	socket.on('channelJoin',(data)=>{
		console.log(data)
	})

	return (

		<div class="left_left_box">
			<div class="squircle">
			</div>

			<div class="divider">
			</div>

			{channels.map((channel, index) => (
        <div key={index} className="squircle">
          {/* 채널 이름만 표시하도록 수정 */}
          {channel.channelName}
        </div>
      ))}
			
			<button onClick={AddChannel} id="btn1"  class ="button" ><AddIcon/></button>
		
		</div>



	);
}

export default Sidebar;