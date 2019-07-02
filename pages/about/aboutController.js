
// about controller
angular.module("myApp")
    .controller("aboutController", function ($scope,$http,$window) {
        var img= document.getElementById("imgSlide")
        var images;
        var i=0;
        var time=3000;
        $http.get(serverUrl+"/getBestPhotos")
            .then(function (response) {
                images=response.data;
                changeImg();


            },function (error){console.log(error)})

        function changeImg(){
            img.src = images[i];
            if(i < images.length - 1){
                i++;
            } else {
                i = 0;
            }
            setTimeout(changeImg, time);
        }
    });
