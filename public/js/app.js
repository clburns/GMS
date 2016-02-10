var app = angular.module('app', ['ngRoute', 'app.directives.nav', 'angularUtils.directives.dirPagination']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            title: 'Home',
            templateUrl: 'views/partials/home.html'
        })
        .when('/login', {
            title: 'Login',
            templateUrl: 'views/partials/account/login.html',
            controller: 'accountCtrl'
        })
        .when('/profile', {
            title: 'Profile',
            templateUrl: 'views/partials/account/profile.html',
            controller: 'accountCtrl',
            resolve: {
                logincheck: checkLogin
            }
        })
        .when('/registration', {
            title: 'Register',
            templateUrl: 'views/partials/account/registration.html',
            controller: 'accountCtrl'
        })
        .when('/forum', {
            title: 'Forum',
            templateUrl: 'views/partials/forum/forumGroup.html',
            controller: 'forumGroupCtrl',
            resolve: {
                logincheck: checkLogin
            }
        })
        .when('/forum/:forumUrl', {
            templateUrl: 'views/partials/forum/forum.html',
            controller: 'forumCtrl',
            resolve: {
                loginCheck: checkLogin
            }
        })
        .when('/forum/:forumUrl/:threadUrl', {
            templateUrl: 'views/partials/forum/thread.html',
            controller: 'threadCtrl',
            resolve: {
                loginCheck: checkLogin
            }
        })
        .when('/admin', {
            title: 'Admin',
            templateUrl: 'views/partials/admin/admin.html',
            showAdminNav: true,
            resolve: {
                logincheck: checkLogin
            },
            controller: 'adminCtrl'
        })
        .when('/admin/users', {
            title: 'Users',
            templateUrl: 'views/partials/admin/users.html',
            showAdminNav: true,
            resolve: {
                loginCheck: checkLogin
            },
            controller: 'adminCtrl'
        })
        .when('/admin/applications', {
            title: 'Applications',
            templateUrl: 'views/partials/admin/applications.html',
            showAdminNav: true,
            resolve: {
                loginCheck: checkLogin
            },
            controller: 'adminCtrl'
        })
        .when('/admin/events', {
            title: 'Events',
            templateUrl: 'views/partials/admin/events.html',
            showAdminNav: true,
            resolve: {
                loginCheck: checkLogin
            },
            controller: 'adminCtrl'
        })
        .when('/admin/settings', {
            title: 'Settings',
            templateUrl: 'views/partials/admin/settings.html',
            showAdminNav: true,
            resolve: {
                loginCheck: checkLogin
            },
            controller: 'adminCtrl'
        })
        .when('/logout', {
            title: 'Logout'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
});

app.run(function($rootScope, $timeout) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        $rootScope.parentUrl = current.$$route.parentUrl;
        $rootScope.parentTitle = current.$$route.parentTitle;
        $rootScope.showAdminNav = current.$$route.showAdminNav;
    });
    $rootScope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            componentHandler.upgradeAllRegistered();
        })
    })
});

var checkLogin = function($q, $timeout, $http, $location, $rootScope){
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user){
        $rootScope.errorMessage = null;
        if(user !== '0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();
        } else {
            $rootScope.currentUser = null;
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};