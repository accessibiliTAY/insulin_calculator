app.factory('UserService', ['$http', function($http){

    var user = {};

    var logout = function(callback) {
      $http.get('/auth/logout').then(function(response) {
        callback();
      });
    };

    var isAuthenticated = function(callback) {
      $http.get('/auth/check').then(function(response) {
        if(response.data.success === true) {
          user.data = response.data.user;
          callback(true, response.data.user);
        } else {
          user.data = response.data;
          callback(false);
        }
      });
    };
    return {
      user: user,
      logout: logout,
      isAuthenticated: isAuthenticated,
    };
  }]);
