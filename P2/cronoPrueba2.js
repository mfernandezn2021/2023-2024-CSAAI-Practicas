//-- Clase cronómetro
class Crono {

  //-- Constructor. Hay que indicar el 
  //-- display donde mostrar el cronómetro
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

console.log("Iniciando ejecución JS...");

const crono = new Crono(press.display);

press.start.onclick = () => {
  console.log("Start was pressed...");
  console.log("Generando clave secreta");
  generarClaveSecreta();
  crono.start();
  console.log("Starting crono...");
}

press.stop.onclick = () => {
  console.log("Stopping crono...");
  crono.stop();
}

let counter = 0;

press.reset.onclick = () => {
  console.log("Resetting crono...");
  crono.reset();
  for (let i = 0; i < 4; i++) {
    document.getElementById(`clave${counter + 1}`).textContent = '*';
    counter++;
  }
}


console.log(press.display.innerHTML);


let claveSecreta = [];
let listPulsado = [];
let aciertos = 0;

function generarClaveSecreta() {
    claveSecreta = [];
    for (let i = 0; i < 4; i++) {
        claveSecreta.push(Math.floor(Math.random() * 10));
    }
    console.log("Clave secreta generada...", claveSecreta);
}


function presionarDigito1(digito) {
    console.log("Boton con valor pulsado =>", digito);
    claveSecreta.forEach((valor, indice) => {
        if(digito == valor) {
            document.getElementById(`clave${indice + 1}`).textContent = digito;
            console.log("Valor acertado");
            aciertos++;
        } 
        if ((digito != valor) && (indice == 3)) {
            console.log("Valor NO acertado"); // RECORRE TODOS LOS PARAMETROS POR ESTO APARECE EN CONSOLA CUANDO EL VALOR NO SE ENCUENTRA EN ALGUNA DE LAS POSICIONES DE LA CLAVESECRETA
        }
    })
    if (aciertos == 4) {
        crono.stop();
        console.log("Tiempo de juego: ", document.getElementById("display").textContent);
    }
}

// AÑADIR VARIABLE DE ESTADO: ON/OFF PARA SABER SI ESTA INICIADO EL CONTADOR, SI NO ESTA INICIADO Y SE PULSA UN BOTON YA SEA NUMERO O START QUE INICIE, SI ESTA INICIADO EL CONTADOR, ESTA FUNCION NO HARA NADA
