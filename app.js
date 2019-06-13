let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            templateUrl: 'pages/mainScreen/guestUser/gustScreen.html',
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
            templateUrl: 'pages/user/userLogin/register.html',
            controller : 'regController as regCtrl'
        })

        .otherwise({ redirectTo: '/' });
});