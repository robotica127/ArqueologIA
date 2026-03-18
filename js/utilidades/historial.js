// manejo del historial de mensajes en memoria

var mensajes = []

// maximo de mensajes que se mandan a la API
var MAX_MENSAJES = 20

// agrega un mensaje al historial
export function agregarAlHistorial(rol, contenido) {
  mensajes.push({ role: rol, content: contenido })
}

// devuelve solo los ultimos MAX_MENSAJES para no gastar tokens
export function obtenerVentana() {
  return mensajes.slice(-MAX_MENSAJES)
}

// vacia el historial para nueva conversacion
export function limpiarHistorial() {
  mensajes = []
}
