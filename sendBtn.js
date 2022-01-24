export function sendButton() {
    const replyBtn = document.createElement("input");
  
    replyBtn.setAttribute("type", "submit");
    replyBtn.setAttribute("value", "Send");
    replyBtn.className = "replyBtn";
    
    return replyBtn;
  }