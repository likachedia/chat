export function replyButton() {
  const replyBtn = document.createElement("button");
  const icon = document.createElement("i");
  const img = document.createElement("img");

  img.src = "images/icon-reply.svg";

  replyBtn.setAttribute("type", "button");
  replyBtn.setAttribute("value", "reply");
  replyBtn.className = "replyBtn";

  icon.appendChild(img);
  replyBtn.appendChild(icon);
  return replyBtn;
}
