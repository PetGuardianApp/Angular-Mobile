import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  zoom = 15;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
    disableDefaultUI: true,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markers: google.maps.Marker[] = [];
  apiKey = 'AIzaSyAouWao_x1bulJ9RkrfYpYP49u2a9RzSXw';

  constructor() {
    
  }

  ngOnInit() {
    this.getPosition().then(position => {
      if (position) {
        this.center = position;

        var marker:google.maps.Marker = new google.maps.Marker;
        marker.setPosition(position);
        marker.setIcon("/assets/mapIcons/map_park.svg");

        // Put a marker in user location
        this.markers.push(marker);

        /*
        // Get near sites of interest
        this.getNearbyRestaurants(this.center).then(restaurants => {
          restaurants.forEach(restaurant => {
            // Create markers for sites of interest
            const marker: google.maps.Marker = new google.maps.Marker({
              position: {
                lat: restaurant.geometry.location.lat(),
                lng: restaurant.geometry.location.lng()
              },
              title: restaurant.name
            });
    
            this.markers.push(marker);
          });
        });
        */
      }
    });    
  }

  getNearbyRestaurants(position: google.maps.LatLngLiteral): Promise<any[]> {
    const radius = 500;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.lat},${position.lng}&radius=${radius}&type=restaurant&key=${this.apiKey}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => {
        console.error('Error al obtener restaurantes cercanos:', error);
        return [];
      });
  }

  getPosition(): Promise<google.maps.LatLngLiteral | null> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          const position: google.maps.LatLngLiteral = {
            lng: resp.coords.longitude,
            lat: resp.coords.latitude
          };
          resolve(position);
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
