// about controller
angular.module("myApp")
    .controller("aboutController", function ($scope,$http,) {

        $scope.photos;
        $http.get(serverUrl+"/getBestPhotos")
            .then(function (response) {
                $scope.photos=response.data;
            },function (error){console.log(error)})

    });
