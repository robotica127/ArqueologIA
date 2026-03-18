// funciones para manejar la interfaz del chat

var chat = document.getElementById('area-chat')

// agrega una burbuja al chat y devuelve la referencia a la burbuja
// rol puede ser 'usuario' o 'asistente'
export function agregarMensaje(rol, texto) {
  var div = document.createElement('div')
  div.classList.add('mensaje', rol)

  var burbuja = document.createElement('div')
  burbuja.classList.add('burbuja')
  burbuja.textContent = texto

  div.appendChild(burbuja)
  chat.appendChild(div)

  // scroll automatico al ultimo mensaje
  chat.scrollTop = chat.scrollHeight

  // devuelvo la burbuja para poder agregarle texto despues (stream)
  return burbuja
}
