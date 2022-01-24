
import { replyButton } from "./replyButton.js";
import { getData } from "./data.js";
import {createVoteDiv} from "./voteDiv.js";
import {createComment} from "./comment.js";
import { sendButton } from "./sendBtn.js";

let {currentUser, comments} = getData();

export const saveDataToLocalStorage = () => {
  localStorage.setItem("data", JSON.stringify({
      currentUser: currentUser,
      comments: comments
  }));
}

const updateCommentInData = (commentId, content, replies) => {
  comments = comments.map((ele) => {
    if(ele.id == commentId) {
      console.log("outside", ele.replies);
      console.log("outside", replies);
      ele.content = content;
      ele.replies = replies;
      return ele;
    } else {
      return ele;
    }

  })
}

const deleteReplyFromData = (replyid) => {
  comments.forEach(ele => {
    ele.replies = ele.replies.filter((item) => item.id != replyid)
  });
}

const scoreHandler = (score, id) => {
  comments = comments.map((ele) => {
    if (ele.id == id) {
      ele.score = score;
    } 
    else {
      ele.replies = ele.replies.map((reply) => {
        if (reply.id == id) {
          reply.score = score;
        }
        return reply;
      });
    }
    return ele;
  });
    saveDataToLocalStorage();
}

export function repliedComment(vote, image, user, comDate, text, id, replies = []) {
  const commentDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const userImage = document.createElement("img");
  const voteDiv = createVoteDiv(vote, scoreHandler, id);
  const commentInfo = document.createElement("div");
  const userName = document.createElement("p");
  const date = document.createElement("p");
  const reply = replyButton();
  const commentText = document.createElement("p");

  const deleteBtn = document.createElement("p");
  const edit = document.createElement("p");

  const updateInput = document.createElement("textarea");

  const root = document.querySelector(".root");

  deleteBtn.textContent = "Delete";
  edit.textContent = "Edit";

  commentDiv.classList.add("comment");
  commentDiv.style.marginLeft = "50px";
  contentDiv.classList.add("directionColumn", "content");
  //voteDiv.classList.add("directionColumn", "vote");
  commentInfo.classList.add("info");



  userImage.src = image;
  date.textContent = comDate;
  userName.textContent = user;
  //voteDiv.textContent = vote;
  commentText.textContent = text;
  updateInput.value = text;

  imgDiv.appendChild(userImage);
  if(user == currentUser.username) {
    commentInfo.append(imgDiv, userName, date, deleteBtn, edit,  reply);
  }
  commentInfo.append(imgDiv, userName, date, reply);
  contentDiv.append(commentInfo, commentText);
  commentDiv.append(voteDiv, contentDiv);


  deleteBtn.addEventListener("click", (event) => {
    let parent = event.currentTarget.parentElement
    //parent.parentElement.remove()
    commentDiv.remove()
    deleteReplyFromData(id)
    saveDataToLocalStorage();
    console.log(parent.parentElement);
  })

  const updateHandler = () => {
    contentDiv.removeChild(commentText);
    const update = sendButton("update");
    contentDiv.append(updateInput);
    update.addEventListener("click", () => {
      let newContent = updateInput.value;
      updateCommentInData(id, newContent, replies);
      saveDataToLocalStorage();
      commentDiv.remove();
      createComment(vote, image, user, comDate, newContent, replies, id);
    })
    commentInfo.removeChild(reply);
    commentInfo.append(update);
  }

  edit.addEventListener("click", updateHandler)

  return commentDiv;

}
