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

document.addEventListener("DOMContentLoaded", cargarDashboard);