// Global variables.
var map,
    infowindow,
    geocoder,
    userLocationMarker,
    markers = [];

// Main Function, Runs on page load.
$(function(){
    initMap();

    getUserLocation(function(userLocation){

        if(userLocation.allowsNavigator){
            centerMap(userLocation.coordinates);

            getPostalCode(userLocation.coordinates, function(postalCode){
                if(postalCode.available){
                   placeJobsOnMap(postalCode.code);
                };
            });
        }else{
            console.log("Could not get position. showing jobs for stockholm");
            placeJobsOnMap('stockholm');
        };
    });
});

// Gets and places Jobs on map.
function placeJobsOnMap(searchTerm){
    setMapOnAll(null);
    markers = [];
    getJobs(searchTerm, function(jobs){
        // Go through all jobs.
        $(jobs).each(function(){
            getJobInfo(this.annonsid, function(job){
                var address = job.arbetsplats.address + job.arbetsplats.postort
                getPositonAddress(address, function(jobCoordinates){
                    createMarker(jobCoordinates, job.annons.annonsrubrik);
                });
            });
        });
   });
}

// Ask's user for their current location.
function getUserLocation(callback){
    var allowsNavigator = false,
        coordinates;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            allowsNavigator = true;
            coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            callback({
                allowsNavigator: allowsNavigator,
                coordinates: coordinates
            });
        }, function(error){
            callback({
                allowsNavigator: allowsNavigator,
                coordinates: coordinates
            });
        });
    };
};

// Generate a google map.
function initMap(){
    var stockholm = {
        lat: 59.3325800,
        lng: 18.0649000
    }
    // jquery selector returns a collection, we select the first element in it.
    map = new google.maps.Map($('#map')[0], {
        center: stockholm,
        zoom: 13
    });
    infoWindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder;
    userLocationMarker = new google.maps.Marker({
        map: map,
        position: stockholm,
        title: "Dra mig!",
        draggable:true
    });

    google.maps.event.addListener(userLocationMarker, 'dragend', function(){
        getPostalCode({
            lat: this.position.lat(),
            lng: this.position.lng() 
        }, function(postalCode){
            placeJobsOnMap(postalCode.code);
        });
    });
};

// Centers map at user location and places a marker.
function centerMap(coordinates){
    map.setCenter(coordinates)
    userLocationMarker.setPosition(coordinates);
};

function createMarker(coordinates, title){
    var marker = new google.maps.Marker({
        map: map,
        position: coordinates,
        title: title
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(title);
        infoWindow.open(map, this);
    });
    markers.push(marker);
};

// Sets the map on all markers in the array.
function setMapOnAll(setMap) {
    $(markers).each(function(){
        this.setMap(setMap);
    })
}

// Get postal code from coordinates.
function getPostalCode(coordinates, callback){
    geocoder.geocode({'location':coordinates}, function(results){
        var postalCodeAvailable = false,
            postalCode = "",
            addressComponents = results[0].address_components;
        $.each(addressComponents, function(){
            if(this.types[0]=="postal_code"){
               postalCode=this.short_name;
               postalCodeAvailable = true;
            };
        });
        
        callback({
            available: postalCodeAvailable,
            code: postalCode
        });
    });
};

// Get coordinates from address.
function getPositonAddress(address, callback){
    geocoder.geocode({'address':address}, function(results, status){
        if(status == "OK"){
            callback(results[0].geometry.location);
        }else{
            console.log('Geocode was not successful for the following reason: ' + status);
        };
    });
};

// Get jobs from arbetsförmedlingen.
function getJobs(searchTerm, callback){
    $.ajax({
        method: 'GET',
        url: 'https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?nyckelord=' + searchTerm + '&yrkesomradeid=3',
        header: {
            'Accept': 'application/json',
            'Accept-Language': 'sv'
        },
        success: function (data){
            callback(data.matchningslista.matchningdata);
        },
        error: function (error){
            console.log(error);
        }
    });
};

function getJobInfo(annonsId, callback) {
    $.ajax({
        method: 'GET',
        url: 'http://api.arbetsformedlingen.se/af/v0/platsannonser/' + annonsId,
        header: {
            'Accept': 'application/json',
            'Accept-Language': 'sv'
        },
        success: function (data) {
            callback(data.platsannons);
        },
        error: function (request, status, error){
            console.log(error);
        }
    });
};