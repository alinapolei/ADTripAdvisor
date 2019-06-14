let app = angular.module('myApp', ["ngRoute"])
    .controller("mainController", function ($scope, $location) {
        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        }
    });

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/home', {
            templateUrl: 'pages/mainScreen/gusetUser/guestScreen.html',
            controller : 'userController as uCtrl'
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

        .otherwise({ redirectTo: '/home' });
});