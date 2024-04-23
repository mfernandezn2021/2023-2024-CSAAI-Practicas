console.log("Ejecutando JS...");

const emojis = ["🍉", "🍉", "🐬", "🐬", "🍅", "🍅", "🏈", "🏈", "🍋", "🍋", "🕤", "🕤", "🌍", "🌍", "🐻", "🐻"];

const selectors = {
  start: document.querySelector('#start'),
  moves: document.querySelector('#moves'),
  timer: document.querySelector('#timer') 
}

const state = {
  gameStarted: false,
  loop: null,
  totalFlips: 0,
  totalTime: 0
}

function startGame() {
  // Start game
  state.gameStarted = true;

  selectors.start.classList.add('disabled');

  // Time and moves update
  state.loop = setInterval(() => {
      state.totalTime++
      selectors.moves.innerText = `${state.totalFlips} moves`
      selectors.timer.innerText = `Time: ${state.totalTime} sec`
  }, 1000)
}

let index = 0;
let counter = 0;

var shuffleEmojis = emojis.sort(() => (Math.random() > 0.5)? 2 : -1);

for (index = 0; index < emojis.length; index++) {
  let boxes = document.createElement('div');
  boxes.className = 'item';
  boxes.innerHTML = shuffleEmojis[index];

  boxes.onclick = function(){
    counter++;
    state.totalFlips++;
    this.classList.add('activeBox');
    setTimeout(function(){
      let cardFlipped = document.querySelector('#matchItem');
      
      if (document.querySelectorAll('.activeBox').length > 1) {
        
        if (document.querySelectorAll('.activeBox')[0].innerHTML == 
        document.querySelectorAll('.activeBox')[1].innerHTML){
          document.querySelectorAll('.activeBox')[0].classList.add('matchItem')
          document.querySelectorAll('.activeBox')[1].classList.add('matchItem')

          document.querySelectorAll('.activeBox')[1].classList.remove('activeBox')
          document.querySelectorAll('.activeBox')[0].classList.remove('activeBox')
          
          document.querySelectorAll('.matchItem')[0].classList.add('disabled');
          document.querySelectorAll('.matchItem')[1].classList.add('disabled');
          
          if (document.querySelectorAll('.matchItem').length == emojis.length){
            clearInterval(state.loop);
            Swal.fire({
              title: 'SUCCESS!',
              text: `Your gaming time is: ${state.totalTime} Movements: ${state.totalFlips}`,
              icon: 'success',
            });

          }
        } else {
          document.querySelectorAll('.activeBox')[1].classList.remove('activeBox');
          document.querySelectorAll('.activeBox')[0].classList.remove('activeBox');
        }

      }

      if (cardFlipped.classList.contains("matchItem")) {
        cardFlipped.addEventListener("click", function() {
          cardFlipped.classList.toggle("disabled");
        });
      }
    }, 500)
  }
  
  document.querySelector('.game').appendChild(boxes);

}



function resetGame() {
  window.location.reload(); // MIRAR ESTO
  state.gameStarted = false;
  index = 0;
  counter = 0;
}

