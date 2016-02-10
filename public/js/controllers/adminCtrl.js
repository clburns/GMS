app.controller('adminCtrl', function($scope, $http){
    $scope.users = [];

    // TODO: Create service for this
    $http.get("/api/user")
        .success(function(users){
            $scope.users = users;
        });

    $scope.deleteUser = function(id) {
        $http.delete('/api/user/' + id)
            .success(function(data) {
                $scope.users = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});