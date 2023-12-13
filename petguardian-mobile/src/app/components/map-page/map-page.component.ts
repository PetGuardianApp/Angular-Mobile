import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  siteType = "";
  siteName = "Camp+Nou";
  showPopup = false;
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

  cafeMarkerOptions: google.maps.MarkerOptions = {
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

  userMarker: google.maps.Marker = new google.maps.Marker;

  parkMarkers: google.maps.Marker[] = [];
  petStoreMarkers: google.maps.Marker[] = [];
  cafeMarkers: google.maps.Marker[] = [];
  hotelMarkers: google.maps.Marker[] = [];
  hairDMarkers: google.maps.Marker[] = [];
  toyMarkers: google.maps.Marker[] = [];

  marker1: google.maps.Marker = new google.maps.Marker;
  marker2: google.maps.Marker = new google.maps.Marker;
  marker3: google.maps.Marker = new google.maps.Marker;
  marker4: google.maps.Marker = new google.maps.Marker;
  marker5: google.maps.Marker = new google.maps.Marker;
  marker6: google.maps.Marker = new google.maps.Marker;

  apiKey = 'AIzaSyAouWao_x1bulJ9RkrfYpYP49u2a9RzSXw';

  constructor(private httpClient: HttpClient, private api: ApiService) { }

  ngOnInit() {
    this.getPosition().then(position => {
      if (position) {
        this.center = position;
        this.userMarker.setPosition(position);

        // Display markers
        this.displayPetStoreMarkers();
        this.displayParkMarkers();
        this.displayPetFriendlyCafeMarkers();
        this.displayPetHotelMarkers();
        this.displayPetHairdresserMarkers();
        this.displayPetToyStoreMarkers();
      }
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

        // Clean up markers
        this.parkMarkers = [];
        this.petStoreMarkers = [];
        this.cafeMarkers = [];
        this.hotelMarkers = [];
        this.hairDMarkers = [];
        this.toyMarkers = [];

        // Display markers
        this.displayPetStoreMarkers();
        this.displayParkMarkers();
        this.displayPetFriendlyCafeMarkers();
        this.displayPetHotelMarkers();
        this.displayPetHairdresserMarkers();
        this.displayPetToyStoreMarkers();
      }
    });
  }

  displayParkMarkers() {
    const centerStr = `${this.center.lat}%2C${this.center.lng}`;

    this.api.getNearbySearch(centerStr, "1500", "park", "park").then((data: any) => {
      for (let i = 0; i < data.results.length; i++) {
        const park = data.results[i];
        const marker: google.maps.Marker = new google.maps.Marker({
          position: {
            lat: park.geometry.location.lat,
            lng: park.geometry.location.lng
          },
          title: park.name
        });
        this.parkMarkers.push(marker);
      }
    });
  }

  displayPetStoreMarkers() {
    const centerStr = `${this.center.lat}%2C${this.center.lng}`;
    this.api.getNearbySearch(centerStr, "1500", "pet_store", "pet_store").then((data: any) => {
      for (let i = 0; i < data.results.length; i++) {
        const petStore = data.results[i];
        const marker: google.maps.Marker = new google.maps.Marker({
          position: {
            lat: petStore.geometry.location.lat,
            lng: petStore.geometry.location.lng
          },
          title: petStore.name
        });
        this.petStoreMarkers.push(marker);
      }
    });
  }

  displayPetFriendlyCafeMarkers() {
    const centerStr = `${this.center.lat}%2C${this.center.lng}`;

    this.api.getNearbySearch(centerStr, "1500", "pet-friendly", "cafe|restaurant").then((data: any) => {
      for (let i = 0; i < data.results.length; i++) {
        const cafe = data.results[i];
        const marker: google.maps.Marker = new google.maps.Marker({
          position: {
            lat: cafe.geometry.location.lat,
            lng: cafe.geometry.location.lng
          },
          title: cafe.name
        });
        this.cafeMarkers.push(marker);
      }
    });
  }

  displayPetHotelMarkers() {
    const centerStr = `${this.center.lat}%2C${this.center.lng}`;

    this.api.getNearbySearch(centerStr, "1500", "pet-friendly", "hotel").then((data: any) => {
      for (let i = 0; i < data.results.length; i++) {
        const hotel = data.results[i];
        const marker: google.maps.Marker = new google.maps.Marker({
          position: {
            lat: hotel.geometry.location.lat,
            lng: hotel.geometry.location.lng
          },
          title: hotel.name
        });
        this.hotelMarkers.push(marker);
      }
    });
  }

  displayPetHairdresserMarkers() {
    const centerStr = `${this.center.lat}%2C${this.center.lng}`;

    this.api.getNearbySearch(centerStr, "1500", "pet_grooming", "pet_grooming").then((data: any) => {
      for (let i = 0; i < data.results.length; i++) {
        const hairdresser = data.results[i];
        const marker: google.maps.Marker = new google.maps.Marker({
          position: {
            lat: hairdresser.geometry.location.lat,
            lng: hairdresser.geometry.location.lng
          },
          title: hairdresser.name
        });
        this.hairDMarkers.push(marker);
      }
    });
  }

  displayPetToyStoreMarkers() {
    const centerStr = `${this.center.lat}%2C${this.center.lng}`;

    this.api.getNearbySearch(centerStr, "1500", "veterinary", "veterinary_care").then((data: any) => {
      for (let i = 0; i < data.results.length; i++) {
        const toyStore = data.results[i];
        const marker: google.maps.Marker = new google.maps.Marker({
          position: {
            lat: toyStore.geometry.location.lat,
            lng: toyStore.geometry.location.lng
          },
          title: toyStore.name
        });
        this.toyMarkers.push(marker);
      }
    });
  }

  openInfoWindow(marker: google.maps.Marker, windowIndex: string) {
    this.showPopup = true;
    this.siteName = marker.getTitle()?.replace(/ /g, "+") ?? "";
    this.siteType = windowIndex;
  }

  closePopup() {
    this.showPopup = false;
  }
}
