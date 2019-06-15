angular.module("myApp")
.controller("restorePasswordController", function ($scope) {
    serverUrl = "http://localhost:3000"
    $scope.submit=function(isvalid){
        if(isvalid){
            var req = {
                method: 'POST',
                url: serverUrl + '/getPassword',
                headers: {
                    'Content-Type': undefined
                },
                data: [{ answer: $scope.quest1 }, { answer: $scope.quest2 }]
            }
            $http(req).then(function (response) {
                alert(response.data);
            }, function (error) {
                alert(error.data);
            });

        }
    };
})