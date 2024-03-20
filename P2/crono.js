//-- Clase cronómetro
class Crono {

    constructor(display) {
        this.display = display;
  
        //-- Tiempo
        this.cent = 0, //-- Centésimas
        this.seg = 0,  //-- Segundos
        this.min = 0,  //-- Minutos
        this.timer = 0;  //-- Temporizador asociado
    }
  
    //-- Método que se ejecuta cada centésima
    tic() {
        //-- Incrementar en una centesima
        this.cent += 1;
  
        //-- 100 centésimas hacen 1 segundo
        if (this.cent == 100) {
        this.seg += 1;
        this.cent = 0;
        }
  
        //-- 60 segundos hacen un minuto
        if (this.seg == 60) {
        this.min = 1;
        this.seg = 0;
        }
  
        //-- Mostrar el valor actual
        this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
    }
  
    //-- Arrancar el cronómetro
    start() {
        if (!this.timer) {
          //-- Lanzar el temporizador para que llame 
          //-- al método tic cada 10ms (una centésima)
          this.timer = setInterval( () => {
              this.tic();
          }, 10);
        }
    }
  
    //-- Parar el cronómetro
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
  
    //-- Reset del cronómetro
    reset() {
        this.cent = 0;
        this.seg = 0;
        this.min = 0;
  
        this.display.innerHTML = "0:0:0";
    }
  }
    
    const press = {
      display : document.getElementById("display"),
      start : document.getElementById("start"),
      stop : document.getElementById("stop"),
      reset : document.getElementById("reset")
    }
    
    console.log("Starting JS execution...");
    window.alert("Bienvenido a la práctica 2 (BOOM) Esta consta de 10 botones, un cronómetro y una clave secreta a adivinar. Esta es aleatoria y esta compuesta por 4 dígitos, cuando adivines la clave secreta parará el cronómetro, si el cronometro está parado y pulsas cualquier tecla numerica o haces click en cualquier boton se inicia el cronometro y empieza el juego")
    
    const crono = new Crono(press.display);
  
    let counter = 0;
    let estadoInicio = false;
    let estadoParado = false;
  
    function resetDisplay() { // Reseteo del display de clave secreta
      counter = 0;
      for (let i = 0; i < 4; i++) {
        document.getElementById(`clave${counter + 1}`).textContent = '*';
        document.getElementById(`clave${counter + 1}`).style.color = "red";
        counter++;
      }
    }
  
    function startGame() {
      if (estadoParado === true) {
        crono.start();
        console.log("Crono running again...");
        estadoParado = false;
      } else {
        console.log("Start was pressed...");
        console.log("Generating secret key");
        resetDisplay();
        generarClaveSecreta();
        crono.reset();
        crono.start();
        console.log("Starting crono...");
      }
    }
  
    document.addEventListener('keydown', function(event) {  // Verifica si la tecla presionada es numérica (0-9)
      if (event.key >= '0' && event.key <= '9') {
        console.log("The key has been pressed: ", event.key);
        pressedButton = parseInt(event.key);
        presionarDigito1(pressedButton);
      }
    });
  
    press.start.onclick = () => {
      startGame();
      estadoInicio = true;
    }
    
    press.stop.onclick = () => {
      console.log("Stopping crono...");
      crono.stop();
      estadoParado = true;
    }
    
    press.reset.onclick = () => {
      console.log("Resetting crono...");
      crono.reset();
      resetDisplay(); 
    }
    
    console.log(press.display.innerHTML);
    
    let claveSecreta = [];
    let aciertos = 0;
    
    
    function generarClaveSecreta() {
        claveSecreta = [];
        aciertos = 0;
        for (let i = 0; i < 4; i++) {
            claveSecreta.push(Math.floor(Math.random() * 10));
        }
        console.log("Secret key generated... ", claveSecreta);
    }
    
    function presionarDigito1(digito) {
      if (estadoInicio === false) {
        startGame();
        estadoInicio = true;
      }
      if (estadoParado === true) {
        crono.start();
        console.log("Crono running again...");
        estadoParado = false;
      }
      cont = 0;
      console.log("Button with pressed value => ", digito);
      claveSecreta.forEach((valor, indice) => {
          if(digito == valor) {
              document.getElementById(`clave${indice + 1}`).textContent = digito;
              document.getElementById(`clave${indice + 1}`).style.color = "rgb(51, 255, 0)";
              console.log("Successful value");
              delete claveSecreta[indice]; // Elimino elementos del array para que si se repite la pulsacion sobre un numero no pare el crono
              cont++;
              aciertos++;
          } 
      })
      console.log(claveSecreta)
      if (cont == 0) {
          console.log("Value NOT successful");
      }
      if (aciertos == 4) {
        crono.stop();
        estadoInicio = false;
        Swal.fire({
          title: 'Congratulations!',
          text: `Your gaming time is: ${document.getElementById("display").textContent} seconds`,
          icon: 'success',
          showCancelButton: true,
          cancelButtonText: 'Close',
          confirmButtonColor: '#2eb82e',
          confirmButtonText: 'Reset Game'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("Resetting crono...");
            crono.reset();
            resetDisplay(); 
          }
        });
        console.log("Tiempo de juego: ", document.getElementById("display").textContent);
      }
    }
  