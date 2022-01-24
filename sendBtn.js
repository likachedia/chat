export function sendButton(buttonText) {
    const replyBtn = document.createElement("input");
  
    replyBtn.setAttribute("type", "submit");
    replyBtn.setAttribute("value", buttonText? buttonText : "Send");
    replyBtn.className = "replyBtn";
    
    return replyBtn;
  }