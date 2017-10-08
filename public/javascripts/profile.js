(function () {
    angular.module("myApp")
        .controller('profileController', profileController);

    //login page controller
    function profileController($http, $scope) {

        var vm = this;
        
        var data =  { 
            "username": $scope.indexCtrl.userData.user.username
        };
        
        $http.post('users/getUser', data).then(function(response) {
            vm.user = response.data.user;

        }, function(response) {
            toastr.error(response.data, 'Error');
        });

        var data2 =  { 
            "user": $scope.indexCtrl.userData.user._id
        };
        
        $http.post('receipts/getReceipts', data2).then(function(response) {
            
            vm.receipts = response.data.receipts;
           

        }, function(response) {
            toastr.error(response.data, 'Error');
        });
    }
})();