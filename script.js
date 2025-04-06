const logContainer = document.getElementById('log-container');
const nuevaEntrada = document.getElementById('contenidoEntrada');
const tituloEntrada = document.getElementById('tituloEntrada');
const autorEntrada = document.getElementById('autorEntrada');
const codigoAcceso = document.getElementById('codigoAcceso');
const claveAdmin = document.getElementById('claveAdmin');
const editorBitacora = document.getElementById('editor-bitacora');
const ordenarPor = document.getElementById('ordenarPor');

const CLAVE = "11Pclave";
const ADMIN = "admin11P";

function autenticar() {
  if (codigoAcceso.value === CLAVE) {
    editorBitacora.style.display = 'block';
  } else {
    alert('Código incorrecto');
  }
}

function agregarEntrada() {
  if (nuevaEntrada.value.trim() !== "" && tituloEntrada.value && autorEntrada.value) {
    const fecha = new Date().toLocaleString();
    const entrada = {
      titulo: tituloEntrada.value,
      autor: autorEntrada.value,
      texto: nuevaEntrada.value,
      fecha: fecha,
      id: Date.now()
    };
    guardarEntrada(entrada);
    mostrarEntradas();
    nuevaEntrada.value = "";
    tituloEntrada.value = "";
    autorEntrada.value = "";
  }
}

function guardarEntrada(entrada) {
  const entradas = JSON.parse(localStorage.getItem('bitacora')) || [];
  entradas.unshift(entrada);
  localStorage.setItem('bitacora', JSON.stringify(entradas));
}

function eliminarEntrada(id) {
  if (claveAdmin.value === ADMIN) {
    const entradas = JSON.parse(localStorage.getItem('bitacora')) || [];
    const nuevas = entradas.filter(e => e.id !== id);
    localStorage.setItem('bitacora', JSON.stringify(nuevas));
    mostrarEntradas();
  } else {
    alert("Clave de administrador incorrecta");
  }
}

function mostrarEntradas() {
  const entradas = JSON.parse(localStorage.getItem('bitacora')) || [];
  const criterio = ordenarPor.value;

  entradas.sort((a, b) => {
    if (criterio === "fecha") return new Date(b.fecha) - new Date(a.fecha);
    if (criterio === "autor") return a.autor.localeCompare(b.autor);
    if (criterio === "titulo") return a.titulo.localeCompare(b.titulo);
    return 0;
  });

  logContainer.innerHTML = entradas.map(e =>
    `<div class="entrada">
      <h3>${e.titulo}</h3>
      <small><strong>${e.fecha}</strong> | ${e.autor}</small>
      <p>${e.texto}</p>
      <button onclick="eliminarEntrada(${e.id})">Eliminar</button>
    </div>`
  ).join('');
}

mostrarEntradas();

const ctx = document.getElementById('graficaResultados').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['PET', 'Papel', 'Cartón', 'Latas'],
    datasets: [{
      label: 'Kg Reciclados',
      data: [25, 40, 30, 15],
      backgroundColor: ['#2ecc71', '#3498db', '#f1c40f', '#e67e22']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
