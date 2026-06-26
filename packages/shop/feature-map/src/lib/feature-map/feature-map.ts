import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'shop-feature-map',
  imports: [],
  templateUrl: './feature-map.html',
  styleUrl: './feature-map.css',
})
export class FeatureMap implements AfterViewInit {
  @ViewChild('map', { static: true }) mapEl!: ElementRef;

  private platformId = inject(PLATFORM_ID);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const L = await import('leaflet');

    const map = L.map(this.mapEl.nativeElement).setView(
      [46.0569, 14.5058],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }
}