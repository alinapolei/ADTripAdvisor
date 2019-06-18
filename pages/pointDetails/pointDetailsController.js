app.controller("pointDetailsController", function ($scope, $routeParams, $http, $uibModal, $window, $location) {
    $scope.point;
    $scope.reviews=[];
    $http({
        method: 'GET',
        url: serverUrl + '/getPOIInfo?tagId=' + $routeParams.pointID
    }).then(function successCallback(response) {
        $scope.point = response.data;
        getReviews();
    }, function errorCallback(error) {
        alert(error.data())
    });
    $scope.addReview = function () {
        if ($window.sessionStorage.getItem('name') != null && $window.sessionStorage.getItem('name') != "guest") {
            var modalInstance = $uibModal.open({
                templateUrl: "pages/pointDetails/addReview/addReviewModal.html",
                controller: "addReviewController as addReviewCtrl",
                size: '',
                resolve: {
                    poi_id: function () {
                        return $scope.poi_id;
                    }
                }
            });

            modalInstance.result.then(function (response) {
                if (response) {
                    var req = {
                        method: 'POST',
                        url: serverUrl + '/private/review',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem('token')
                        },
                        data: {
                            poi_id: $scope.point.poi_id,
                            rating: response.rating,
                            review: response.review
                        }
                    }
                    $http(req).then(function () {
                        getReviews();
                    }, function (error) {
                        alert(error.data);
                    });
                }
            });
        }
        else {
            $location.path('/user/userLogin');
        }
    }

    function getReviews() {
        $scope.reviews = [];
        $http({
            method: 'GET',
            url: serverUrl + '/getReviews?tagId=' + $routeParams.pointID
        }).then(function successCallback(response) {
            if(response.data[0])
                $scope.reviews.push(response.data[0]);
            if(response.data[1])
                $scope.reviews.push(response.data[1]);
        }, function errorCallback(error) {
            alert(error.data())
        });
    }
});