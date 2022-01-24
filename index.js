import {getData} from "./data.js";
import { createComment } from "./comment.js";
import {creatReply}  from "./commentReply.js";


const root = document.querySelector(".root");

let {currentUser, comments} = getData();

comments.sort((a, b) => { a.score - b.score}).forEach((ele) => {

    const {content, createdAt, score, user, replies, id} = ele;
    const {username, image} = user
    const {webp} = image    

    createComment(score, webp, username, createdAt, content, replies, id);

})


const mainComment = creatReply(currentUser);
root.append(mainComment);


