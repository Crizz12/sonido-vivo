// Dibuja los productos del carrito en pantalla
function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const lista = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total-carrito");

  if (carrito.length === 0) {
    lista.innerHTML = "<p class='carrito-vacio'>Tu carrito está vacío. <a href='productos.html'>Ver productos</a></p>";
    totalTexto.textContent = "$0";
    return;
  }

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(function (item) {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const fila = document.createElement("article");
    fila.className = "item-carrito";
    fila.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="item-info">
        <h4>${item.nombre}</h4>
        <p class="precio">${formatearPrecio(item.precio)} c/u</p>
      </div>
      <div class="item-controles">
        <button class="btn-cantidad" data-accion="restar" data-id="${item.id}">−</button>
        <span class="cantidad">${item.cantidad}</span>
        <button class="btn-cantidad" data-accion="sumar" data-id="${item.id}">+</button>
      </div>
      <p class="subtotal">${formatearPrecio(subtotal)}</p>
      <button class="btn-eliminar" data-id="${item.id}">🗑</button>
    `;
    lista.appendChild(fila);
  });

  totalTexto.textContent = formatearPrecio(total);
}

// Cambia la cantidad de un producto
function cambiarCantidad(id, accion) {
  const carrito = obtenerCarrito();
  const item = carrito.find(i => i.id === id);
  const producto = productos.find(p => p.id === id);
  if (!item) return;

  if (accion === "sumar") {
    if (item.cantidad >= producto.stock) {
      mostrarNotificacion("No hay más stock disponible", "error");
      return;
    }
    item.cantidad++;
  } else {
    item.cantidad--;
    // Regla: si llega a 0, se elimina del carrito
    if (item.cantidad <= 0) {
      const indice = carrito.indexOf(item);
      carrito.splice(indice, 1);
    }
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

// Elimina un producto completo
function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito(carrito);
  renderizarCarrito();
  mostrarNotificacion("Producto eliminado del carrito");
}

// Escucha los clics de los botones del carrito
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-cantidad")) {
    cambiarCantidad(parseInt(e.target.dataset.id), e.target.dataset.accion);
  }
  if (e.target.classList.contains("btn-eliminar")) {
    eliminarDelCarrito(parseInt(e.target.dataset.id));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  renderizarCarrito();

  document.getElementById("btn-vaciar").addEventListener("click", function () {
    localStorage.removeItem("carrito");
    actualizarContador();
    renderizarCarrito();
    mostrarNotificacion("Carrito vaciado");
  });

  document.getElementById("btn-pagar").addEventListener("click", function () {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
      mostrarNotificacion("Tu carrito está vacío", "error");
      return;
    }
    mostrarNotificacion("Compra realizada con éxito");
    localStorage.removeItem("carrito");
    actualizarContador();
    renderizarCarrito();
  });
});