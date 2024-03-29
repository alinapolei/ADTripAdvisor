angular.module("myApp" )
    .controller('regController', function($scope, $http,$location) {
        serverUrl = "http://localhost:3000"
        $http.get(serverUrl + "/getCountries")
        .then(function(response) {
            $scope.countries = response.data;
        });
        $http.get(serverUrl + "/getInterests")
            .then(function(response) {
                $scope.intPoint = response.data;

            });

        $scope.selected=[];
        $scope.exist =function(item){
            return $scope.selected.indexOf(item)>-1;
        }

        $scope.toggleSelection =function(item){
            var idx =$scope.selected.indexOf(item);
            if(idx>-1){
                $scope.selected.splice(idx,1);
            }
            else {
                $scope.selected.push(item);
            }
        }

        $scope.submit = function(isValid) {
            var questions =["what was your childhood nickname?","Do you want to retake this course?"]
            if (isValid && $scope.selected.length>=2) {
              var req=  {
                    firstname: $scope.firstName,
                    lastname:$scope.lastName,
                    city:$scope.city,
                    country:$scope.country,
                    email: $scope.email,
                    username:$scope.username,
                    password:$scope.password,
                    question:questions,
                    answer: [$scope.quest1,$scope.quest2],
                    interests : $scope.selected,
              };
                //console.log(req);
                $http.post(serverUrl+'/register', req).then((res)=>{
                    console.log(res.data)},
                    (err)=>{console.log(err.data)});
                $location.path('/user/userLogin')
            }
            else
                console.log("eror");
        }
});
