angular.module("myApp")

    .controller("restorePasswordController", function ($scope,$http,) {


    serverUrl = "http://localhost:3000"
    $scope.submit=function(isvalid){
        if(isvalid){
            data={
                username: $scope.username,
                answers: [ $scope.quest1 ,  $scope.quest2 ]
            }
            $http.post(serverUrl+'/getPassword',data ).then((result)=>{
              alert(result.data[0].password)
                }
                , ()=>{console.log("eror")});
        }
    };
})