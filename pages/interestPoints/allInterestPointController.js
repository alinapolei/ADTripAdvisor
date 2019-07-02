serverUrl = "http://localhost:3000";

angular.module("myApp")
    .controller("allInterestPointController", function ($scope, $http,$window, $location, $rootScope) {
        $scope.activityIOP= new Array();
        $scope.foodIOP=new Array();
        $scope.natureIOP=new Array();
        $scope.museumIOP=new Array();
        $scope.searchIOP=new Array();
        $scope.filterby;
        $rootScope.categories = new Array();
        $scope.isSort = false;

        $http.get(serverUrl + "/getInterests")
            .then(function (response) {
                $rootScope.categories = response.data;

                $scope.loggedUser = $window.sessionStorage.getItem('name');
                if($scope.loggedUser != null && $scope.loggedUser != '' && !$rootScope.favorites){
                    var req = {
                        method: 'GET',
                        url: serverUrl + '/private/getFavoritePOIs',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem('token')
                        }
                    }
                    $http(req).then(function (response) {
                        if(response.data == "No such User")
                            $rootScope.favorites = new Array();
                        else
                            $rootScope.favorites = response.data;
                    }, function (error) {
                        alert(error.data);
                    });
                }
                $http.get(serverUrl+"/getPOIByCategory/?tagId=Food")
                    .then(function (response) {
                        tmpData=response.data;
                        for(let i=0;i<tmpData.length;i++) {
                            $http.get(serverUrl + "/getPOIInfo?tagId=" + tmpData[i].poi_id)
                                .then( function (response) {
                                    $scope.foodIOP.push(response.data)
                                })
                        }
                    },function (error){console.log(error)})
                $http.get(serverUrl+"/getPOIByCategory/?tagId=Nature")
                    .then(function (response) {
                        tmpData=response.data;
                        for(let i=0;i<tmpData.length;i++) {
                            $http.get(serverUrl + "/getPOIInfo?tagId=" + tmpData[i].poi_id)
                                .then( function (response) {
                                    $scope.natureIOP.push(response.data)
                                })
                        }
                    },function (error){console.log(error)})
                $http.get(serverUrl+"/getPOIByCategory/?tagId=Activity")
                    .then(function (response) {
                        tmpData=response.data;
                        for(let i=0;i<tmpData.length;i++) {
                            $http.get(serverUrl + "/getPOIInfo?tagId=" + tmpData[i].poi_id)
                                .then( function (response) {
                                    $scope.activityIOP.push(response.data)
                                })
                        }
                    },function (error){console.log(error)})
                $http.get(serverUrl+"/getPOIByCategory/?tagId=Museum")
                    .then(function (response) {
                        tmpData=response.data;
                        for(let i=0;i<tmpData.length;i++) {
                            $http.get(serverUrl + "/getPOIInfo?tagId=" + tmpData[i].poi_id)
                                .then( function (response) {
                                    $scope.museumIOP.push(response.data)
                                })
                        }
                    },function (error){console.log(error)})
            },function (error) {
            })

        $scope.select = function (id) {
            $location.path('/pointDetails/' + id);
        }
        $scope.isFilterBy = function (name) {
            if($scope.filterby)
                return $scope.filterby.trim() == name;
            return true;
        }

        $rootScope.checkIsFavorite = function(point){
            if(point)
                return $rootScope.favorites.includes(point.poi_id);
        }
        if(!$rootScope.added)
            $rootScope.added = new Array();
        if(!$rootScope.removed)
            $rootScope.removed = new Array();
        $rootScope.addToFavorites = function (point) {
            $rootScope.favorites.push(point.poi_id);
            if($rootScope.removed.includes(point.poi_id))
                $rootScope.removed.splice($rootScope.removed.indexOf(point.poi_id), 1);
            else
                $rootScope.added.push(point.poi_id);
        }
        $rootScope.removeFavorite = function (point) {
            $rootScope.favorites.splice($rootScope.favorites.indexOf(point.poi_id), 1);
            if($rootScope.added.includes(point.poi_id))
                $rootScope.added.splice($rootScope.added.indexOf(point.poi_id), 1);
            else
                $rootScope.removed.push(point.poi_id);
        }
        $rootScope.saveFavorites = function(){
            for(i=0; i<$rootScope.added.length; i++) {
                var req = {
                    method: 'POST',
                    url: serverUrl + '/private/saveFavoritePOI',
                    headers: {
                        'x-auth-token': $window.sessionStorage.getItem('token')
                    },
                    data: {
                        poi_id : $rootScope.added[i]
                    }
                }
                $http(req).then(function () {
                }, function (error) {
                    alert(error.data);
                });
            }
            for(i=0; i<$rootScope.removed.length; i++) {
                var req = {
                    method: 'DELETE',
                    url: serverUrl + '/private/removeFavoritePOI',
                    headers: {
                        'Content-Type': "application/json",
                        'x-auth-token': $window.sessionStorage.getItem('token')
                    },
                    data: {
                        poi_id : $rootScope.removed[i]
                    }
                }
                $http(req).then(function (response) {
                    console.log(response.data);
                }, function (error) {
                    alert(error.data);
                });
            }
            $rootScope.added = new Array();
            $rootScope.removed = new Array();
        }
        $scope.openFavorites = function () {
            if($rootScope.favorites.length > 0)
                $location.path('/favoritePoints');
        }
    });