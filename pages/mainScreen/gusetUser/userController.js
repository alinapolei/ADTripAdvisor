serverUrl = "http://localhost:3000";
angular.module("myApp")
    .controller("userController", function ($scope, $http) {
        $scope.points=[];
        $scope.points.add("a");
        var i;
        for (i=0; i<3; i++)
        {
            $http.get(serverUrl + "/getRandom")
                .then(function (response) {
                    $scope.points.add(response.data);
                }, function (error) {
                    alert(error.data);
                });
        }
    });