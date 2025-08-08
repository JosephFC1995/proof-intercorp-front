import { Component, Input } from '@angular/core';

export type Widget = {
  title: string;
  value: string;
  icon: string;
  additional?: string;
}

@Component({
  selector: 'app-stats-widget',
  imports: [],
  templateUrl: './stats-widget.html',
  styles: ``
})
export class StatsWidget {
  @Input() widget!: Widget;
}
