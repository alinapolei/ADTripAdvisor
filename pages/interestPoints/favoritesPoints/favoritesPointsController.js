angular.module("myApp")
    .controller("favoritesPointsController", function ($scope, $http, $rootScope, $location, $window) {
        $scope.favoritePoints = new Array();
        $scope.filterby;

        $http({
            method: 'GET',
            url: serverUrl + '/private/getArrangement',
            headers: {
                'Content-Type': "application/json",
                'x-auth-token': $window.sessionStorage.getItem('token')
            }
        }).then(function successCallback(response) {
            $scope.arrangment = response.data;
            for(i=0; i<$scope.arrangment.length; i++){
                $http({
                    method: 'GET',
                    url: serverUrl + '/getPOIInfo?tagId=' + $scope.arrangment[i]
                }).then(function successCallback(response) {
                    $scope.favoritePoints.push(response.data);
                }, function errorCallback(error) {
                    alert(error.data())
                });
            }
            for(i=0; $rootScope.favorites && i<$rootScope.favorites.length; i++)
            {
                if(! $scope.arrangment.includes($rootScope.favorites[i])) {
                    $http({
                        method: 'GET',
                        url: serverUrl + '/getPOIInfo?tagId=' + $rootScope.favorites[i]
                    }).then(function successCallback(response) {
                        $scope.favoritePoints.push(response.data);
                    }, function errorCallback(error) {
                        alert(error.data())
                    });
                }
            }
        }, function errorCallback(error) {
            alert(error.data())
        });

        $scope.select = function (id) {
            $location.path('/pointDetails/' + id);
        }
        $scope.isFilterBy = function (point) {
            if($scope.filterby)
                return $scope.filterby.trim() == point.category.trim();
            return true;
        }
        $scope.getNumRows = function () {
            return new Array(Math.ceil($rootScope.favorites.length/5));
        }
        $scope.sortArray = function (sortby) {
            if(! $scope.copyOfFavoritesPoints)
                $scope.copyOfFavoritesPoints = $scope.favoritePoints;
            $scope.isSort = false;
            switch(sortby){
                case "NameAZ":
                    $scope.sortField = 'name';
                    break;
                case "NameZA":
                    $scope.sortField = '-name';
                    break;
                case "RankUp":
                    $scope.sortField = 'rating';
                    break;
                case "RankDown":
                    $scope.sortField = '-rating';
                    $scope.isSort = true;
                    break;
                case "NumViewsUp":
                    $scope.sortField = 'views';
                    break;
                case "NumViewsDown":
                    $scope.sortField = '-views';
                    break;
                default:
                    $scope.sortField = '';
                    break;
            }
        }
        $scope.saveSortStyle = function () {
            switch($scope.sortField){
                case "name":
                    $scope.favoritePoints = $scope.favoritePoints.sort(function(a, b){
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                    break;
                case "-name":
                    $scope.favoritePoints = $scope.favoritePoints.sort(function(a, b){
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        if (x < y) {return 1;}
                        if (x > y) {return -1;}
                        return 0;
                    });
                    break;
                case "rating":
                    $scope.favoritePoints = $scope.favoritePoints.sort(function(a, b){return a.rating - b.rating});
                    break;
                case "-rating":
                    $scope.favoritePoints = $scope.favoritePoints.sort(function(a, b){return b.rating - a.rating});
                    break;
                case "views":
                    $scope.favoritePoints = $scope.favoritePoints.sort(function(a, b){return a.views - b.views});
                    break;
                case "-views":
                    $scope.favoritePoints = $scope.favoritePoints.sort(function(a, b){return b.views - a.views});
                    break;
                default:
                    break;
            }

            var req = {
                method: 'PUT',
                url: serverUrl + '/private/arrangeFavoritePOIs',
                headers: {
                    'Content-Type': "application/json",
                    'x-auth-token': $window.sessionStorage.getItem('token')
                },
                data: {
                    poi_array : $scope.favoritePoints.map(a => a.poi_id)
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                $scope.sortby = '';
            }, function (error) {
                alert(error.data);
            });
        }
    });