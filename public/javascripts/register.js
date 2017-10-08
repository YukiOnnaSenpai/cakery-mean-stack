(function () {
    angular.module("myApp")
        .controller('registerController', registerController);

    function registerController($scope, $http, $cookies, $window, toastr) {
        var vm = this;

        function isValidEmail(emailAddress) {
            var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return pattern.test(emailAddress);
        };
        
        function haveInputError(){
            var haveError = false;
            if(!vm.username || !vm.password || !vm.password2 || !vm.fname || !vm.lname || !vm.email){
                toastr.error("Sva polja moraju biti popunjena");
                haveError = true;
            }else{
                if(!angular.equals(vm.password, vm.password2)){
                    toastr.error("Unete šifre se razlikuju");
                    haveError = true;
                }  
                if(!isValidEmail(vm.email)){
                    toastr.error("Email adresa nije validna");
                    haveError = true;
                }
                
            }
            return haveError;
        }

        vm.register = function () {
            if(!haveInputError()){
                var userData =  { 
                    "username": vm.username, 
                    "password": vm.password,
                    "fname": vm.fname,
                    "lname": vm.lname,
                    "role": "user",
                    "email": vm.email
                };
                
                $http.post('users/register', userData).then(function(response) {
                    if(response.data.success){
                        toastr.success("Uspesno ste se registrovali");
                        $scope.indexCtrl.login(userData);
                    }else{
                        toastr.error("Već postoji korisnik sa unetim korisničkim imenom");
                    }

                }, function(response) {
                    toastr.error(response.data, 'Error');
                });          
            }
        }

    }
})();