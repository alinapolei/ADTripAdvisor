angular.module("myApp" )
    .controller('regController', function($scope, $http) {
        serverUrl = "http://localhost:3000"
        $http.get(serverUrl + "/getCountries")
        .then(function(response) {
            $scope.countries = response.data;
        });
        $http.get(serverUrl + "/getQuestions")
            .then(function(response) {
                $scope.quest = response.data;
            });

});
