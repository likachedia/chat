export function createVoteDiv(score, uphandler, id) {
  const voteDiv = document.createElement("div");
  const voteContentDiv = document.createElement("div");
  const plusDiv = document.createElement("div");
  const plusImage = document.createElement("img");

  const minusDiv = document.createElement("div");
  const minusImage = document.createElement("img");

  const scoreNumber = document.createElement("p");

  scoreNumber.textContent = score;
  plusImage.src = "images/icon-plus.svg";
  minusImage.src = "images/icon-minus.svg";

  voteContentDiv.classList.add("voteContent");
  voteDiv.classList.add("directionColumn", "vote");

  plusDiv.appendChild(plusImage);
  minusDiv.appendChild(minusImage);

  voteContentDiv.append(plusDiv, scoreNumber, minusDiv);
  voteDiv.appendChild(voteContentDiv);

  plusDiv.addEventListener("click", () => {
    score+=1;
    scoreNumber.textContent = score;
    uphandler(score, id);
  });

  minusDiv.addEventListener("click", () => {
    score-=1;
    scoreNumber.textContent = score;
    uphandler(score, id);
})

  return voteDiv;
}
