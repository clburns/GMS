app.controller('forumGroupCtrl', function($rootScope, $scope, $http){
    $scope.fourms = [];

    // TODO: Create service for this
    $http.get("/api/forums")
        .success(function(forums){
            $scope.forums = forums;
        });
});

app.controller('forumCtrl', function($rootScope, $scope, $routeParams, $http){
    $scope.threads = [];

    // TODO: Create service for this
    $http.get("/api/threads/" + $routeParams.forumUrl)
        .success(function(data){
            $scope.threads = data.threads;
            $scope.parentUrl = $routeParams.forumUrl;
            $rootScope.parentUrl = "forum";
            $rootScope.parentTitle = "Forums >";
            $rootScope.title = data.forum.forumTitle;
            $scope.currentForumId = data.forum.forumId;
        });

});

app.controller('threadCtrl', function($rootScope, $scope, $routeParams, $http, forumServ){
    $scope.posts = [];

    forumServ.getThread($routeParams.forumUrl, $routeParams.threadUrl, function(response){
        if(response == null) {
            $scope.myAlert = 'Failed';
        } else {
            $scope.posts = response.posts;
            $scope.currentPage = 1;
            $rootScope.title = response.thread.threadTitle;
            $rootScope.parentUrl = "forum/" + $routeParams.forumUrl;
            $rootScope.parentTitle = response.forumTitle + " >" + " ";
            $scope.currentThreadId = response.thread.threadId;
            $scope.forumUrl = $routeParams.forumUrl;
            $scope.threadUrl = $routeParams.threadUrl;
        }
    });
});