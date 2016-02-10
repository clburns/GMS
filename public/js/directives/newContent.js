app.directive('newThread', function () {
    return {
        restrict: 'A',
        templateUrl: './././views/directives/newThread.html',
        controller: function($scope, $location, forumServ, accountServ){
            $scope.submitThread = function(thread) {
                accountServ.currentUser(function(currentUser){
                    var newThreadData = {
                        thread: thread,
                        currentUser: currentUser,
                        forumId: $scope.currentForumId
                    };
                    forumServ.newThread(newThreadData, function(response){
                        if(response == null) {
                            $scope.myAlert = 'Failed';
                        } else {
                            $scope.thread = '';
                            $location.url('/forum/' + $scope.parentUrl + '/' + response);
                        }
                    });
                });
            }
        }
    }
});

app.directive('newPost', function () {
    return {
        restrict: 'A',
        templateUrl: './././views/directives/newPost.html',
        controller: function($rootScope, $scope, $location, forumServ, accountServ){
            $scope.submitPost = function(post) {
                accountServ.currentUser(function(currentUser){
                    var newPostData = {
                        post: post,
                        currentUser: currentUser,
                        threadId: $scope.currentThreadId
                    };
                    forumServ.newPost(newPostData, function(response){
                        if(response == null) {
                            $scope.myAlert = 'Failed';
                        } else {
                            $scope.posts.push(response);
                            $scope.post = '';
                            $scope.showinput = false;
                            var length = $scope.posts.length;
                            $scope.currentPage = Math.ceil(length / 10);
                        }
                    });
                });
            }
        }
    }
});
