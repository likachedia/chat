import { getData } from "./data.js";
import { sendButton } from "./sendBtn.js";
import { repliedComment } from "./repliedComments.js";

let {currentUser, comments} = getData();

const getRandomUUID = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const saveReply = (commentId, reply) => {
    comments = comments.map((ele) => {
        if(ele.id == commentId) {
            ele.replies.push(reply);
            return ele;
        } else {
            return ele;
        }
    })
    saveDataToLocalStorage();
}

const saveComments = (obj) => {
    comments.push(obj);
    saveDataToLocalStorage();
}

const saveDataToLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify({
        currentUser: currentUser,
        comments: comments
    }));
}

const scoreUpHandler = (score, id) => {
    let counter = 0;
    comments = comments.map((ele) => {
        if(ele.id == id) {
          ele.score = score;
          counter += 1;
          return ele;
        } else {
          if(counter == 0) {
  
            ele.replies.map((ele) => {
              console.log(ele.id)
              console.log(id)
              if(ele.id == id) {
                console.log(ele.id)
                ele.score = score;
                return ele;
              } else {
                console.log("checking2")
                return ele;
              }
            })
  
  
          }
          return ele;
        }
    })
    saveDataToLocalStorage();
}
const appendNewReply = (id, vote, image, user, comDate, text) => {
    const wraper = document.getElementById(id);
    const newReply = repliedComment(vote, image, user, comDate, text, id);
    const lastElement = wraper.lastChild
    wraper.insertBefore(newReply, lastElement);
}

const appendNewComment = (id, vote, image, user, comDate, text) => {
    const root = document.querySelector(".root");
    const lastElement = root.lastChild
    const newComment = repliedComment(vote, image, user, comDate, text, id);
    newComment.style.marginLeft = "0";
    root.insertBefore(newComment, lastElement);
   // root.append(newComment);
}

export function creatReply(user, autor = "", id = 0 ) {
    const commentDiv = document.createElement("div");
    const imgDiv = document.createElement("div");
    const userImage = document.createElement("img");
    const txt = document.createElement("textarea");
    const reply = sendButton();

    commentDiv.classList.add("comment", "info");
    txt.style.flex = 4;

    userImage.src = currentUser.image.webp;
    imgDiv.appendChild(userImage);
    commentDiv.append(imgDiv, txt, reply);


    const saveReplyHandler = () => {
        if(!txt.value) {
            return;
        }
        const reply = {};
        reply.id = getRandomUUID();
        reply.content = txt.value;
        reply.createdAt = getTimestampInSeconds();
        reply.score = 0;
        if(autor) {
            reply.replyingTo = autor;
        }
        reply.user = user;
        reply.replies = [];
        txt.value = "";

        if(autor) {
            saveReply(id, reply);
            appendNewReply(id, reply.score, reply.user.image.webp, reply.user.username, reply.createdAt, reply.content);
            commentDiv.remove()
        } else {
            saveComments(reply);
            appendNewComment(id, reply.score, reply.user.image.webp, reply.user.username, reply.createdAt, reply.content);
        }

    }
    
    // if(txt.value != "") {
    //     console.log(txt.value)
    //     //reply.removeEventListener("click", saveReplyHandler);
    //     reply.addEventListener("click", saveReplyHandler);
    // }
    reply.addEventListener("click", saveReplyHandler);

    return commentDiv;
}


function getTimestampInSeconds () {
    return new Date(); 
}