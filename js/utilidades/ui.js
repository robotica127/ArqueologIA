// funciones para manejar la interfaz del chat

var chat = document.getElementById('area-chat')

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
