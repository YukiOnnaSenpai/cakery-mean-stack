(function () {
    angular.module("myApp")
        .controller('buyController', buyController);

    function buyController($scope, $http, $cookies, $window, $routeParams, toastr) {
        var vm = this;
        vm.buy = buy;
        vm.taste="Vanila";
        vm.color="Bela";
        vm.topping="Ukrasni slag";
        vm.note="";
        vm.quantity=1;

        var data =  { 
            "id": $routeParams.id
        };
        
        $http.post('articles/getArticle', data).then(function(response) {
            vm.result = response.data.article;
        }, function(response) {
            toastr.error(response.data, 'Error');
        });

        function buy() {
            if($scope.indexCtrl.userData){

                var data =  { 
                    "article": $routeParams.id,
                    "user": $scope.indexCtrl.userData.user._id,
                    "taste": vm.taste,
                    "color": vm.color,
                    "topping": vm.topping,
                    "quantity": vm.quantity,
                    "status": "onHold",
                    "note": vm.note
                };

                
                $http.post('receipts/save', data).then(function(response) {
                    toastr.success('Porudžbina je uspešno sastavljena');
                    $window.location = "#/menu";

                }, function(response) {
                    toastr.error(response.data, 'Error');
                });

            }else{
                toastr.error("Da bi ste kupili artikal morate se prijaviti");
            }

        }

    }
})();