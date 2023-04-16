import React, { useState } from 'react'
import Room from './Room'
import Lobby from './Lobby'
import axios from 'axios'



function VideoChat() {
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');

    const onSubmitUserDetails = (event) => {
        event.preventDefault()
        const data = {
            userName,
            roomName
        }
        
        //fetching token for creating new room
        axios.post('http://localhost:8000/api/video/token', data)
            .then((res) => {
                console.log(res.data);
                setToken(res.data.token);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            {
                token ? 
                    <Room/>
                    :
                    <Lobby userName = {userName} roomName = {roomName} setNewUserName = {(userName) => setUserName(userName)} setNewRoomName = {(roomName) => setRoomName(roomName)} handleFormSubmit = {onSubmitUserDetails}/>
            }
        </div>
    )
}

export default VideoChat