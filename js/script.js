// punto de entrada principal

// agarro los elementos del html
var campo = document.getElementById('campo-mensaje')
var btn = document.getElementById('btn-enviar')

// esto se ejecuta cuando el usuario hace click en enviar
function enviarMensaje() {
  var msg = campo.value.trim()

  // si esta vacio no hago nada
  if (msg === '') return

  console.log('mensaje del usuario:', msg)

  // limpio el campo
  campo.value = ''
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
