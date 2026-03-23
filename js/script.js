// punto de entrada principal

import {
  agregarMensaje,
  limpiarChat,
  mostrarTarjetaBienvenida,
} from "./utilidades/ui.js";
import {
  agregarAlHistorial,
  obtenerVentana,
  limpiarHistorial,
} from "./utilidades/historial.js";
import { enviarAlChat } from "./servicios/api.js";

// servicios disponibles, agregar aqui para que aparezcan en el dropdown
var SERVICIOS = [
  { servicio: "openrouter", modelo: "openai/gpt" },
  { servicio: "gemini", modelo: "gemini" },
  { servicio: "cerebras", modelo: "qwen" },
  { servicio: "groq", modelo: "kimi-k2" },
  { servicio: "mock", modelo: "mock" },
];

// agarro los elementos del html
var campo = document.getElementById("campo-mensaje");
var btn = document.getElementById("btn-enviar");
var btnNueva = document.getElementById("btn-nueva-conversacion");
var selector = document.getElementById("selector-servicio");

// lleno el dropdown con los servicios disponibles
SERVICIOS.forEach(function (s) {
  var opcion = document.createElement("option");
  opcion.value = s.servicio;
  opcion.textContent = s.modelo;
  selector.appendChild(opcion);
});

// muestra la tarjeta de bienvenida y conecta los botones de sugerencia
function mostrarBienvenida() {
  var sugerencias = mostrarTarjetaBienvenida();

  // cuando el usuario hace click en una sugerencia la pone en el campo y la envia
  sugerencias.forEach(function (btn) {
    btn.addEventListener("click", function () {
      campo.value = btn.textContent;
      enviarMensaje();
    });
  });
}

// esto se ejecuta cuando el usuario hace click en enviar
async function enviarMensaje() {
  var msg = campo.value.trim();

  // si esta vacio no hago nada
  if (msg === "") return;

  console.log("mensaje del usuario:", msg);

  // guardo el mensaje del usuario en el historial
  agregarAlHistorial("user", msg);

  // muestro la burbuja del usuario inmediatamente
  agregarMensaje("usuario", msg);

  // creo la burbuja del asistente con el indicador de escritura
  var burbuja = agregarMensaje("asistente", "");

  // limpio el campo
  campo.value = "";

  // deshabilito el input mientras el asistente responde
  campo.disabled = true;
  btn.disabled = true;
  selector.disabled = true;

  // mando los ultimos 20 mensajes a la API con el servicio y modelo seleccionado
  var seleccionado = SERVICIOS.find(function (s) {
    return s.servicio === selector.value;
  });
  await enviarAlChat(obtenerVentana(), seleccionado.servicio, burbuja);

  // guardo la respuesta del asistente en el historial
  agregarAlHistorial("assistant", burbuja.innerText);

  // vuelvo a habilitar el input
  campo.disabled = false;
  btn.disabled = false;
  selector.disabled = false;
  campo.focus();
}

// listener del boton enviar
btn.addEventListener("click", function () {
  enviarMensaje();
});

// tambien enviar con Enter
campo.addEventListener("keydown", function (e) {
  // shift+enter no envia, solo enter
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    enviarMensaje();
  }
});

// boton nueva conversacion
btnNueva.addEventListener("click", function () {
  limpiarHistorial();
  limpiarChat();
  mostrarBienvenida();
});

// muestro la bienvenida al cargar la pagina
mostrarBienvenida();
