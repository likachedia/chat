import {getData} from "./data.js";
import { createComment } from "./comment.js";
import {creatReply}  from "./commentReply.js";


const root = document.querySelector(".root");

let {currentUser, comments} = getData();

comments.forEach((ele) => {

    const {content, createdAt, score, user, replies, id} = ele;
    const {username, image} = user
    const {webp} = image    

    createComment(score, webp, username, createdAt, content, replies, id);

    // if(replies.length != 0) {
    //     replies.forEach((ele) => {
    //         const {content, createdAt, score, user} = ele;
    //         const {username, image} = user
    //         const {webp} = image            
    //         createComment(score, webp, username, createdAt, content);
    //     })
    // }
})


const mainComment = creatReply(currentUser);
root.append(mainComment);


