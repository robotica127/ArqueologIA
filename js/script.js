// punto de entrada principal

import { agregarMensaje } from './utilidades/ui.js'
import { enviarAlChat } from './servicios/api.js'

// agarro los elementos del html
var campo = document.getElementById('campo-mensaje')
var btn = document.getElementById('btn-enviar')

// servicio por defecto
var servicio = 'mock'

// esto se ejecuta cuando el usuario hace click en enviar
async function enviarMensaje() {
  var msg = campo.value.trim()

  // si esta vacio no hago nada
  if (msg === '') return

  console.log('mensaje del usuario:', msg)

  // muestro la burbuja del usuario inmediatamente
  agregarMensaje('usuario', msg)

  // creo la burbuja del asistente con placeholder y guardo la referencia
  var burbuja = agregarMensaje('asistente', '...')

  // limpio el campo
  campo.value = ''

  // deshabilito el input mientras el asistente responde
  campo.disabled = true
  btn.disabled = true

  // llamo a la API, el historial lo agrego en el plan4
  await enviarAlChat([], servicio, burbuja)

  // vuelvo a habilitar el input
  campo.disabled = false
  btn.disabled = false
  campo.focus()
}

// listener del boton
btn.addEventListener('click', function() {
  enviarMensaje()
})

// tambien enviar con Enter
campo.addEventListener('keydown', function(e) {
  // shift+enter no envia, solo enter
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    enviarMensaje()
  }
})
