// === DASHBOARD ===
function cargarDashboard() {
  const cont = document.getElementById("total-productos");
  if (!cont) return;

  const stockTotal = productos.reduce((suma, p) => suma + p.stock, 0);
  const criticos = productos.filter(p => p.stock <= 3).length;

  document.getElementById("total-productos").textContent = productos.length;
  document.getElementById("total-stock").textContent = stockTotal;
  document.getElementById("total-critico").textContent = criticos;
  document.getElementById("total-usuarios").textContent = usuarios.length;
}

// === TABLA DE PRODUCTOS ===
function cargarTablaProductos() {
  const tbody = document.getElementById("tabla-productos");
  if (!tbody) return;

  productos.forEach(function (p) {
    const fila = document.createElement("tr");
    const claseStock = p.stock <= 3 ? "stock-critico" : "";
    fila.innerHTML = `
      <td>P${String(p.id).padStart(3, "0")}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>${formatearPrecio(p.precio)}</td>
      <td class="${claseStock}">${p.stock}</td>
      <td class="acciones">
        <a href="producto-form.html" class="btn-tabla">Editar</a>
        <button class="btn-tabla btn-borrar">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// === TABLA DE USUARIOS ===
function cargarTablaUsuarios() {
  const tbody = document.getElementById("tabla-usuarios");
  if (!tbody) return;

  usuarios.forEach(function (u) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${u.run}</td>
      <td>${u.nombres} ${u.apellidos}</td>
      <td>${u.correo}</td>
      <td><span class="etiqueta-rol">${u.tipo}</span></td>
      <td>${u.comuna}</td>
      <td class="acciones">
        <a href="usuario-form.html" class="btn-tabla">Editar</a>
        <button class="btn-tabla btn-borrar">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// Un único punto de arranque para todo el panel
document.addEventListener("DOMContentLoaded", function () {
  cargarDashboard();
  cargarTablaProductos();
  cargarTablaUsuarios();
});