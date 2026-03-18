// punto de entrada principal

import { agregarMensaje, limpiarChat } from './utilidades/ui.js'
import { agregarAlHistorial, obtenerVentana, limpiarHistorial } from './utilidades/historial.js'
import { enviarAlChat } from './servicios/api.js'

// agarro los elementos del html
var campo = document.getElementById('campo-mensaje')
var btn = document.getElementById('btn-enviar')
var btnNueva = document.getElementById('btn-nueva-conversacion')

// servicio por defecto
var servicio = 'mock'

// mensaje de bienvenida del agente
var MENSAJE_BIENVENIDA = '¡Hola! Soy ArqueologIA, tu asistente experto en arqueología y robótica FLL. ¿En qué te puedo ayudar hoy?'

// muestra el mensaje de bienvenida en el chat (sin guardarlo en el historial)
function mostrarBienvenida() {
  agregarMensaje('asistente', MENSAJE_BIENVENIDA)
}

// esto se ejecuta cuando el usuario hace click en enviar
async function enviarMensaje() {
  var msg = campo.value.trim()

  // si esta vacio no hago nada
  if (msg === '') return

  console.log('mensaje del usuario:', msg)

  // guardo el mensaje del usuario en el historial
  agregarAlHistorial('user', msg)

  // muestro la burbuja del usuario inmediatamente
  agregarMensaje('usuario', msg)

  // creo la burbuja del asistente con placeholder y guardo la referencia
  var burbuja = agregarMensaje('asistente', '...')

  // limpio el campo
  campo.value = ''

  // deshabilito el input mientras el asistente responde
  campo.disabled = true
  btn.disabled = true

  // mando los ultimos 20 mensajes a la API
  await enviarAlChat(obtenerVentana(), servicio, burbuja)

  // guardo la respuesta del asistente en el historial
  agregarAlHistorial('assistant', burbuja.textContent)

  // vuelvo a habilitar el input
  campo.disabled = false
  btn.disabled = false
  campo.focus()
}

// listener del boton enviar
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

// boton nueva conversacion
btnNueva.addEventListener('click', function() {
  limpiarHistorial()
  limpiarChat()
  mostrarBienvenida()
})

// muestro la bienvenida al cargar la pagina
mostrarBienvenida()
