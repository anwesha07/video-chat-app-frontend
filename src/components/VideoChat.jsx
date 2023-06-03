// import React, { useEffect, useState } from 'react'
// import Room from './Room'
// import axios from 'axios'
// import { Typography } from '@mui/material';
// import { Navigate, useNavigate } from 'react-router-dom';




// function VideoChat({token, endMeeting}) {

//     useEffect(() => {
//         const data = {
//             roomId,
//             passcode
//         }
//         const TOKEN = localStorage.getItem('TOKEN')
//         const config = {
//             headers: {
//                 'x-token' : TOKEN
//             }
//         }

//         //fetching token for creating new room
//         axios.post('http://localhost:8000/api/room/join', data, config)
//             .then((res) => {
//                 console.log(res.data);
//                 setToken(res.data.token);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }, []);

//     return (
//         <div>
//             <Room roomId={roomId} token={token} endMeeting={endMeeting}/>
//         </div>
//     )
// }

// export default VideoChat