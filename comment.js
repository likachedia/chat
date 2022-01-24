import { replyButton } from "./replyButton.js";
import { creatReply } from "./commentReply.js";
import { repliedComment } from "./repliedComments.js";
import { getData } from "./data.js";
import { createVoteDiv } from "./voteDiv.js";
import { sendButton } from "./sendBtn.js";


let { currentUser, comments } = getData();

const saveDataToLocalStorage = () => {
  localStorage.setItem(
    "data",
    JSON.stringify({
      currentUser: currentUser,
      comments: comments,
    })
  );
};

const deleteCommentFromData = (comid) => {
  comments = comments.filter((ele) => ele.id != comid);
};

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
const scoreUpHandler = (score, id) => {
  comments = comments.map((ele) => {
    if (ele.id == id) {
      ele.score = score;
      return ele;
    } else {
      return ele;
    }
  });
  saveDataToLocalStorage();
};

export function createComment(vote, image, user, comDate, text, replies, id) {
  const wraper = document.createElement("div");
  const commentDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const userImage = document.createElement("img");
  //const voteDiv = document.createElement("div");
  const voteDiv = createVoteDiv(vote, scoreUpHandler, id);
  const commentInfo = document.createElement("div");
  const userName = document.createElement("p");
  const date = document.createElement("p");
  let reply = replyButton();
  const commentText = document.createElement("p");

  const updateInput = document.createElement("textarea");

  const deleteBtn = document.createElement("p");
  const edit = document.createElement("p");

  deleteBtn.textContent = "Delete";
  edit.textContent = "Edit";

  const root = document.querySelector(".root");

  wraper.setAttribute("id", id);

  commentDiv.classList.add("comment");
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

  if (user == currentUser.username) {
    commentInfo.append(imgDiv, userName, date, deleteBtn, edit, reply);
  }
  commentInfo.append(imgDiv, userName, date, reply);
  contentDiv.append(commentInfo, commentText);
  commentDiv.append(voteDiv, contentDiv);
  wraper.append(commentDiv);

  if (replies.length != 0) {
    replies.forEach((ele) => {
      const { content, createdAt, score, user, id } = ele;
      const { username, image } = user;
      const { webp } = image;
      const comment = repliedComment(
        score,
        webp,
        username,
        createdAt,
        content,
        id
      );
      wraper.append(comment);
    });
  }

  // const firstElement = root.lastChild;
  // root.insertAdjacentElement()
  root.appendChild(wraper);

  const replyhandler = () => {
    const rplComm = creatReply(currentUser, user, id);
    wraper.append(rplComm);
  };

  reply.addEventListener("click", replyhandler);

  deleteBtn.addEventListener("click", () => {
    commentDiv.remove();
    deleteCommentFromData(id);
    saveDataToLocalStorage();
  });

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

  edit.addEventListener("click", updateHandler);
}

//repliedComment(vote, image, user, comDate, text, id)