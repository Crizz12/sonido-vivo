// === FUNCIONES REUTILIZABLES DE VALIDACIÓN ===

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function correoValido(correo) {
  return DOMINIOS_PERMITIDOS.some(dominio => correo.toLowerCase().endsWith(dominio));
}

function mostrarError(idCampo, mensaje) {
  document.getElementById("error-" + idCampo).textContent = mensaje;
  document.getElementById(idCampo).classList.add("input-error");
}

function limpiarError(idCampo) {
  document.getElementById("error-" + idCampo).textContent = "";
  document.getElementById(idCampo).classList.remove("input-error");
}

// === VALIDACIÓN FORMULARIO DE CONTACTO ===

function validarContacto() {
  let valido = true;

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  limpiarError("nombre");
  if (nombre === "") {
    mostrarError("nombre", "El nombre es obligatorio");
    valido = false;
  } else if (nombre.length > 100) {
    mostrarError("nombre", "El nombre no puede superar los 100 caracteres");
    valido = false;
  }

  limpiarError("correo");
  if (correo === "") {
    mostrarError("correo", "El correo es obligatorio");
    valido = false;
  } else if (correo.length > 100) {
    mostrarError("correo", "El correo no puede superar los 100 caracteres");
    valido = false;
  } else if (!correoValido(correo)) {
    mostrarError("correo", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
    valido = false;
  }

  limpiarError("comentario");
  if (comentario === "") {
    mostrarError("comentario", "El comentario es obligatorio");
    valido = false;
  } else if (comentario.length > 500) {
    mostrarError("comentario", "El comentario no puede superar los 500 caracteres");
    valido = false;
  }

  return valido;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-contacto");
  if (!form) return;

  document.getElementById("nombre").addEventListener("blur", validarContacto);
  document.getElementById("correo").addEventListener("blur", validarContacto);

  const comentario = document.getElementById("comentario");
  comentario.addEventListener("input", function () {
    document.getElementById("contador-caracteres").textContent = comentario.value.length;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validarContacto()) {
      mostrarNotificacion("Mensaje enviado correctamente");
      form.reset();
      document.getElementById("contador-caracteres").textContent = "0";
    } else {
      mostrarNotificacion("Corrige los errores del formulario", "error");
    }
  });
});