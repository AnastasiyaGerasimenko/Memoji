'use strict'
let cards = document.querySelectorAll(".card");
let container = document.querySelector(".container");
let cardsSideTwo = document.querySelectorAll(".side2");
let animalsArr = ['🐭','🦄','🐨','🐼','🐶','🐹','🐭','🦄','🐨','🐼','🐶','🐹'];
let selectedCard = [];
let winCards = [];
let timeInterval;
function shaker(array){
   for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
   }
   cardsSideTwo.forEach((element,i)=>{
      element.innerHTML = array[i];
   });
}
shaker(animalsArr);

cards.forEach(element => {
   element.addEventListener('click',(e)=>{
     
        element.classList.toggle('is_flipped');
        console.log(element.children[1].parentElement);
        element.classList.add('cardBlock');
        selectedCard.push(element.children[1]);
        CheckCoincidence();
   });
});

container.addEventListener('click',startGame);
function startGame(e){
   if(e.target.className != 'container'){
      let curDate = new Date();
      curDate.setMinutes(curDate.getMinutes() + 1);
      setClock(curDate);
   }
   container.removeEventListener('click',startGame);
}
function CheckCoincidence(){
   if(selectedCard.length == 2){
      let textContentCardOne = selectedCard[0].textContent;
      let textContentCardTwo = selectedCard[1].textContent;
      if(textContentCardOne==textContentCardTwo){
         selectedCard.forEach(element => {
            element.classList.add('fitCard');
            winCards.push(selectedCard[0].textContent);
            if(winCards.length==animalsArr.length){
               clearInterval(timeInterval);
               EndGame(true);
            }
         });
         selectedCard=[];
      }
      else{
         selectedCard.forEach(element => {
            element.classList.add('notFitCard');
         });
      }
   }
   if(selectedCard.length == 3){

         selectedCard[0].classList.remove('notFitCard');
         selectedCard[1].classList.remove('notFitCard');
         selectedCard[0].parentElement.classList.remove('is_flipped','cardBlock');
         selectedCard[1].parentElement.classList.remove('is_flipped','cardBlock');
      selectedCard.splice(0,2);
   }
}
function getTimeRemaining(endtime) {
   const t = Date.parse(endtime) - Date.parse(new Date()),
         minutes = Math.floor((t / (1000 * 60 )) % 60),
         seconds = Math.floor((t / 1000) % 60);

     return{
         'total': t,
         'minutes':minutes,
         'seconds':seconds
     }
}

function getZero(num){
   if(num >= 0 && num < 10){
       return `0${num}`;
   }
   return num;
 }
 function setClock( endtime){
   const timer = document.querySelector('.timer'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds');
         timeInterval = setInterval(updateClock, 1000);

   updateClock();

   function updateClock(){
       const t = getTimeRemaining(endtime);

       if(t.total < 0){
           clearInterval(timeInterval);
           EndGame(false)
       }
       else{
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);
       }
   }
 }

 function EndGame(win){
   let winCard = document.querySelectorAll('.fitCard');
   let modal = document.querySelector('.modal');
   let btn = document.querySelector('.tryBtn');
   let textModal = document.querySelector('.textFinish');
   console.log(winCard);
   if(win){
      textModal.innerHTML = "<span>W</span><span>i</span><span>n</span>";
      btn.textContent = "Play again";
   }
   else{
      textModal.innerHTML = "<span>L</span><span>o</span><span>s</span><span>e</span>";
      btn.textContent = "Try again";
   }
   modal.classList.add('show');
   btn.addEventListener('click',()=>{
      location.reload();
   })
 }