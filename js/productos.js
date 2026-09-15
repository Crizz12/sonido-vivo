// Arreglo de productos (requisito: listar productos mediante JS)
const productos = [
  { id: 1, nombre: "Guitarra Eléctrica Stratocaster", precio: 349990, categoria: "Guitarras", stock: 5, imagen: "img/guitarra.jpg" },
  { id: 2, nombre: "Bajo Eléctrico 4 Cuerdas", precio: 289990, categoria: "Bajos", stock: 3, imagen: "img/bajo.jpg" },
  { id: 3, nombre: "Teclado 61 Teclas", precio: 199990, categoria: "Teclados", stock: 7, imagen: "img/teclado.jpg" },
  { id: 4, nombre: "Amplificador 30W", precio: 129990, categoria: "Amplificadores", stock: 4, imagen: "img/amplificador.jpg" },
  { id: 5, nombre: "Micrófono Dinámico", precio: 79990, categoria: "Micrófonos", stock: 10, imagen: "img/microfono.jpg" },
  { id: 6, nombre: "Batería Acústica 5 Piezas", precio: 599990, categoria: "Baterías", stock: 2, imagen: "img/bateria.jpg" },
  { id: 7, nombre: "Pedal de Distorsión", precio: 45990, categoria: "Pedales", stock: 8, imagen: "img/pedal.jpg" },
  { id: 8, nombre: "Set de Cuerdas Guitarra", precio: 12990, categoria: "Accesorios", stock: 25, imagen: "img/cuerdas.jpg" }
];

// Formatea el precio como moneda chilena: 349990 -> $349.990
function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CL");
}

// Recorre el arreglo y dibuja una tarjeta por cada producto
function mostrarProductos() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(function (producto) {
    const card = document.createElement("article");
    card.className = "card-producto";
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p class="categoria">${producto.categoria}</p>
      <p class="precio">${formatearPrecio(producto.precio)}</p>
      <button class="btn-añadir" data-id="${producto.id}">Añadir al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// Se ejecuta cuando el HTML terminó de cargar
document.addEventListener("DOMContentLoaded", mostrarProductos);