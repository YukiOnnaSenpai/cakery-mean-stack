(function () {
	angular.module("myApp")
		.controller('indexController', indexController);

	function indexController($cookies, $http, $window) {

		var vm = this;

		vm.topFunction = topFunction;


        vm.loggedIn = false;    //is user logged in
        vm.logout = logout;     //login and logout methods
        vm.login = login;

        isLogged();

        function isLogged() {
			if($cookies.get("userdata") != undefined){
				vm.loggedIn = true;
				vm.userData = $cookies.getObject("userdata");
				vm.role = vm.userData.role;
			}
		}

        //method for deleting user data - cookies
        function logout() {
            vm.loggedIn = false;
            vm.userData = null;
            vm.role = null;
            var cookies = $cookies.getAll();
            for (var x in cookies) {
                $cookies.remove(x);
            }
        };

        //retrieving user token and saving it to cookie
        function login(userData) {
            $http.post('/users/auth', userData).then(function (response) {
                if (response.data.success) {
                    $cookies.put("token", response.data.token);
                    $cookies.putObject("userdata", response.data);
                    vm.userData = response.data;
                    vm.role = response.data.user.role;
                    vm.loggedIn = true;
                    $window.location = "#/";
                }
                else {
                    alert("authentiaction failed!");
                }
            });
        };
		
		window.onscroll = function() {scrollFunction()};
					
		function scrollFunction() {
			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				document.getElementById("myBtn").style.display = "block";
			} else {
				document.getElementById("myBtn").style.display = "none";
			}
		}
					
		// When the user clicks on the button, scroll to the top of the document
		function topFunction() {
			document.body.scrollTop = 0; // For Chrome, Safari and Opera 
				document.documentElement.scrollTop = 0; // For IE and Firefox
		}
	}
})();