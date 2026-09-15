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
// === VALIDACIÓN DE RUN CHILENO (módulo 11) ===

function runValido(run) {
  run = run.toUpperCase().replace(/[.-]/g, "");
  if (run.length < 7 || run.length > 9) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  // Algoritmo módulo 11
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = String(resto);

  return dv === dvEsperado;
}

// === VALIDACIÓN FORMULARIO DE REGISTRO ===

function validarRegistro() {
  let valido = true;

  const run = document.getElementById("run").value.trim();
  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo-reg").value.trim();
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion").value.trim();
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  limpiarError("run");
  if (run === "") {
    mostrarError("run", "El RUN es obligatorio");
    valido = false;
  } else if (run.length < 7 || run.length > 9) {
    mostrarError("run", "El RUN debe tener entre 7 y 9 caracteres");
    valido = false;
  } else if (!runValido(run)) {
    mostrarError("run", "El RUN ingresado no es válido");
    valido = false;
  }

  limpiarError("nombres");
  if (nombres === "") {
    mostrarError("nombres", "El nombre es obligatorio");
    valido = false;
  } else if (nombres.length > 50) {
    mostrarError("nombres", "Máximo 50 caracteres");
    valido = false;
  }

  limpiarError("apellidos");
  if (apellidos === "") {
    mostrarError("apellidos", "Los apellidos son obligatorios");
    valido = false;
  } else if (apellidos.length > 100) {
    mostrarError("apellidos", "Máximo 100 caracteres");
    valido = false;
  }

  limpiarError("correo-reg");
  if (correo === "") {
    mostrarError("correo-reg", "El correo es obligatorio");
    valido = false;
  } else if (!correoValido(correo)) {
    mostrarError("correo-reg", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
    valido = false;
  }

  limpiarError("region");
  if (region === "") {
    mostrarError("region", "Debe seleccionar una región");
    valido = false;
  }

  limpiarError("comuna");
  if (comuna === "") {
    mostrarError("comuna", "Debe seleccionar una comuna");
    valido = false;
  }

  limpiarError("direccion");
  if (direccion === "") {
    mostrarError("direccion", "La dirección es obligatoria");
    valido = false;
  } else if (direccion.length > 300) {
    mostrarError("direccion", "Máximo 300 caracteres");
    valido = false;
  }

  limpiarError("password");
  if (password === "") {
    mostrarError("password", "La contraseña es obligatoria");
    valido = false;
  } else if (password.length < 4 || password.length > 10) {
    mostrarError("password", "La contraseña debe tener entre 4 y 10 caracteres");
    valido = false;
  }

  limpiarError("password2");
  if (password2 !== password) {
    mostrarError("password2", "Las contraseñas no coinciden");
    valido = false;
  }

  return valido;
}

document.addEventListener("DOMContentLoaded", function () {
  const formReg = document.getElementById("form-registro");
  if (!formReg) return;

  // Validación en tiempo real al salir de los campos clave
  ["run", "correo-reg", "password2"].forEach(function (id) {
    document.getElementById(id).addEventListener("blur", validarRegistro);
  });

  formReg.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validarRegistro()) {
      mostrarNotificacion("Usuario registrado correctamente");
      formReg.reset();
      document.getElementById("comuna").innerHTML = '<option value="">-- Seleccione la comuna --</option>';
    } else {
      mostrarNotificacion("Corrige los errores del formulario", "error");
    }
  });
});