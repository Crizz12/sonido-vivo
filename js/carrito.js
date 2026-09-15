// === CARRITO CON LOCALSTORAGE ===

// Lee el carrito guardado. Si no hay nada, devuelve un arreglo vacío.
function obtenerCarrito() {
  const datos = localStorage.getItem("carrito");
  return datos ? JSON.parse(datos) : [];
}

// Guarda el carrito en localStorage (solo acepta texto, por eso JSON.stringify)
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// Suma las cantidades y lo muestra en el navbar
function actualizarContador() {
  const carrito = obtenerCarrito();
  const total = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const contador = document.getElementById("contador-carrito");
  if (contador) contador.textContent = total;
}

// Agrega un producto. Si ya está, sube la cantidad en vez de duplicarlo.
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  const carrito = obtenerCarrito();
  const existente = carrito.find(item => item.id === idProducto);

  if (existente) {
    // Regla de negocio: no permitir más unidades que el stock disponible
    if (existente.cantidad >= producto.stock) {
      mostrarNotificacion("No hay más stock disponible de " + producto.nombre, "error");
      return;
    }
    existente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  mostrarNotificacion(producto.nombre + " agregado al carrito");
}

// Escucha los clics en los botones "Añadir al carrito"
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-añadir")) {
    const id = parseInt(e.target.dataset.id);
    agregarAlCarrito(id);
  }
});

// Al cargar cualquier página, actualiza el número del navbar
document.addEventListener("DOMContentLoaded", actualizarContador);

// Notificación flotante personalizada (reemplaza al alert nativo)
function mostrarNotificacion(mensaje, tipo = "exito") {
  const aviso = document.createElement("div");
  aviso.className = "notificacion " + tipo;
  aviso.textContent = mensaje;
  document.body.appendChild(aviso);

  setTimeout(() => aviso.remove(), 2500);
}