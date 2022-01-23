
import { replyButton } from "./replyButton.js";
import { getData } from "./data.js";
import {createVoteDiv} from "./voteDiv.js"

let {currentUser, comments} = getData();

export const saveDataToLocalStorage = () => {
  localStorage.setItem("data", JSON.stringify({
      currentUser: currentUser,
      comments: comments
  }));
}

const deleteReplyFromData = (replyid) => {
  comments.forEach(ele => {
    ele.replies = ele.replies.filter((item) => item.id != replyid)
  });
}

const scoreUpHandler = (score, id) => {
  comments = comments.map((ele) => {
    if (ele.id == id) {
      ele.score = score;
    } 
    else {
      ele.replies = ele.replies.map((reply) => {
        console.log(reply.id);
        console.log(id);
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

export function repliedComment(vote, image, user, comDate, text, id) {
  const commentDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const userImage = document.createElement("img");
  const voteDiv = createVoteDiv(vote, scoreUpHandler, id);
  const commentInfo = document.createElement("div");
  const userName = document.createElement("p");
  const date = document.createElement("p");
  const reply = replyButton();
  const commentText = document.createElement("p");

  const deleteBtn = document.createElement("p");
  const edit = document.createElement("p");


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

  return commentDiv;

}
