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
                $('#searchResult').append('Inga jobb hittades.');
            }
            else {
                for (var i = 0; i < data.matchningslista.matchningdata.length; i++) {
                    $('#searchResult').append(data.matchningslista.matchningdata[i].annonsrubrik + "<br>");

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