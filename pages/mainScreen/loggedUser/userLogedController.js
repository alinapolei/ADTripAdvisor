serverUrl = "http://localhost:3000";
angular.module("myApp")
    .controller("userLoggedController", function ($scope, $http) {
        $scope.points=[];
        $http.get(serverUrl + "/getRandom")
            .then(function (response) {
                //$scope.points=response.data;
                var i;
                for(i=0; i<3; i++) {
                    $http({
                        method: 'GET',
                        url: serverUrl + '/getPOIInfo?tagId=' + response.data[i].poi_id
                    }).then(function successCallback(response) {
                        $scope.points.push(response.data);
                    }, function errorCallback(error) {
                        alert(error.data())
                    });
                }

            }, function (error) {
                alert(error.data);
            });
    });