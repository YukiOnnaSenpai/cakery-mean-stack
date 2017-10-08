angular
    .module("myApp", ["ngRoute", "ngCookies", "toastr"])
    .config(function ($routeProvider ) { //defining routes for view and controllers in index.html
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html",
                controller: "homeController",
                controllerAs: "homeCtrl"
            })
            .when("/about", {
                templateUrl: "views/about.html"
            })
            .when("/contact", {
                templateUrl: "views/contact.html"
            })
            .when("/menu", {
                templateUrl: "views/menu.html"
            })
            .when("/register", {
                templateUrl: "views/register.html",
                controller: "registerController",
                controllerAs: "registerCtrl"
            })
            .when("/login", {
                templateUrl: "views/login.html",
                controller: "loginController",
                controllerAs: "loginCtrl"
            })
            .when("/profile", {
                templateUrl: "views/profile.html",
                controller: "profileController",
                controllerAs: "profileCtrl"
            })
            .when("/add", {
                templateUrl: "views/add.html",
                controller: "addController",
                controllerAs: "addCtrl"
            })
            .when("/view/:type", {
                templateUrl: "views/view.html",
                controller: "viewController",
                controllerAs: "viewCtrl"
            })
            .when("/buy/:id", {
                templateUrl: "views/buy.html",
                controller: "buyController",
                controllerAs: "buyCtrl"
            })
    });