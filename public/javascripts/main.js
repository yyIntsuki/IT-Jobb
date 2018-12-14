//DOM ready =======================================================

$(document).ready(function () {
    $('#doSearch').click(function (e) {
        getZip();
        e.preventDefault();
    })
});

//Functions =======================================================
function getZip() {

    var zipCode = $('#zipCode').val();

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

                    // Create a variable to represent annonsId so we can get details from each annons
                    var annonsId = data.matchningslista.matchningdata[i].annonsid;
                    getMoreInfo(annonsId);
                }
            }
        },

        error: function (request, status, error) {
            console.log(error);
        }
    });
}

// Variables needed for GET details
var workAdTitle;
var workName;           
var workPublishDate;
var workAddress;
var workCompanyName;
var workEmploymentDetails;
var workLastDate;
var workUrl;

// GET details from annonsId
function getMoreInfo(annonsId) {
    $.ajax({

        method: 'GET',
        url: 'http://api.arbetsformedlingen.se/af/v0/platsannonser/' + annonsId,

        header: {
            'Accept': 'application/json',
            'Accept-Language': 'sv'
        },

        success: function (data) {
            workAdTitle = data.platsannons.annons.annonsrubrik;
            workName = data.platsannons.annons.yrkesbenamning;
            workPublishDate = data.platsannons.annons.publiceraddatum;
            workAddress = data.platsannons.arbetsplats.besoksadress;
            workCompanyName = data.platsannons.arbetsplats.arbetsplatsnamn;
            workEmploymentDetails = data.platsannons.villkor.arbetstid;
            workLastDate = data.platsannons.ansokan.sista_ansokningsdag;
            workUrl = data.platsannons,annons,platsannonsUrl;
        },

        error: function (req, status, error) {
            console.log(error);
        }
    });
}

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