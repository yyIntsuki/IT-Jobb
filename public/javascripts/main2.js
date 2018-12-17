$( function(){
    getUserLocation(function(userLocation){
        
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

    }
    
};