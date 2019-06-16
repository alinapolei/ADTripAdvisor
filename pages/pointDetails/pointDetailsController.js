app.controller("pointDetailsController", function ($scope, $routeParams, $http) {
    $scope.point;
    $scope.reviews=[];
    $http({
        method: 'GET',
        url: serverUrl + '/getPOIInfo?tagId=' + $routeParams.pointID
    }).then(function successCallback(response) {
        $scope.point = response.data;
        $http({
            method: 'GET',
            url: serverUrl + '/getReviews?tagId=' + $routeParams.pointID
        }).then(function successCallback(response) {
            if(response.data[0])
                $scope.reviews.push(response.data[0]);
            if(response.data[1])
                $scope.reviws.push(response.data[1]);
        }, function errorCallback(error) {
            alert(error.data())
        });
    }, function errorCallback(error) {
        alert(error.data())
    });
});

