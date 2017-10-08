(function () {
    angular.module("myApp")
        .controller('addController', addController);

    //login page controller
    function addController($http, $scope, toastr) {

        var vm = this;
        vm.add = add;

        function haveInputError(){
            var haveError = false;
            if(!vm.type || !vm.name || !vm.price || !vm.stock || !vm.description || !vm.url){
                toastr.error("Sva polja moraju biti popunjena");
                haveError = true;
            }
            return haveError;
        }
        
        function add(){
            if(!haveInputError()){
                var data =  { 
                    "type": vm.type, 
                    "name": vm.name,
                    "price": vm.price,
                    "stock": vm.stock,
                    "note": vm.description,
                    "img": vm.url
                };
                
                $http.post('articles/add', data).then(function(response) {
                    if(response.data.success){
                        toastr.success("Uspesno ste se dodali artikal");
                    }

                }, function(response) {
                    toastr.error(response.data, 'Error');
                });          
            }
        }
    }
})();