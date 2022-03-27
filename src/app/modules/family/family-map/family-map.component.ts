import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station.model';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-family-map',
  templateUrl: './family-map.component.html',
  styleUrls: ['./family-map.component.scss']
})
export class FamilyMapComponent implements OnInit {
  title = 'my-maps-project';
  zoom = 12
  center!: google.maps.LatLngLiteral
  markers = [] as any
  directionsService = [] as any
  directionsRenderer = [] as any
  stationsList!: Station[];
  map: google.maps.Map | undefined;
  image = {
    url: ".\.\.\.\assets\location-pin.png",
    size: new google.maps.Size(20, 32)
  }
  constructor(private station: StationService) { }
  ngOnInit() {
    this.station.getAllStations().subscribe(data => {
      this.stationsList = data,
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
            this.markers[0] = {
              position: {
                lat: this.center.lat,
                lng: this.center.lng,
              },
              label: {
                color: 'red',
                text: 'you are here',
              },
              title: 'Family Home ',
              options: { animation: google.maps.Animation.BOUNCE },
              setClickable: true
            },
            this.directionsService = new google.maps.DirectionsService(),
            this.directionsRenderer = new google.maps.DirectionsRenderer();
          this.map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
              zoom: 6,
              center: { lat: 41.85, lng: -87.65 },
            }
          );

          this.directionsRenderer.setMap(this.map);


        })
      this.stationsList.forEach((s, i) => {
        this.markers.push({
          position: {
            lat: s.pointX,
            lng: s.pointY,
          },
          label: {
            color: 'black',
            text: s.address,
          },
          icon: this.image,
          title: s.address,
          setClickable: true
        })
        // google.maps.event.addListener(this.markers[i], 'click', function() {console.log("ggggggggggggggggggg");});

      })
      const infoWindow = new google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });
      // markers can only be keyboard focusable when they have click listeners
      // open info window when marker is clicked
      this.markers[0].addListener("click", () => {
        infoWindow.setContent(this.markers[0].label);
        infoWindow.open(this.map, this.markers[0]);
      });
    })

  }





}
