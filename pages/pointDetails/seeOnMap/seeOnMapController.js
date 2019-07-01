angular.module("myApp")
    .controller("seeOnMapController", function ($scope,$http,) {

        function initMap() {
            var option = {
                zoom: 8,
                center: {lat: 42.3601,lng:-71.0589}
            }
            var map= new
            google.maps.Map(document.getElementById('map'),option)
        }
    });
