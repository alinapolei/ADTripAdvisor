angular.module("myApp")
    .controller("loginController", function ($scope, $http, $window) {
        //$scope.usename;
        //$scope.password;
        $scope.submit = function(isValid){
            if(isValid){
                alert($scope.username + " " + $scope.password);
                $http.post('/login', {
                    username : $scope.username,
                    password : $scope.password})
                    .then(
                        function () {$window.alert("good");},
                        function () {$window.alert("error");});
            }
        };
    });