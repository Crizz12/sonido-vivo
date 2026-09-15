// Arreglo de regiones y comunas (reemplazar por el archivo oficial si el profe lo entrega)
const REGIONES = [
  {
    nombre: "Región de Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Limache", "Olmué", "Concón", "Quillota", "San Antonio", "Casablanca"]
  },
  {
    nombre: "Región Metropolitana de Santiago",
    comunas: ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto", "La Florida", "Ñuñoa", "Recoleta", "San Bernardo"]
  },
  {
    nombre: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel", "San Pedro de la Paz"]
  },
  {
    nombre: "Región de La Araucanía",
    comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucón", "Victoria"]
  },
  {
    nombre: "Región de Coquimbo",
    comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"]
  },
  {
    nombre: "Región de Los Lagos",
    comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"]
  }
];

// Llena el select de regiones
function cargarRegiones() {
  const selectRegion = document.getElementById("region");
  if (!selectRegion) return;

  REGIONES.forEach(function (region) {
    const opcion = document.createElement("option");
    opcion.value = region.nombre;
    opcion.textContent = region.nombre;
    selectRegion.appendChild(opcion);
  });
}

// Llena el select de comunas según la región elegida
function cargarComunas(nombreRegion) {
  const selectComuna = document.getElementById("comuna");
  selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

  const region = REGIONES.find(r => r.nombre === nombreRegion);
  if (!region) return;

  region.comunas.forEach(function (comuna) {
    const opcion = document.createElement("option");
    opcion.value = comuna;
    opcion.textContent = comuna;
    selectComuna.appendChild(opcion);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const selectRegion = document.getElementById("region");
  if (!selectRegion) return;

  cargarRegiones();

  // Al cambiar la región, se recargan las comunas
  selectRegion.addEventListener("change", function () {
    cargarComunas(this.value);
  });
});