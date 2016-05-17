var app = angular.module('app',[]);


app.controller('appController',['$scope','$http',function($scope,$http){
    $scope.search = "London";



    $scope.auth = "login";
    $scope.link = "/login/facebook/callback";
    $scope.authFunc = function(){
      $scope.auth = "logout";
    }

    $scope.makeRequest = function(){
       $http.get('/api/search/'+$scope.search).then(function(response){
        $scope.data = response.data.businesses;
    });
    }
    $scope.postUser = function(query){
        $scope.title = "POST";

        $http({
            method:"post",
            url: "/api/preference",
            headers : {'Content-Type': 'application/json'},
            data : {
              location:query,
              }
        })
            .success(function(result){
            $scope.status = result;

        })
             .error(function(err){
                 console.log(err);
        });

    }
    $scope.getPreference = function(){
      $http.get("/api/get").then(function(response){
        $scope.going = response;
      })
    }


}]);
