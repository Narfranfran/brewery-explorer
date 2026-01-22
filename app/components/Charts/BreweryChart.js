'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes necesarios para un gráfico de barras en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Componente que renderiza un gráfico de barras mostrando el número de cervecerías por tipo.
 * @param {{ breweries: Array<Object> }} props - Props del componente.
 * @returns {JSX.Element}
 */
export default function BreweryChart({ breweries }) {
  // Opciones de configuración para el gráfico.
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Número de Cervecerías por Tipo',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // Asegurarse de que los ticks del eje Y sean solo números enteros
          stepSize: 1,
        }
      }
    }
  };

  // Procesar los datos de las cervecerías para el gráfico.
  // Este bloque se ejecuta solo si hay cervecerías para procesar.
  const chartData = (() => {
    if (!breweries || breweries.length === 0) {
      // Devuelve una estructura de datos vacía si no hay cervecerías
      return {
        labels: [],
        datasets: [{
          label: 'Sin datos',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }],
      };
    }

    // Contar el número de cervecerías por cada 'brewery_type'.
    const countsByType = breweries.reduce((acc, brewery) => {
      const type = brewery.brewery_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(countsByType);
    const data = Object.values(countsByType);

    return {
      labels,
      datasets: [
        {
          label: 'Cantidad de Cervecerías',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(99, 255, 132, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(99, 255, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  })();

  return (
    <div className="relative h-96 w-full">
      {chartData ? <Bar options={options} data={chartData} /> : <p>Cargando datos del gráfico...</p>}
    </div>
  );
}
