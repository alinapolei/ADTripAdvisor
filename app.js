let app = angular.module('myApp', ["ngRoute", 'ui.bootstrap']);
    app.controller("mainController", function ($scope, $location, $window, $rootScope) {
        $rootScope.name = "guest";
        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        };
        $scope.logout = function () {
            $window.sessionStorage.removeItem('name');
            $window.sessionStorage.removeItem('token');
            $rootScope.name = "guest";
            $location.path('/home');
        }
    });

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/home', {
            templateUrl: 'pages/mainScreen/gusetUser/guestScreen.html',
            controller : 'userController as uCtrl',
            resolve: {
                "check": function ($window, $location) {
                    if ($window.sessionStorage.getItem('name') != null && $window.sessionStorage.getItem('name') != "guest") {
                        $location.path('/mainScreen');
                    }
                }
            }
        })
        .when('/mainScreen', {
            templateUrl: 'pages/mainScreen/loggedUser/userLogged.html',
            controller: 'userLoggedController as loggedController'
        })

        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })

        .when('/user/userLogin', {
            templateUrl: 'pages/user/userLogin/login.html',
            controller : 'loginController as loginCtrl'
        })
        .when('/user/register', {
            templateUrl: 'pages/user/register/register.html',
            controller : 'regController as regCtrl'
        })
        .when('/user/restorePassword',{
            templateUrl : 'pages/user/restorePassword/restorePassword.html',
            controller : 'restorePasswordController as restoreCtrl'
        })
        .when('/pointDetails/:pointID', {
            templateUrl : 'pages/pointDetails/pointDetails.html',
            controller : 'pointDetailsController as pointDetailsCtrl'
        })

        .when('/interestPoints',{
            templateUrl : 'pages/interestPoints/allInterestPoint.html',
            controller : 'allInterestPointController as allIPCtrl'
        })


        .otherwise({ redirectTo: '/home' });
});