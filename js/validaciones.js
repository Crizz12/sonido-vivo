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
// === VALIDACIÓN FORMULARIO DE LOGIN ===

function validarLogin() {
  let valido = true;

  const correo = document.getElementById("correo-login").value.trim();
  const password = document.getElementById("password-login").value;

  limpiarError("correo-login");
  if (correo === "") {
    mostrarError("correo-login", "El correo es obligatorio");
    valido = false;
  } else if (correo.length > 100) {
    mostrarError("correo-login", "Máximo 100 caracteres");
    valido = false;
  } else if (!correoValido(correo)) {
    mostrarError("correo-login", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
    valido = false;
  }

  limpiarError("password-login");
  if (password === "") {
    mostrarError("password-login", "La contraseña es obligatoria");
    valido = false;
  } else if (password.length < 4 || password.length > 10) {
    mostrarError("password-login", "La contraseña debe tener entre 4 y 10 caracteres");
    valido = false;
  }

  return valido;
}

document.addEventListener("DOMContentLoaded", function () {
  const formLogin = document.getElementById("form-login");
  if (!formLogin) return;

  document.getElementById("correo-login").addEventListener("blur", validarLogin);

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validarLogin()) {
      mostrarNotificacion("Sesión iniciada correctamente");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1500);
    } else {
      mostrarNotificacion("Corrige los errores del formulario", "error");
    }
  });
});
// === VALIDACIÓN FORMULARIO DE PRODUCTO (ADMIN) ===

function validarProducto() {
  let valido = true;

  const codigo = document.getElementById("codigo").value.trim();
  const nombre = document.getElementById("nombre-prod").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;
  const stockCritico = document.getElementById("stock-critico").value;
  const categoria = document.getElementById("categoria").value;

  limpiarError("codigo");
  if (codigo === "") {
    mostrarError("codigo", "El código es obligatorio");
    valido = false;
  } else if (codigo.length < 3) {
    mostrarError("codigo", "El código debe tener al menos 3 caracteres");
    valido = false;
  }

  limpiarError("nombre-prod");
  if (nombre === "") {
    mostrarError("nombre-prod", "El nombre es obligatorio");
    valido = false;
  } else if (nombre.length > 100) {
    mostrarError("nombre-prod", "Máximo 100 caracteres");
    valido = false;
  }

  limpiarError("descripcion");
  if (descripcion.length > 500) {
    mostrarError("descripcion", "Máximo 500 caracteres");
    valido = false;
  }

  limpiarError("precio");
  if (precio === "") {
    mostrarError("precio", "El precio es obligatorio");
    valido = false;
  } else if (parseFloat(precio) < 0) {
    mostrarError("precio", "El precio no puede ser negativo");
    valido = false;
  }

  limpiarError("stock");
  if (stock === "") {
    mostrarError("stock", "El stock es obligatorio");
    valido = false;
  } else if (parseInt(stock) < 0) {
    mostrarError("stock", "El stock no puede ser negativo");
    valido = false;
  } else if (!Number.isInteger(Number(stock))) {
    mostrarError("stock", "El stock debe ser un número entero");
    valido = false;
  }

  limpiarError("stock-critico");
  if (stockCritico !== "") {
    if (parseInt(stockCritico) < 0) {
      mostrarError("stock-critico", "No puede ser negativo");
      valido = false;
    } else if (!Number.isInteger(Number(stockCritico))) {
      mostrarError("stock-critico", "Debe ser un número entero");
      valido = false;
    }
  }

  limpiarError("categoria");
  if (categoria === "") {
    mostrarError("categoria", "Debe seleccionar una categoría");
    valido = false;
  }

  return valido;
}

document.addEventListener("DOMContentLoaded", function () {
  const formProd = document.getElementById("form-producto");
  if (!formProd) return;

  formProd.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validarProducto()) {
      mostrarNotificacion("Producto guardado correctamente");
      formProd.reset();
    } else {
      mostrarNotificacion("Corrige los errores del formulario", "error");
    }
  });
});
// === VALIDACIÓN FORMULARIO DE USUARIO (ADMIN) ===

function validarUsuarioAdmin() {
  let valido = true;

  const run = document.getElementById("run-adm").value.trim();
  const nombres = document.getElementById("nombres-adm").value.trim();
  const apellidos = document.getElementById("apellidos-adm").value.trim();
  const correo = document.getElementById("correo-adm").value.trim();
  const tipo = document.getElementById("tipo-usuario").value;
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;
  const direccion = document.getElementById("direccion-adm").value.trim();

  limpiarError("run-adm");
  if (run === "") {
    mostrarError("run-adm", "El RUN es obligatorio");
    valido = false;
  } else if (run.length < 7 || run.length > 9) {
    mostrarError("run-adm", "El RUN debe tener entre 7 y 9 caracteres");
    valido = false;
  } else if (!runValido(run)) {
    mostrarError("run-adm", "El RUN ingresado no es válido");
    valido = false;
  }

  limpiarError("nombres-adm");
  if (nombres === "") {
    mostrarError("nombres-adm", "El nombre es obligatorio");
    valido = false;
  } else if (nombres.length > 50) {
    mostrarError("nombres-adm", "Máximo 50 caracteres");
    valido = false;
  }

  limpiarError("apellidos-adm");
  if (apellidos === "") {
    mostrarError("apellidos-adm", "Los apellidos son obligatorios");
    valido = false;
  } else if (apellidos.length > 100) {
    mostrarError("apellidos-adm", "Máximo 100 caracteres");
    valido = false;
  }

  limpiarError("correo-adm");
  if (correo === "") {
    mostrarError("correo-adm", "El correo es obligatorio");
    valido = false;
  } else if (!correoValido(correo)) {
    mostrarError("correo-adm", "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com");
    valido = false;
  }

  limpiarError("tipo-usuario");
  if (tipo === "") {
    mostrarError("tipo-usuario", "Debe seleccionar un tipo de usuario");
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

  limpiarError("direccion-adm");
  if (direccion === "") {
    mostrarError("direccion-adm", "La dirección es obligatoria");
    valido = false;
  } else if (direccion.length > 300) {
    mostrarError("direccion-adm", "Máximo 300 caracteres");
    valido = false;
  }

  return valido;
}

document.addEventListener("DOMContentLoaded", function () {
  const formUsr = document.getElementById("form-usuario");
  if (!formUsr) return;

  document.getElementById("run-adm").addEventListener("blur", validarUsuarioAdmin);

  formUsr.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validarUsuarioAdmin()) {
      mostrarNotificacion("Usuario guardado correctamente");
      formUsr.reset();
      document.getElementById("comuna").innerHTML = '<option value="">-- Seleccione la comuna --</option>';
    } else {
      mostrarNotificacion("Corrige los errores del formulario", "error");
    }
  });
});