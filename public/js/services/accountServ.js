app.factory("accountServ", accountServ);

function accountServ($http){

    var service = {
        login: login,
        register: register,
        update: update,
        logout: logout,
        currentUser: currentUser
    };
    return service;

    function login(user, callback){
        $http.post('/login', user)
            .success(callback);
    }

    function register(user, callback){
        $http.post('/register', user)
            .success(callback);
    }

    function update(user, callback){
        $http.put('/update', user)
            .success(callback);
    }

    function logout(callback){
        $http.post('/logout')
            .success(callback);
    }

    function currentUser(callback){
        $http.get('/api/getCurrentUser')
            .success(callback);
    }
}