//DOM ready =======================================================

$(document).ready(function () {
    $('#doSearch').click(function (e) {
        var zipCode = $('#zipCode').val();
        getZip(zipCode);
        e.preventDefault();
    })
});

//Functions =======================================================
function getZip(zipCode) {

    $.ajax({
        method: 'GET',
        url: 'https://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?nyckelord=' + zipCode + '&yrkesomradeid=3',

        header: {
            'Accept': 'application/json',
            'Accept-Language': 'sv'
        },

        success: function (data) {
            $('#searchResult').empty();
            console.log(data);
            if (data.matchningslista.antal_platsannonser == 0) {
                $('#searchResult').append('Inga jobb hittades för detta postnummer.');
            }
            else {
                for (var i = 0; i < data.matchningslista.matchningdata.length; i++) {
                    $('#searchResult').append( "<hr>" + data.matchningslista.matchningdata[i].annonsrubrik);

                    /*
                    // Create a variable to represent annonsId so we can get details from each annons
                    var annonsId = data.matchningslista.matchningdata[i].annonsid;
                    getMoreInfo(annonsId);
                    */
                }
            }
        },

        error: function (request, status, error) {
            console.log(error);
        }
    });
}

/*
function getMoreInfo(annonsId) {
    $.ajax({

        method: 'GET',
        url: 'http://api.arbetsformedlingen.se/af/v0/platsannonser/' + annonsId,

        header: {
            'Accept': 'application/json',
            'Accept-Language': 'sv'
        },

        success: function (data) {
            var workName = data.platsannons.annons.yrkersbenämning;
            var workAddress = data.platsannons.arbetsplats.besöksadress;
        }
    });
}
*/

// Searchbar Focus
$(function () {
    $("#zipCode").focus();
});

// Search upon hitting Enter button
$("#zipCode").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#doSearch").click();
    }
});

// Map =====================================================================
// global variables
var map;
var infowindow;
var geocoder = new google.maps.Geocoder;
// Ask for location
$(function (){
    if(navigator.geolocation){
        var coordinates;
        var postalCode
        navigator.geolocation.getCurrentPosition(function(position){
            coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            geocoder.geocode({'location': coordinates}, function(results){
                var addressComponents = results[0].address_components;
        
                $.each(addressComponents, function(){
                    if(this.types[0]=="postal_code"){
                       postalCode=this.short_name;
                    }
                });
            });

            $("#searchForm").hide();
            $("#map").show();
            initMap(coordinates);
            getZip(postalCode);
        });
    };
});

// Create a map
function initMap(coordinates){
    var pyrmont = { lat: -33.867, lng: 151.195 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow();

    infoWindow.setPosition(coordinates);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);

    infoWindow = new google.maps.InfoWindow();
    
};