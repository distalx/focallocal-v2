import './addEvent.html';

var mapOptions = {
    zoom: 15
};

Meteor.startup(function () {
    GoogleMaps.load({
        key: 'AIzaSyDwzUnVACeUEgfXFH8Tyb1h4KCtqSVLgag'
    });
});

Template.addEvent.helpers({  
    geolocationError() {
        var error = Geolocation.error();
        return error && error.message;
    },
    mapOptions() {
        var latLng = Geolocation.latLng();
        if (GoogleMaps.loaded() && latLng) {
            return {
                center: new google.maps.LatLng(latLng.lat, latLng.lng),
                zoom: mapOptions.zoom
            };
        }
    },
    addMarker(latLng) {
        if (!latLng) return;
        if (!this.map) return;

        // TODO: Create here or expect a google.maps.Marker object?
        // TODO: Handle update case somewhere else
        var marker = new google.maps.Marker({
            position: latLng,
            map: this.map.instance
        });

        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(mapOptions.zoom);
        this.markers.push(marker);
    }
});

Template.addEvent.onCreated(function() {  
    if (this.markers) {
        console.log('>>> Markers already existed');
    } else {
        this.markers = [];
    }
    var self = this;

    GoogleMaps.ready('map', function(map) {
        self.mapObject = map;
        var marker;

        self.autorun(function() {
            var latLng = Geolocation.latLng();
            if (!latLng) return;

            if (!marker) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(latLng.lat, latLng.lng),
                    map: map.instance
                });

                // TODO: Re-assing this when user can select their own marker
                self.currentEventPosition = marker;
            } else {
                marker.setPosition(latLng);
            }

            map.instance.setCenter(marker.getPosition());
            map.instance.setZoom(mapOptions.zoom);
        });
    });
});