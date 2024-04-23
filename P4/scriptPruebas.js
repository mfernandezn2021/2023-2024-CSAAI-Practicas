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
  if (state.loop) { // MIRAR
    clearInterval(state.loop);
  }
  state.gameStarted = true;
  if (state.gameStarted == true) {
    selectors.start.classList.add('disabled');

    // Time and moves update
    state.loop = setInterval(() => {
        state.totalTime++;
        console.log(`${state.totalTime}s`);
        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `Time: ${state.totalTime} sec`
    }, 1000);
    memoryGame();
  }
}

let index = 0;
let counter = 0;
let newEmojis = [];

function generateEmojis(numPairs) {
  newEmojis = emojis.slice(0, numPairs * 2);
  return newEmojis;
}

function memoryGame() {
  let numberValue = document.querySelector('select').value;
  generateEmojis(numberValue);
  var shuffleEmojis = newEmojis.sort(() => (Math.random() > 0.5)? 2 : -1);

  for (index = 0; index < newEmojis.length; index++) {
    let boxes = document.createElement('div');
    boxes.className = 'item';
    boxes.innerHTML = shuffleEmojis[index];
  
    boxes.onclick = function(){
      counter++;
      state.totalFlips++;
      this.classList.add('activeBox');
      setTimeout(function(){
        if (state.gameStarted == true) {
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
              
              if (document.querySelectorAll('.matchItem').length == newEmojis.length){
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
    
          
        } else {
          console.log('Game not started');
        }
        }, 500);
    }
    
    document.querySelector('.game').appendChild(boxes);
  
  }
}


function resetGame() {
  // Reset UI
  state.loop = null;
  clearInterval(state.loop); // Clear the interval
  selectors.moves.innerText = '0 moves';
  selectors.timer.innerText = 'Time: 0 sec';
  selectors.start.classList.remove('disabled');
  state.gameStarted = false;
  state.loop = null;
  state.totalFlips = 0;
  state.totalTime = 0;
  index = 0;
  counter = 0;
  newEmojis = [];
  // Remove all boxes
  const boxes = document.querySelectorAll('.item');
  boxes.forEach(box => box.remove());
}
