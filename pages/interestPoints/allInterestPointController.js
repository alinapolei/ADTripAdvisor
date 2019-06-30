serverUrl = "http://localhost:3000";

angular.module("myApp")
    .controller("allInterestPointController", function ($scope, $http,$window, $location, $filter) {
        $scope.activityIOP= new Array();
        $scope.foodIOP=new Array();
        $scope.natureIOP=new Array();
        $scope.museumIOP=new Array();
        $scope.searchIOP=new Array();
        $scope.filterby;
        $scope.categories = new Array();
        $scope.isSort = false;

        $http.get(serverUrl + "/getInterests")
            .then(function (response) {
                $scope.categories = response.data;

                $scope.loggedUser = $window.sessionStorage.getItem('name');
                if($scope.loggedUser != null && $scope.loggedUser != ''){
                    var req = {
                        method: 'GET',
                        url: serverUrl + '/private/getFavoritePOIs',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem('token')
                        }
                    }
                    $http(req).then(function (response) {
                        if(response.data == "No such User")
                            $scope.favorites = new Array();
                        else
                            $scope.favorites = response.data;
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

        /*if($scope.loggedUser != null && $scope.loggedUser != '') {
            var req = {
                method: 'GET',
                url: serverUrl + '/private/getNumberOfSavedPOIs',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem('token')
                }
            }
            $http(req).then(function (response) {
                $scope.numOfFavorites = response.data;
            }, function (error) {
                alert(error.data);
            });
        }*/

        $scope.select = function (id) {
            $location.path('/pointDetails/' + id);
        }
        $scope.isFilterBy = function (name) {
            if($scope.filterby)
                return $scope.filterby.trim() == name;
            return true;
        }

        $scope.checkIsFavorite = function(point){
            return $scope.favorites.includes(point);
        }
        $scope.addToFavorites = function (point) {
            $scope.favorites.push(point);
        }
        $scope.removeFavorite = function (point) {
            $scope.favorites.splice($scope.favorites.indexOf(point), 1);
        }
    });