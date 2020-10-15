import axios from "axios";
const delFriendBtn = document.querySelector(".delete");
const footer = document.querySelector(".footer");
const friends = footer ? footer.querySelector(".friends") : "";
const friendsLi = friends ? friends.querySelector("a"):"";

const delFriendAxios =async (userId) =>{
    const request = await axios({
       url:"/api/friend/out",
       method:"POST",
       data:{userId}  
    })
}

const handleDelFriend = () =>{
    const userId = window.location.href.split("/profile")[0].split("user/")[1];
    delFriendAxios(userId);
    if(footer)
        setTimeout(()=>window.location.href=friendsLi.href.split("com")[1],200);
}

const init =() =>{
    if(delFriendBtn)
        delFriendBtn.addEventListener("click",handleDelFriend);
}
init();