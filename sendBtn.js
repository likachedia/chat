export function sendButton() {
    const replyBtn = document.createElement("input");
    // const icon = document.createElement("i");
    // const img = document.createElement("img");
  
    // img.src = "images/icon-reply.svg";
  
    replyBtn.setAttribute("type", "submit");
    replyBtn.setAttribute("value", "Send");
    replyBtn.className = "replyBtn";
    
    // icon.appendChild(img);
    // replyBtn.appendChild(icon);
    return replyBtn;
  }