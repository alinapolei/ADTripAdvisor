serverUrl = "http://localhost:3000";
angular.module("myApp")
    .controller("userController", function ($scope, $http) {
        $scope.points=[];
        var i;
        for (i=0; i<3; i++)
        {
            $http.get(serverUrl + "/getRandom")
                .then(function (response) {
                    $scope.points.push(response.data);
                }, function (error) {
                    alert(error.data);
                });
        }
    });