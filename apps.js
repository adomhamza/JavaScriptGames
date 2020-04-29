/*
document.addEventListener('DOMContentLoaded', ()=>{


   const cardArray = [
     { name: 1, img: "images/img1.svg"},

     { name: 1, img: "images/img1.svg"},

     { name: 2, img: "images/img2.svg" },

     { name: 2, img: "images/img2.svg" },

     { name: 3, img: "images/img3.svg" },

     { name: 3, img: "images/img3.svg" },

     { name: 4, img: "images/img4.svg" },

     { name: 4, img: "images/img4.svg" },

     { name: 5, img: "images/img5.svg" },

     { name: 5, img: "images/img5.svg" },
     
     { name: 6, img: "images/img6.svg" },

     { name: 6, img: "images/img6.svg" }
   ];

   cardArray.sort(() => 0.5 - Math.random());


   const grid = document.querySelector('.grid-container');
  // const resultDisplay = document.querySelector('#result')
   let cardsChosen = [];
   let cardsChosenId = [];
   let cardsWon = [];
   

    function checkForMatch(){
       let cards = document.querySelectorAll('img');
      // const card = document.createElement("img");
       const optionOneId = cardsChosenId[0];
       const optionTwoId = cardsChosenId[1];
       if (cardsChosen[0] === cardsChosen[1]){
           cards[optionOneId].setAttribute('src','images/done.jpg')
           cards[optionTwoId].setAttribute('src','images/done.jpg')
           cards[optionOneId].removeEventListener('click',flipCard);//removes click
           cards[optionTwoId].removeEventListener('click',flipCard);
          
           cardsWon.push(cardsChosen);
       }else{
           cards[optionOneId].setAttribute('src','images/img7.svg')
           cards[optionTwoId].setAttribute('src','images/img7.svg')
       }
       cardsChosen = [];
       cardsChosenId = [];
      
  /* resultDisplay.textContent = cardsWon.length;
       if (cardsWon.length === cardArray.length/2) {
        cardsWon.length = 'Congrats';
        console.log(cardsWon.length);
        
        
      }*/
    
 /*  } 

   function createBoard(){
     for (let i = 0; i < cardArray.length; i++) {
       const card = document.createElement("img");
       card.setAttribute("src", "images/flip.jpg");
       card.setAttribute("data-id", i);
       card.addEventListener('click',flipCard);
       grid.appendChild(card);
     }
   };


    function flipCard(){
      this.classList.toggle('flip');
       let cardId = this.getAttribute('data-id');
       cardsChosen.push(cardArray[cardId].name);
       cardsChosenId.push(cardId);
       this.setAttribute('src',cardArray[cardId].img);
       if(cardsChosen.length === 2) {
        setTimeout(checkForMatch,500)
       }
   }

   createBoard();
                             
})*/
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 10);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));