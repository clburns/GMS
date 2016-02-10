angular.module('app.directives.nav', [])
    .directive('nav', function() {
        return {
            restrict: 'A',
            templateUrl: './././views/directives/nav.html',
            controller: function($scope, $rootScope, $location, accountServ) {
                $scope.logout = function() {
                    accountServ.logout(function(response){
                        $rootScope.currentUser = null;
                        $location.url('/');
                    });
                }
            }
        }
    });