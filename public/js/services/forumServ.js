app.factory("forumServ", forumServ);

function forumServ($http){
    var service = {
        getThread: getThread,
        newThread: newThread,
        newPost: newPost
    };
    return service;

    function getThread(forumUrl, threadUrl, callback){
        $http.get('/api/posts/' + forumUrl+ '/' + threadUrl)
            .success(callback);
    }

    function newThread(thread, callback){
        $http.post('/api/threads', thread)
            .success(callback)
            .error(function(thread){
                console.log('Error' + thread);
            });
    }

    function newPost(post, callback){
        $http.post('/api/posts', post)
            .success(callback)
            .error(function(post){
                console.log('Error' + post);
            });
    }
}