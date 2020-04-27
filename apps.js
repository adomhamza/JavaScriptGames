
document.addEventListener('DOMContentLoaded', ()=>{


   const cardArray = [
     { name: 1, img: "images/img1.jpg"},

     { name: 1, img: "images/img1.jpg"},

     { name: 2, img: "images/img2.jpg" },

     { name: 2, img: "images/img2.jpg" },

     { name: 3, img: "images/img3.jpg" },

     { name: 3, img: "images/img3.jpg" },

     { name: 4, img: "images/img4.jpg" },

     { name: 4, img: "images/img4.jpg" },

     { name: 5, img: "images/img5.jpg" },

     { name: 5, img: "images/img5.jpg" },
     
     { name: 6, img: "images/img6.jpg" },

     { name: 6, img: "images/img6.jpg" }
   ];

   cardArray.sort(() => 0.5 - Math.random());


   const grid = document.querySelector('.grid-container');
   const resultDisplay = document.querySelector('#result')
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
           cards[optionOneId].setAttribute('src','images/flip.jpg')
           cards[optionTwoId].setAttribute('src','images/flip.jpg')
       }
       cardsChosen = [];
       cardsChosenId = [];
       resultDisplay.textContent = cardsWon.length;
       if (cardsWon.length === cardArray.length/2) {
        cardsWon.length = 'Congrats';
        console.log(cardsWon.length);
       }
    
   } 

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
       let cardId = this.getAttribute('data-id');
       cardsChosen.push(cardArray[cardId].name);
       cardsChosenId.push(cardId);
       this.setAttribute('src',cardArray[cardId].img);
       if(cardsChosen.length === 2) {
        setTimeout(checkForMatch,500)
       }
   }

   createBoard();
                             
})