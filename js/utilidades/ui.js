// funciones para manejar la interfaz del chat

var chat = document.getElementById('area-chat')

// muestra la bienvenida como una burbuja del asistente con contenido enriquecido
export function mostrarTarjetaBienvenida() {
  var div = document.createElement('div')
  div.classList.add('mensaje', 'asistente')

  var burbuja = document.createElement('div')
  burbuja.classList.add('burbuja')

  // saludo dentro de la burbuja
  var saludo = document.createElement('p')
  saludo.classList.add('bienvenida-saludo')
  saludo.textContent = '¡Hola! Soy ArqueologIA 🏺'

  // descripcion
  var desc = document.createElement('p')
  desc.classList.add('bienvenida-descripcion')
  desc.textContent = 'Soy tu asistente experto en arqueología y robótica FLL. Puedo ayudarte a explorar civilizaciones antiguas, técnicas de excavación y programación con PyBricks.'

  // texto antes de las sugerencias
  var textoSug = document.createElement('p')
  textoSug.classList.add('bienvenida-texto-sugerencias')
  textoSug.textContent = 'Puedes preguntarme sobre:'

  // contenedor de sugerencias
  var contenedorSug = document.createElement('div')
  contenedorSug.classList.add('sugerencias')

  // las tres sugerencias
  var preguntas = [
    '¿Qué es la arqueología?',
    '¿Qué es FLL robótica?',
    '¿Cuáles son las civilizaciones más antiguas?'
  ]

  preguntas.forEach(function(pregunta) {
    var btn = document.createElement('button')
    btn.classList.add('sugerencia')
    btn.textContent = pregunta
    contenedorSug.appendChild(btn)
  })

  burbuja.appendChild(saludo)
  burbuja.appendChild(desc)
  burbuja.appendChild(textoSug)
  burbuja.appendChild(contenedorSug)
  div.appendChild(burbuja)
  chat.appendChild(div)

  chat.scrollTop = chat.scrollHeight

  // devuelvo los botones para agregarles listeners en script.js
  return contenedorSug.querySelectorAll('.sugerencia')
}

// limpia todos los mensajes del area de chat
export function limpiarChat() {
  chat.innerHTML = ''
}

// agrega una burbuja al chat y devuelve la referencia a la burbuja
// rol puede ser 'usuario' o 'asistente'
export function agregarMensaje(rol, texto) {
  var div = document.createElement('div')
  div.classList.add('mensaje', rol)

  var burbuja = document.createElement('div')
  burbuja.classList.add('burbuja')

  // si es del asistente y no tiene texto, pongo el indicador de escritura
  if (rol === 'asistente' && texto === '') {
    var indicador = document.createElement('div')
    indicador.classList.add('indicador-escribiendo')

    // tres puntos
    var p1 = document.createElement('span')
    p1.classList.add('punto')
    var p2 = document.createElement('span')
    p2.classList.add('punto')
    var p3 = document.createElement('span')
    p3.classList.add('punto')

    indicador.appendChild(p1)
    indicador.appendChild(p2)
    indicador.appendChild(p3)
    burbuja.appendChild(indicador)
  } else {
    burbuja.textContent = texto
  }

  div.appendChild(burbuja)
  chat.appendChild(div)

  // scroll automatico al ultimo mensaje
  chat.scrollTop = chat.scrollHeight

  // devuelvo la burbuja para poder agregarle texto despues (stream)
  return burbuja
}
