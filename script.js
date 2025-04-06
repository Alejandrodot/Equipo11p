const logContainer = document.getElementById('log-container');

function agregarEntrada() {
  const entrada = prompt("Escribe una nueva entrada para la bitácora:");
  if (entrada) {
    const div = document.createElement('div');
    div.className = 'entrada-bitacora';
    const fecha = new Date().toLocaleString();
    div.innerHTML = `<strong>${fecha}</strong><p>${entrada}</p>`;
    logContainer.appendChild(div);
  }
}

// Ejemplo de gráfica para sección resultados
const ctx = document.getElementById('graficaResultados').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [{
      label: 'Kg de residuos reciclados',
      data: [12, 19, 7, 14],
      backgroundColor: '#66bb6a'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
