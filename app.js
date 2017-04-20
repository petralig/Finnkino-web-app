$(function() {

    // 1. sivua ladattaessa, kutsu tätä
    function getTheatres() {
        console.log('getTheatres');
        $.ajax({
            'url': 'http://www.finnkino.fi/xml/TheatreAreas/',
            'dataType': 'xml',
            'success': onTheaterData
        });
    }


    // Haku 2. hae teatterin esitysajat
    function getTheatreSchedule(theaterName) {

        if(theatreNameToId[theaterName]) {
            console.log('teatteri '+theaterName+' löytyy');

            // TÄSTÄ JATKOT: jos löytyy, lähetä AJAX-kutsu (alla)
            var theaterId = theatreNameToId[theaterName];
        } else {
            console.log('teatteria '+theaterName+' ei löydy!');
            // JOS EI, kerro käyttäjälle, että tuntematon elokuvateatteri
        }

        console.log('getTheatreSchedule');
        $.ajax({
            'url': 'http://www.finnkino.fi/xml/Schedule/?area='+theaterId,
            'dataType': 'xml',
            'success': onSchedule
        });
    }

    // Haku 3.
    function onSchedule(data) {
        console.log('onSchedule');
    }

    /*
    function onGetTheaters(data) {
        // console.log(data);
        var theaterInfo = {};
        theaterInfo.id = data.ID;
        theaterInfo.name = data.Name;
        //var xmlText = new XMLSerializer().serializeToString(xml);
        //console.log('onSelloData: '+xmlText);
        $(xml).find('Show').each(function() {
            console.log('---------------------------------------------');
            console.log('ID: '+$(this).find('ID').text());
            console.log('Name: '+$(this).find('Name').text());
            //console.log('Genres: '+$(this).find('Genres').text());
            //console.log('Starts at: '+$(this).find('dttmShowStartUTC').text());
            //console.log('Ends at: '+$(this).find('dttmShowEndUTC').text());
            console.log('---------------------------------------------');

        });
    }
    */

    var theatreNameToId = {};

    // 2.
    function onTheaterData(xml) {
        console.log('onTheaterData');
        var result = {};
        $(xml).find('TheatreArea').each(function() {
        //for(var entry of data) {
            var id = $(this).find('ID').text();
            var name = $(this).find('Name').text();
            theatreNameToId[name] = id;
            if(name.includes(':')) {
                theatreNameToId[name.split(': ')[1]] = id;
            }

        });
        console.log(theatreNameToId);
    }


    // Haku 1.
    $('#searchButton').click(function() {
        console.log('search');
        var theaterName = $( '#theaterInput' ).val();
        console.log(theaterName);
        getTheatreSchedule(theaterName);
        //onGetTheaters();
    });

    //------------- DROPDOWN START

    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */

    /*
    function theatreDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
    */

    //------------- DROPDOWN END

    // kun sivu ladataan, kutsu tätä!
    getTheatres();

});
