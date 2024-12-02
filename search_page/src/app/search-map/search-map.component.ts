import { Component, OnInit, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-search-map',
  imports: [GoogleMapsModule],
  templateUrl: './search-map.component.html',
  styleUrl: './search-map.component.css'
})
export class SearchMapComponent implements OnInit {
    

    @Input('marker') marker;
    @Input('markerName') markerName;

    zoom = 12;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  
  constructor() {}
 
  ngOnInit() {


    navigator.geolocation.getCurrentPosition((marker) => {
    });

  }

}
