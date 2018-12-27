const cards = document.querySelectorAll(".memoryCard");
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!flippedCard) {
    //first click
    flippedCard = true;
    firstCard = this;
    return;
  }
  //second click
  secondCard = this;

  checkMatch();
}

function checkMatch() {
  //if cards match
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  //its a match
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  boardReset();
}

function unflipCards() {
  lockBoard = true;
  //not a match remove flip class
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    boardReset();
  }, 1500);
}

function boardReset() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//shuffling cards
//invoked function
(function shuffleCrds() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

//loop through each card and add the event handler
cards.forEach(card => card.addEventListener("click", flipCard));
