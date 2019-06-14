angular.module("myApp")
    .controller("loginController", function ($scope, $http, $window) {
        //$scope.usename;
        //$scope.password;
        $scope.submit = function(isValid){
            if(isValid){
                alert($scope.username + " " + $scope.password);
                var user =[{
                    username : $scope.username,
                    password : $scope.password}]
                console.log(user)
                $http.post('/login', user)
                    .then(
                        function () {$window.alert("good");},
                        function () {$window.alert("error");});
            }
        };
    });