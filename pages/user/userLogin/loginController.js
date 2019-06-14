angular.module("myApp")
    .controller("loginController", function ($scope, $http, $window) {
       // $scope.username;
        //$scope.password;

        $scope.submit = function(isValid){
            if(isValid){
                $http.post('/login', {
                    username : $scope.username,
                    password : $scope.password})
                    .then(
                        function () {$window.alert("good");},
                        function () {$window.alert("error");});
            }
        };
    });