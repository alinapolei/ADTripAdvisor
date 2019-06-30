app.controller("addReviewController", function($scope, $uibModalInstance, $window, $http, poi_id) {
    $scope.pointID = poi_id;
    $scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
        var scrollHeight = element.scrollHeight;
        if(scrollHeight < 200)
            element.style.height =  scrollHeight + "px";
    };
    $scope.selectedRank = 0;
    $scope.textReview='';
    $scope.select = function(x){
        $scope.selectedRank = x;
    };

    $scope.ok = function(){
        $scope.isClicked = true;
        if($scope.selectedRank!=0 && $scope.textReview != ''){
            $uibModalInstance.close({
                rating: $scope.selectedRank,
                review: $scope.textReview}
                );
        }
    }

    $scope.cancel = function(){
        $uibModalInstance.close();
    }

});
