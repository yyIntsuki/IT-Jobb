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
            var workAdTitle = data.platsannons.annons.annonsrubrik;
            var workName = data.platsannons.annons.yrkesbenamning;
            var workPublishDate = data.platsannons.annons.publiceraddatum;
            var workAddress = data.platsannons.arbetsplats.besoksadress;
            var workCompanyName = data.platsannons.arbetsplats.arbetsplatsnamn;
            var workEmploymentDetails = data.platsannons.villkor.arbetstid;
            var workLastDate = data.platsannons.ansokan.sista_ansokningsdag;
            var workUrl = data.platsannons,annons,platsannonsUrl;
           
            var workName = JSON.stringify(data.platsannons.annons.yrkesbenamning);
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