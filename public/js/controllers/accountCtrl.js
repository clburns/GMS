app.controller('accountCtrl', function($scope, $http, $rootScope, $location, accountServ){

    $scope.login = function(user) {
        accountServ.login(user, function(response){
            if(response == null){
                $scope.errMessage = 'User not found';
            }
            else {
                $rootScope.currentUser = response;
                $location.url('/forum');
            }
        });
    };

    $scope.register = function(user) {
        if(user.password == user.password2){
            accountServ.register(user, function(response){
                if(response == null){
                    $scope.errMessage = 'Could not Create User';
                } else {
                    $rootScope.currentUser = user;
                    $location.url('/forum');
                }
            });
        }
        // TODO: verify passwords match display
    };

    $scope.update = function(user) {
        accountServ.update(user, function(response){
            console.log(response);
        });
    }
});

