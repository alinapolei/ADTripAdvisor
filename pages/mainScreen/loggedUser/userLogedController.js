serverUrl = "http://localhost:3000";
angular.module("myApp")
    .controller("userLoggedController", function ($scope, $http, $window) {
        $scope.SavedPoints = [];
        var savedpointids;
        $http.get(serverUrl + "/private/getTwoLatestSavedPOIs", {
            headers :{
                "x-auth-token": $window.sessionStorage.getItem('token'),
            }
        })
            .then(function (response) {
                savedpointids=(response.data);
                if (savedpointids.length == 0)
                    $scope.noSavedPopint = "There are no saved points"
                else {
                    for (let i=0;i<savedpointids.length;i++){
                        $http.get(serverUrl + "/getPOIInfo?tagId="+savedpointids[i].poi_id)
                            .then((res)=>{
                                console.log(res.data)
                                $scope.SavedPoints.push(res.data)
                            })
                    }
                    console.log($scope.SavedPoints)
                }
            }, function (error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

       // $scope.noSavedPopint="You are not saved any interestPoint"

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