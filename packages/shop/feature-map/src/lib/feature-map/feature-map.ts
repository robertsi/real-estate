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
import { PlacesService } from '@org/shop/data'

import { from } from 'rxjs';
import { concatMap, reduce } from 'rxjs/operators';

@Component({
  selector: 'shop-feature-map',
  imports: [],
  templateUrl: './feature-map.html',
  styleUrl: './feature-map.css',
})
export class FeatureMap implements AfterViewInit {
  @ViewChild('map', { static: true }) mapEl!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private readonly placesService = inject(PlacesService);
  private places: any[] = [];

  downloadJson(data: any, filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

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

   const circles = [
  { "latitude": 45.530751, "longitude": 13.564560 },
  { "latitude": 45.530751 , "longitude": 13.564560 + 0.0128 },
  { "latitude": 45.530751 , "longitude": 13.564560 + 2 *0.0128 },
  { "latitude": 45.530751 , "longitude": 13.564560 + 3 *0.0128 },
  { "latitude": 45.530751 + 0.0090 , "longitude": 13.564560 + 3 *0.0128 },
  { "latitude": 45.530751 + 0.0090 , "longitude": 13.564560 + 4 *0.0128 },
  { "latitude": 45.530751 + 0.0090 , "longitude": 13.564560 + 5 *0.0128 },
  { "latitude": 45.530751 + 0.0090 , "longitude": 13.564560 + 6 *0.0128 },
  { "latitude": 45.530751 + 0.0090 , "longitude": 13.564560 + 7 *0.0128 },
  { "latitude": 45.530751 + 0.0090 , "longitude": 13.564560 + 8 *0.0128 },
  { "latitude": 45.530751 + 2 * 0.0090 , "longitude": 13.564560 + 8 *0.0128 },
  { "latitude": 45.530751 + 2 * 0.0090 , "longitude": 13.564560 + 9 *0.0128 },
  { "latitude": 45.530751 + 2 * 0.0090 , "longitude": 13.564560 + 10 *0.0128 },
  { "latitude": 45.530751 + 2 * 0.0090 , "longitude": 13.564560 + 11 *0.0128 },
  { "latitude": 45.530751 + 2 * 0.0090 , "longitude": 13.564560 + 12 *0.0128 },
  { "latitude": 45.530751 + 2 * 0.0090 , "longitude": 13.564560 + 13 *0.0128 },
  { "latitude": 45.530751 + 3 * 0.0090 , "longitude": 13.564560 + 13 *0.0128 },
  { "latitude": 45.530751 + 4 * 0.0090 , "longitude": 13.564560 + 13 *0.0128 },
    { "latitude": 45.530751 + 4 * 0.0090 , "longitude": 13.564560 + 14 *0.0128 },
  { "latitude": 45.530751 + 5 * 0.0090 , "longitude": 13.564560 + 13 *0.0128 },
    { "latitude": 45.530751 + 5 * 0.0090 , "longitude": 13.564560 + 14 *0.0128 },


  { "latitude": 45.530751 + 6 * 0.0090 , "longitude": 13.564560 + 13 *0.0128 },
    { "latitude": 45.530751 + 6 * 0.0090 , "longitude": 13.564560 + 14 *0.0128 },
  { "latitude": 45.530751 + 6 * 0.0090 , "longitude": 13.564560 + 12 *0.0128 },
  { "latitude": 45.530751 + 6 * 0.0090 , "longitude": 13.564560 + 11 *0.0128 },


  { "latitude": 45.530751 + 7 * 0.0090 , "longitude": 13.564560 + 13 *0.0128 },
  { "latitude": 45.530751 + 7 * 0.0090 , "longitude": 13.564560 + 12 *0.0128 },
  { "latitude": 45.530751 + 7 * 0.0090 , "longitude": 13.564560 + 11 *0.0128 },

   { "latitude": 45.530751 - 0.0090, "longitude": 13.564560 },
   { "latitude": 45.530751 - 0.0090, "longitude": 13.564560 + 1 *0.0128},
   { "latitude": 45.530751 - 0.0090, "longitude": 13.564560 +2 *0.0128},
   { "latitude": 45.530751 - 2 *0.0090, "longitude": 13.564560 +2 *0.0128},
   { "latitude": 45.530751 - 3 *0.0090, "longitude": 13.564560 +2 *0.0128},
   { "latitude": 45.530751 - 4 *0.0090, "longitude": 13.564560 +2 *0.0128},
   { "latitude": 45.530751 - 5 *0.0090, "longitude": 13.564560 +2 *0.0128},
   { "latitude": 45.530751 - 6 *0.0090, "longitude": 13.564560 +2 *0.0128},

];
    //L.marker(loc).addTo(map).bindPopup('10, Search location').openPopup();
//     circles.forEach((circle) => {
//       L.circle([circle.latitude, circle.longitude], {
//       radius: 1000, // meters
//       color: 'blue',
//       fillOpacity: 0.2
//   }).addTo(map);
// });


// from(circles).pipe(
//   concatMap(circle =>
//     this.placesService.searchNearby(circle.latitude, circle.longitude)
//   ),
//   reduce((acc, response) => {
//     return acc.concat(response.places ?? []);
//   }, [] as any[])
// ).subscribe(allPlaces => {
//   console.log('ALL PLACES:', allPlaces);

//   this.places = allPlaces;
//   this.downloadJson(allPlaces, 'places.json');
// });


    PLACES.forEach((place) => {
      let lat = 0, lon = 0;
      lat = place.location.latitude;
      lon = place.location.longitude;
      //const url = `https://www.google.com/maps?q=${lat},${lon}`;
      const url = place.googleMapsUri
        const popupContent = `
          <a href="${url}" target="_blank" rel="noopener noreferrer">
            ${place.displayName.text}
          </a>
        `;
      L.marker([place.location.latitude, place.location.longitude])
        .addTo(map)
        .bindPopup(popupContent);
    });




    //open street map data
    // SI_BEACHES.forEach((place) => {
    //   let lat = 0, lon = 0;
    //   if(place.lat && place.lon) {
    //     lat = place.lat;
    //     lon = place.lon;
    //   }
    //   if(place.center) {
    //     lat = place.center.lat;
    //     lon = place.center.lon;
    //   }
    //     const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`;
    //     const popupContent = `
    //       <a href="${url}" target="_blank" rel="noopener noreferrer">
    //         ${place.tags.name}
    //       </a>
    //     `;
    //     L.marker([lat, lon])
    //       .addTo(map)
    //       .bindPopup(popupContent);
    //   });
  }
}
