app.controller("pointDetailsController", function ($scope, $routeParams, $http, $uibModal, $window, $location, $rootScope) {
    $scope.point;
    $scope.reviews=[];
    $http({
        method: 'GET',
        url: serverUrl + '/getPOIInfo?tagId=' + $routeParams.pointID
    }).then(function successCallback(response) {
        $scope.point = response.data;
        getReviews();
    }, function errorCallback(error) {
        alert(error.data())
    });
    $scope.addReview = function () {
        if ($window.sessionStorage.getItem('name') != null && $window.sessionStorage.getItem('name') != "guest") {
            var modalInstance = $uibModal.open({
                templateUrl: "pages/pointDetails/addReview/addReviewModal.html",
                controller: "addReviewController as addReviewCtrl",
                size: '',
                resolve: {
                    poi_id: function () {
                        return $scope.poi_id;
                    }
                }
            });

            modalInstance.result.then(function (response) {
                if (response) {
                    var req = {
                        method: 'POST',
                        url: serverUrl + '/private/review',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem('token')
                        },
                        data: {
                            poi_id: $scope.point.poi_id,
                            rating: response.rating,
                            review: response.review
                        }
                    }
                    $http(req).then(function () {
                        getReviews();
                    }, function (error) {
                        alert(error.data);
                    });
                }
            });
        }
        else {
            $location.path('/user/userLogin');
        }
    }

    function getReviews(isUpdateRating) {
        $scope.reviews = [];
        $http({
            method: 'GET',
            url: serverUrl + '/getReviews?tagId=' + $routeParams.pointID
        }).then(function successCallback(response) {
            if(response.data[0])
                $scope.reviews.push(response.data[0]);
            if(response.data[1])
                $scope.reviews.push(response.data[1]);

            if(isUpdateRating) {
                var sum = 0;
                for (i = 0; i < response.data.length; i++) {
                    sum += response.data[i].rating;
                }
                $scope.point.rating = sum / response.data.length;
            }

        }, function errorCallback(error) {
            alert(error.data())
        });
    }
    function getPoint(){
        $http({
            method: 'GET',
            url: serverUrl + '/getPOIInfo?tagId=' + $routeParams.pointID
        }).then(function successCallback(response) {
            $scope.point = response.data;
            getReviews();
        }, function errorCallback(error) {
            alert(error.data())
        });
    }

    $scope.addFavorite = function (point) {
        //$rootScope.addToFavorites(point);
        if($rootScope.favorites)
            $rootScope.favorites.push(point.poi_id);
        var req = {
            method: 'POST',
            url: serverUrl + '/private/saveFavoritePOI',
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: {
                poi_id : point.poi_id
            }
        }
        $http(req).then(function () {
        }, function (error) {
            alert(error.data);
        });
    }
    $scope.removeFavorite = function (point) {
        //$rootScope.removeFavorite(point);
        if($rootScope.favorites)
            $rootScope.favorites.splice($rootScope.favorites.indexOf(point.poi_id), 1);
        var req = {
            method: 'DELETE',
            url: serverUrl + '/private/removeFavoritePOI',
            headers: {
                'Content-Type': "application/json",
                'x-auth-token': $window.sessionStorage.getItem('token')
            },
            data: {
                poi_id : point.poi_id
            }
        }
        /*var req = {
            data: [{
                poi_id : point.poi_id
            }],
            headers: {
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        };
        var url = serverUrl + '/private/removeFavoritePOI';*/
        $http(req).then(function (response) {
            console.log(response.data);
        }, function (error) {
            alert(error.data);
        });
    }





    $scope.seeOnMap = function () {
            var modalInstance = $uibModal.open({
                templateUrl: "pages/pointDetails/seeOnMap/seeMap.html",
                controller: "seeOnMapController as seeMapCtrl",
                size: ''

                });
    }
});

app.config(function($routeProvider)  {
    $routeProvider
    .when('/seeMap', {
        // this is a template url
        templateUrl: "pages/pointDetails/seeOnMap/seeMap.html",
        controller: "seeOnMapController as mapCtrl"
    })
        .otherwise({ redirectTo: '/home' });

});