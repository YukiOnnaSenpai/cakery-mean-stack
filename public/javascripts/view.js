(function () {
    angular.module("myApp")
        .controller('viewController', viewController);

    function viewController($scope, $http, $cookies, $window, $routeParams, toastr) {
        var vm = this;

        var data =  { 
            "type": $routeParams.type
        };
        
        $http.post('articles/getArticles', data).then(function(response) {
            vm.articles = response.data.articles;

        }, function(response) {
            toastr.error(response.data, 'Error');
        });
    }
})();