angular.module("myApp")
    .controller("favoritesPointsController", function ($scope, $http, $rootScope, $location) {
        $scope.favoritePoints = new Array();
        $scope.filterby;

        for(i=0; $rootScope.favorites && i<$rootScope.favorites.length; i++)
        {
            $http({
                method: 'GET',
                url: serverUrl + '/getPOIInfo?tagId=' + $rootScope.favorites[i]
            }).then(function successCallback(response) {
                $scope.favoritePoints.push(response.data);
            }, function errorCallback(error) {
                alert(error.data())
            });
        }

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
    });