import { Component, computed, inject, signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import type { ChartData, ChartOptions } from 'chart.js';
import { GlobalState } from '../../../services/global-state/global-state';
import { ThemeState } from '../../../services/theme-state/theme-state';

@Component({
  selector: 'app-stats-chart-qs',
  imports: [ChartModule],
  templateUrl: './stats-chart-qs.html',
  styles: ``
})
export class StatsChartQs {
  themeState = inject(ThemeState);

  data: ChartData<'bar'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Aprobados',
        data: [4000, 4000, 3000, 7000],
        backgroundColor: '#047857',
        maxBarThickness: 36,
      },
      {
        label: 'Pendientes',
        data: [2000, 8000, 2000, 8000],
        backgroundColor: '#FDBA74',
        maxBarThickness: 36,
      },
      {
        label: 'Rechazados',
        data: [1000, 1000, 1000, 1000],
        backgroundColor: '#F87171',
        maxBarThickness: 36,
        borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 }
      }
    ]
  };

  get options(): ChartOptions<'bar'> {
    return {
      responsive: true,
      maintainAspectRatio: false,          // deja que el contenedor maneje la altura
      layout: { padding: 16 },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        title: {
          display: true,
          text: 'Reclamos por trimestre',
          align: 'start',
          font: { size: 16, weight: 600, style: "normal" },
          color: this.themeState.isDarkMode() ? '#fff' : '#000'
        },
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            usePointStyle: true,
            pointStyle: 'rect',
            boxWidth: 12,
            padding: 16,

          }
        },
        tooltip: {
          callbacks: {
            footer: (items) => {
              const total = items.reduce((s, i) => s + i.parsed.y, 0);
              return 'Total: ' + total.toLocaleString();
            }
          }
        }
      },
      elements: {
        bar: {
          borderRadius: 0,
          borderSkipped: false
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
            color: '#ffffff'
          },
          ticks: { color: this.themeState.isDarkMode() ? '#fff' : '#000' }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          suggestedMax: 20000,
          ticks: {
            stepSize: 5000,
            callback: (v) => Number(v).toLocaleString(),
            color: '#6b7280'
          },
          grid: {
            color: this.themeState.isDarkMode() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }
        }
      }
    }
  };

  
}
