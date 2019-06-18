serverUrl = "http://localhost:3000";

angular.module("myApp")
    .controller("allInterestPointController", function ($scope, $http,$window) {
        $scope.activityIOP= new Array();
        $scope.foodIOP=new Array();
        $scope.natureIOP=new Array();
        $scope.museumIOP=new Array();
        $scope.searchIOP=new Array();

        $http.get(serverUrl + "/getInterests")
            .then(function (response) {
                    $http.get(serverUrl+"/getPOIByCategory/?tagId=Food")
                        .then(function (response) {
                            tmpData=response.data;
                            for(let i=0;i<tmpData.length;i++) {
                                $http.get(serverUrl + "/getPOIInfo?tagId=" + tmpData[i].poi_id)
                                    .then( function (response) {
                                         $scope.foodIOP.push(response.data)
                                    })
                            }
                            },function (error){console.log(error)})
                $http.get(serverUrl+"/getPOIByCategory/?tagId=Nature")
                    .then(function (response) {
                    tmpData=response.data;
                    for(let i=0;i<tmpData.length;i++) {
                        $http.get(serverUrl + "/getPOIInfo?tagId=" + tmpData[i].poi_id)
                            .then( function (response) {
                                $scope.natureIOP.push(response.data)
                            })
                    }
                },function (error){console.log(error)})
                $http.get(serverUrl+"/getPOIByCategory/?tagId=Activity")
                    .then(function (response) {
                    tmpData=response.data;
                    for(let i=0;i<tmpData.length;i++) {
                        $http.get(serverUrl + "/getPOIInfo?tagId=" + tmpData[i].poi_id)
                            .then( function (response) {
                                $scope.activityIOP.push(response.data)
                            })
                    }
                },function (error){console.log(error)})
                $http.get(serverUrl+"/getPOIByCategory/?tagId=Museum")
                    .then(function (response) {
                    tmpData=response.data;
                    for(let i=0;i<tmpData.length;i++) {
                        $http.get(serverUrl + "/getPOIInfo?tagId=" + tmpData[i].poi_id)
                            .then( function (response) {
                                $scope.museumIOP.push(response.data)
                            })
                    }
                },function (error){console.log(error)})
            },function (error) {
                })


    });


