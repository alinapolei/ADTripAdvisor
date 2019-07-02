app.controller("pointDetailsController", function ($scope, $routeParams, $http, $uibModal, $window, $location, $rootScope) {
    $scope.cities = [
        { id: 1,lat:52.475071, lng:9.226440 },
        { id: 2,  lat:52.051559, lng:5.081870  },
        { id: 3, lat:51.920552, lng:4.477048 },
        { id: 4, lat:54.507010, lng:-7.612010 },
        { id: 5, lat:52.374918, lng:4.895092 },
        { id: 6, lat: 52.357994 , lng: 4.868648 },
        { id: 7, lat:52.332100, lng:4.875690  },
        { id: 8, lat:52.372424, lng:4.893585 },
        { id: 9, lat:52.372424, lng:4.893585 },
        { id: 10, lat: 52.371849, lng: 4.530260 },
        { id: 11, lat:52.332100, lng:4.875690  },
        { id: 12, lat:52.332100, lng:4.875690 },
        { id: 13, lat:51.780552, lng:4.477048 },
        { id: 14, lat:52.373170, lng:4.890660 },
        { id: 15, lat:52.475071, lng:9.226440 },
        { id: 16, lat:52.051559, lng:5.081870 },
        { id: 17, lat:43.695920, lng:7.274620 },
        { id: 18, lat:52.231640, lng:5.375210 },
        { id: 19, lat:52.372424, lng:4.893585 },
        { id: 20, lat:41.726060, lng:-72.722950 }
    ];

    $scope.point;
    $scope.reviews=[];
    initMap();

    function initMap() {
        var mymap = L.map('mapid').setView([52.370216, 4.895168], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);

        var marker = L.marker([$scope.cities[$routeParams.pointID-1].lat, $scope.cities[$routeParams.pointID-1].lng]).addTo(mymap);
    }

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
                        getReviews(true);
                    }, function (error) {
                        alert(error.data);
                    });
                }
            }, function(error){});
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

});