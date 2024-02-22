console.log('Ejecutando JS...')

//-- Leer el display
const disp1 = document.getElementById('disp1')


//--  Leer el boton identificado como bt1
const btn1 = document.getElementById('bt1')

//--  Leer el boton identificado como bt1
const btn2 = document.getElementById('bt2')

//-- Configurar el manejador para el evento de
//-- pulsación de botón
btn1.onclick = () => {
  // console.log("Click sobre el botón 1...")

  disp1.innerHTML += " 1"

  if (disp1.style.backgroundColor == "") {
    disp1.style.backgroundColor = "lightblue";
  }
  else {
    disp1.style.backgroundColor = "";
  }
  
}

btn2.onclick = () => {

  disp1.innerHTML += "2"

  if (disp1.style.backgroundColor == "") {
    disp1.style.backgroundColor = "yellow";
  }
  else {
    if (disp1.style.backgroundColor == "lightblue") {
    disp1.style.backgroundColor = "red";
    }
  }
}