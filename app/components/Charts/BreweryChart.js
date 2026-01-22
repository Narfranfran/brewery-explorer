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

/**
 * Chart.js es "tree-shakeable", lo que significa que para reducir el tamaño del paquete final,
 * debemos importar y registrar explícitamente los componentes (escalas, elementos, etc.) que vamos a utilizar.
 */
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
 * @param {{ breweries: Array<Object> | null }} props - Recibe la lista de cervecerías.
 * @returns {JSX.Element}
 */
export default function BreweryChart({ breweries }) {
  // Opciones de configuración para la apariencia y comportamiento del gráfico.
  const options = {
    responsive: true, // El gráfico se adapta al tamaño del contenedor.
    maintainAspectRatio: false, // Permite que el gráfico no mantenga una relación de aspecto fija.
    plugins: {
      legend: {
        display: false, // Ocultamos la leyenda general, ya que solo hay un dataset.
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
        beginAtZero: true, // El eje Y siempre empieza en 0.
        ticks: {
          // Forza a que los ticks (marcas) del eje Y sean solo números enteros.
          stepSize: 1,
        }
      }
    }
  };

  /**
   * Procesamiento de datos para el gráfico.
   * Se envuelve en una IIFE (Immediately Invoked Function Expression) para calcular los datos
   * de forma clara y contenida en el momento del render.
   */
  const chartData = (() => {
    // Si no hay datos de cervecerías, devuelve una estructura vacía para no romper el gráfico.
    if (!breweries || breweries.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: 'Sin datos',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }],
      };
    }

    // Usamos `reduce` para contar cuántas veces aparece cada 'brewery_type'.
    // El resultado es un objeto como: { micro: 10, brewpub: 5, ... }
    const countsByType = breweries.reduce((acc, brewery) => {
      const type = brewery.brewery_type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(countsByType); // Las etiquetas del eje X (ej. 'micro', 'brewpub')
    const data = Object.values(countsByType); // Los valores para las barras (ej. 10, 5)

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
          borderWidth: 1,
        },
      ],
    };
  })();

  // El div contenedor necesita tener una altura definida para que el gráfico se renderice.
  return (
    <div className="relative h-96 w-full">
      <Bar options={options} data={chartData} />
    </div>
  );
}
