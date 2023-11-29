import { HttpClient } from '@angular/common/http';
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
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "../assets/mapIcons/user_position.svg",
      scaledSize: new google.maps.Size(50, 50)
    }
  };

  parkMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "../assets/mapIcons/map_park.svg",
      scaledSize: new google.maps.Size(50, 50)
    }
  };

  cofeeMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "../assets/mapIcons/map_cofee.svg",
      scaledSize: new google.maps.Size(50, 50)
    }
  };

  hairMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "../assets/mapIcons/map_hair.svg",
      scaledSize: new google.maps.Size(50, 50)
    }
  };

  hotelMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "../assets/mapIcons/map_hotel.svg",
      scaledSize: new google.maps.Size(50, 50)
    }
  };

  storeMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "../assets/mapIcons/map_store.svg",
      scaledSize: new google.maps.Size(50, 50)
    }
  };

  toystoreMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "../assets/mapIcons/map_toystore.svg",
      scaledSize: new google.maps.Size(50, 50)
    }
  };

  markers: google.maps.Marker[] = [];
  parkMarkers: google.maps.Marker[] = [];

  userMarker: google.maps.Marker = new google.maps.Marker;
  marker1: google.maps.Marker = new google.maps.Marker;
  marker2: google.maps.Marker = new google.maps.Marker;
  marker3: google.maps.Marker = new google.maps.Marker;
  marker4: google.maps.Marker = new google.maps.Marker;
  marker5: google.maps.Marker = new google.maps.Marker;
  marker6: google.maps.Marker = new google.maps.Marker;

  apiKey = 'AIzaSyAouWao_x1bulJ9RkrfYpYP49u2a9RzSXw';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getPosition().then(position => {
      if (position) {
        this.center = position;
        this.userMarker.setPosition(position);

        // Put a marker in user location
        //this.markers.push(marker);

        // Get near sites of interest
        this.getNearbyRestaurants(this.center).then(restaurants => {
          // restaurants.forEach(restaurant => {
          //   // Create markers for sites of interest
          //   const marker: google.maps.Marker = new google.maps.Marker({
          //     position: {
          //       lat: restaurant.geometry.location.lat(),
          //       lng: restaurant.geometry.location.lng()
          //     },
          //     title: restaurant.name
          //   });

          //   this.markers.push(marker);
          // });
        });
      }
    });

    this.generateMockMarkers();
  }

  generateMockMarkers() {
    var position1 = {
      lat: 41.616858,
      lng: 0.644994
    }
    var position2 = {
      lat: 41.602403,
      lng: 0.646611
    }
    var position3 = {
      lat: 41.593508,
      lng: 0.629787
    }
    var position4 = {
      lat: 41.639440,
      lng: 0.627794
    }
    var position5 = {
      lat: 41.627029,
      lng: 0.617831
    }
    var position6 = {
      lat: 41.623057,
      lng: 0.601558
    }

    this.marker1.setPosition(position1);
    this.marker2.setPosition(position2);
    this.marker3.setPosition(position3);
    this.marker4.setPosition(position4);
    this.marker5.setPosition(position5);
    this.marker6.setPosition(position6);
    this.marker1.setIcon();

    this.parkMarkers.push(this.marker1);
    this.parkMarkers.push(this.marker2);
    this.parkMarkers.push(this.marker3);
    this.parkMarkers.push(this.marker4);
    this.parkMarkers.push(this.marker5);
    this.parkMarkers.push(this.marker6);
  }

  getNearbyRestaurants(position: google.maps.LatLngLiteral): Promise<any[]> {
    const radius = 500;
    console.log(position);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/
    json?location=${position.lat},${position.lng}
    &radius=${radius}
    &type=restaurant
    &key=${this.apiKey}`;

    this.httpClient.get<any>(url);
    return new Promise((resolve, reject) => {
      this.httpClient.get<any>(url).subscribe(
        (response: any) => {
          resolve(response.results);
        },
        (error) => {
          reject(error);
        }
      );
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

  toggleButtonClass(buttonId: string, marker: google.maps.Marker): void {
    var button = document.getElementById(buttonId);
    if (button instanceof HTMLButtonElement) {
      const isActive = button.classList.contains('button-on');

      if (isActive) {
        button.classList.remove('button-on');
        button.classList.add('button-off');

        marker.setVisible(true);
      } else {
        button.classList.add('button-on');
        button.classList.remove('button-off');

        marker.setVisible(false);
      }
    }
  }

  obtainCoordByStr() {
    alert("executing...")
    const direccionInput = document.getElementById("searchInput") as HTMLInputElement;
    const direccion = direccionInput.value;
    const dirFormatQuery = encodeURIComponent(direccion);

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${dirFormatQuery}&key=${this.apiKey}`;
    this.httpClient.get(apiUrl).subscribe((data: any) => {
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        console.log(direccion, location)
        this.center = location;
        this.userMarker.setPosition(location);
      }
    });
  }
}
