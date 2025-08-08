import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StatsWidget, Widget } from '../../../core/components/summary/stats-widget/stats-widget';
import { StatsChartQs } from '../../../core/components/summary/stats-chart-qs/stats-chart-qs';

@Component({
  selector: 'app-summary',
  imports: [StatsWidget, StatsChartQs],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
  standalone: true,
})
export class Summary {
  widget: Widget[] = [
    {
      title: 'Reclamos totales',
      value: '152',
      icon: 'pi pi-table',
      additional: '24 nuevos desde la ultima visita',
    },
    {
      title: 'Reclamos pendientes',
      value: '24',
      icon: 'pi pi-exclamation-circle',
    },
    {
      title: 'Reclamos aprobados',
      value: '12',
      icon: 'pi pi-check',
    },
    {
      title: 'Reclamos rechazados',
      value: '12',
      icon: 'pi pi-times',
    }
  ];
}
