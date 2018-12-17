// Global variables.
var map,
    infowindow,
    geocoder;

// Main Function, Runs on page load.
$(function(){
    initMap();
    getUserLocation(function(userLocation){
        if(userLocation.allowsNavigator){
            centerMap(userLocation.coordinates);
            getPostalCode(userLocation.coordinates, function(postalCode){
                if(postalCode.available){
                   getJobs(postalCode.code, function(jobs){
                        console.log(jobs);
                   })
                };
            });
        };
    });
});

// Ask's user for their current location.
function getUserLocation(callback){
    var allowsNavigator,
        coordinates;

    if(navigator.geolocation){
        allowsNavigator = true;

        navigator.geolocation.getCurrentPosition(function(position){
            coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            callback({
                allowsNavigator: allowsNavigator,
                coordinates: coordinates
            });
        });
    }else{

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
};

// Centers map at user location and opens a infowindow.
function centerMap(coordinates){
    map.setCenter(coordinates)
    createMarker(coordinates, "Du är här!");
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
};

// Get postalcode from coordinates.
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
        })
    });
};

// Get jobs from arbetsförmedlingen
function getJobs(searchTerm, callback){
    searchTerm = "a"
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

            }
            
        });
};