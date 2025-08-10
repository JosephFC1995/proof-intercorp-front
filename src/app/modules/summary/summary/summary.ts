import { Component, computed, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StatsWidget, Widget } from '../../../core/components/summary/stats-widget/stats-widget';
import { StatsChartQs } from '../../../core/components/summary/stats-chart-qs/stats-chart-qs';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { SummaryService } from '../../../core/services/summary.service/summary.service';
import { SummaryResponse } from '../../../core/types/summary';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-summary',
  imports: [StatsWidget, StatsChartQs, CommonModule, SkeletonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
  standalone: true,
})
export class Summary {
  queryClient = inject(QueryClient);
  summaryService: SummaryService = inject(SummaryService);

  query = injectQuery(() => ({
    queryKey: ['summary'],
    queryFn: () => this.summaryService.getSummary(),
    gcTime: 0,
    retry: 2,
  }))

  summary: Signal<SummaryResponse> = computed(() => this.query.data() || ({} as SummaryResponse));
  isLoading = computed(() => this.query.isFetching() || this.query.isLoading());

  widgetTotal: Signal<Widget> = computed(() => {
    return {
      title: "Reclamos totales",
      value: this.summary().totalClaims,
      icon: "pi pi-table",
      additional: "-",
    } as never
  });

  widgets: Signal<Widget[]> = computed(() => {
    if (!this.summary().totalsByLatestStatus) return [];
    return this.summary().totalsByLatestStatus.map(total => {
      return {
        title: total.status,
        value: total.total,
        icon: "pi pi-check",
        additional: "-",
      } as never
    });
  });
}
