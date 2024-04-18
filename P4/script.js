console.log("Ejecutando JS...");

const press = {
  display : document.getElementById("displayTimer"),
  start : document.getElementById("buttonFire"),
  reset : document.getElementById("buttonReset")
}

const crono = new Crono(press.display);

const emojis = ["🍉", "🍉", "🐬", "🐬", "🍅", "🍅", "🏈", "🏈", "🍋", "🍋", "🕤", "🕤", "🌍", "🌍", "🐻", "🐻"];

let index = 0;
var shuffleEmojis = emojis.sort(() => (Math.random() > 0.5)? 2 : -1);


for (index = 0; index < emojis.length; index++) {
  let boxes = document.createElement('div');
  boxes.className = 'item';
  boxes.innerHTML = shuffleEmojis[index];

  boxes.onclick = function(){
    this.classList.add('activeBox');
    setTimeout(function(){
      if (document.querySelectorAll('.activeBox').length > 1) {
        if (document.querySelectorAll('.activeBox')[0].innerHTML == 
        document.querySelectorAll('.activeBox')[1].innerHTML){
          document.querySelectorAll('.activeBox')[0].classList.add('matchItem')
          document.querySelectorAll('.activeBox')[1].classList.add('matchItem')

          document.querySelectorAll('.activeBox')[1].classList.remove('activeBox')
          document.querySelectorAll('.activeBox')[0].classList.remove('activeBox')

          if (document.querySelectorAll('.matchItem').length == emojis.length){
            crono.stop();
            alert('You win!');
          }
        } else {
          document.querySelectorAll('.activeBox')[1].classList.remove('activeBox');
          document.querySelectorAll('.activeBox')[0].classList.remove('activeBox');
        }

      }
    }, 500)
  }
  
  document.querySelector('.game').appendChild(boxes);

}



function resetGame() {
  window.location.reload();
  //crono.reset();
}
