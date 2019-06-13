var app = angular.module('myApp', []);
serverUrl = "http://localhost:3000"



app.controller('myCtrl', function($scope, $http) {
    $http.get(serverUrl + "/getCountries")
        .then(function(response) {
            $scope.answer = response.data;
        });
});