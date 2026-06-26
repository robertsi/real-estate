import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLACES } from './map-data';
import { SI_BEACHES } from './map-data-os-si';

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

    const loc: L.LatLngExpression = [45.530751481732494, 13.564560421878287];
    //const loc: L.LatLngExpression = [46.5477847, 15.6243754];
    //containes nepremicnine.net api key lol....
    //https://maps.googleapis.com/maps/api/geocode/json?language=&address=Ul.+Roberta+Hvalca+14%2C+2000+Maribor%2C+Slovenia&region=si&bounds=&components=&key=AIzaSyBilazss5s7dfNex93L6j6kRqF6kQCwhIo&sensor=false
    //https://nominatim.openstreetmap.org/search?q=Ulica+Roberta+Hvalca+14+Maribor&format=json
    const map = L.map(this.mapEl.nativeElement).setView(loc, 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker(loc).addTo(map).bindPopup('10, Search location').openPopup();

    // PLACES.forEach((place) => {
    //   L.marker([place.location.latitude, place.location.longitude])
    //     .addTo(map)
    //     .bindPopup(place.displayName.text);
    // });

    // SI_BEACHES.forEach((place) => {
    //   if(place.lat && place.lon && place.tags.name) {
    //     L.marker([place.lat, place.lon])
    //       .addTo(map)
    //       .bindPopup(place.tags.name);
    //   }
    // });

    SI_BEACHES.forEach((place) => {
      if(place.center) {
        L.marker([place.center.lat, place.center.lon])
          .addTo(map)
          .bindPopup("beach");
      }
    });
  }
}
