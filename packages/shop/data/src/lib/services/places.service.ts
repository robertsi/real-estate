import { Injectable, inject  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

    private url = 'https://places.googleapis.com/v1/places:searchNearby';
    private apiKey = 'AIzaSyCXfyjZ77gYBtD27LpfyWA_DRfTbXwazm4';

    private http = inject(HttpClient);

    searchNearby(lat: number, lng: number): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': this.apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.formattedAddress,places.googleMapsUri,places.addressComponents,places.primaryType,places.types'
    });

    const body = {
      includedTypes: ["beach", "public_bath"],
      maxResultCount: 20,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng
          },
          radius: 1500
        }
      }
    };

    return this.http.post(this.url, body, { headers });
  }
}