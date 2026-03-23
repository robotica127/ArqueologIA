// comunicacion con la API del agente

// var URL_API = "http://localhost:4000/api/chat";
var URL_API = "https://arqueologia-api-production.up.railway.app/api/chat";

// envia los mensajes a la API y va llenando la burbuja con el stream
export async function enviarAlChat(mensajes, servicio, burbuja) {
  try {
    var resp = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service: servicio,
        messages: mensajes,
      }),
    });

    if (!resp.ok) {
      burbuja.textContent = "Hubo un error al conectar con el agente :(";
      return;
    }

    var reader = resp.body.getReader();
    var decoder = new TextDecoder();
    var textoCompleto = "";

    // voy leyendo el stream chunk por chunk
    while (true) {
      var result = await reader.read();

      if (result.done) break;

      var chunk = decoder.decode(result.value);

      console.log("chunk recibido:", chunk);

      // si todavia tiene el indicador de escritura lo elimino primero
      var indicador = burbuja.querySelector(".indicador-escribiendo");
      if (indicador) {
        burbuja.innerHTML = "";
      }

      textoCompleto += chunk;
      burbuja.innerHTML = marked.parse(textoCompleto);
    }
  } catch (error) {
    console.log("error en el fetch:", error);
    burbuja.textContent =
      "No se pudo conectar con el agente. ¿Esta corriendo la API?";
  }
}
