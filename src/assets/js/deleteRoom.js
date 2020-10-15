import axios from "axios";
import { getSocket } from "./socket";

const chatRoom = document.querySelector(".chatRoom");
const chatOutBtn = document.querySelector(".chatOut");
const socket = getSocket();
const userId = window.location.href.split("/chat")[0].split("user/")[1];
const roomId = window.location.href.split("chat/")[1];

const chatOutAxios =async () =>{
   
    const request = await axios({
        url:"/api/room/out",
        method:"POST",
        data:{
            userId,
            roomId
        }
    })

}

const handleChatOut = () =>{
    socket.emit("chatOut",{userId,roomId});
    chatOutAxios(); 
    setTimeout(()=>
    window.location.href=`/user/${userId}/chat`,100);
}

const instantAlarm =(outMessage) =>{
  const alarmLi = document.createElement("li");
  alarmLi.className = "messageAlarm";
  alarmLi.innerText = outMessage;
  const Ul = chatRoom.querySelector("ul");
  Ul.appendChild(alarmLi);
}

const init =() =>{
    if(chatOutBtn){
        chatOutBtn.addEventListener("click",handleChatOut);
        socket.on("chatOutAlarm",({outMessage})=>{
            instantAlarm(outMessage);
        })
    }
}

init();
