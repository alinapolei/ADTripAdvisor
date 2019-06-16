
    app.controller("loginController", function ($scope, $http, $window, $location, $rootScope) {
        //$scope.usename;
        //$scope.password;
        serverUrl = "http://localhost:3000"

        $scope.submit = function(isValid){
            if(isValid){
                var user ={
                    username : $scope.username,
                    password : $scope.password};
                console.log(user);
                $http.post(serverUrl+ '/login', user)
                    .then(
                        function (response) {
                            $rootScope.name = $scope.username;
                            $window.sessionStorage.setItem('name', $scope.username);
                            $window.sessionStorage.setItem('token', response.data);
                            $location.path('/mainScreen/loggedUser');
                        },
                        function (error) {
                            $scope.isError = true;
                            console.log(error.data);
                        });
            }
        };
    });