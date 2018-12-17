// Global variables
var map,
    infowindow;

$(function(){
    getUserLocation(function(userLocation){
        if(userLocation.allowsNavigator){
            $('#searchForm').hide();
            $('#map').show();
            initMap(userLocation.coordinates);
        };
    });
});

// Ask's user for their current location
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

// Generate a google map
function initMap(coordinates){
    // jquery selector returns a collection, we select the first element in it.
    map = new google.maps.Map($('#map')[0], {
        center: coordinates,
        zoom: 15
    });
}