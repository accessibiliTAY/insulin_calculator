var app = angular.module('insulinCal', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/apiSearch.html',
            controller: 'apiController',
            controllerAs: 'api'
        })
        .when('/insulinCal', {
            templateUrl: 'views/insulinCal.html',
            controller: 'insulinController',
            controllerAs: 'insulin'
        })
        .when('/users', {
            templateUrl: 'views/login.html',
            controller: 'usersController',
            controllerAs: 'users'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerController',
            controllerAs: 'register'
        })

    $locationProvider.html5Mode(true);

}])

app.controller('apiController', ['$scope', '$http', function($scope, $http) {
    // var vm = this
    $scope.search = "";
    $scope.api = {};
    $scope.addInfo = function() {
        console.log("clicked");
        $http.get('https://api.nutritionix.com/v1_1/search/' + $scope.search + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_servings_per_container%2Cnf_trans_fatty_acid%2Cnf_monounsaturated_fat%2Cnf_polyunsaturated_fat%2Cnf_serving_size_qty%2Cnf_calories%2Cnf_calories_from_fat%2Cnf_total_fat%2Cnf_saturated_fat%2Cnf_cholesterol%2Cnf_sodium%2Cnf_dietary_fiber%2Cnf_total_carbohydrate%2Cnf_total_fat%2Cnf_sugars%2Cnf_protein%2Cnf_potassium&appId=ceef395e&appKey=46fce9d57d0e7dd4bd60643dcaa29970').then(function(response) {
            $scope.clickAPI = true;
            console.log(response);
            $scope.api = response.data;

        })
        console.log("hey1");
        $scope.update = function(api) {
            $scope.search = api.data;
        };
    }
}]);

app.controller('insulinController', ['$scope', function($scope) {
    $scope.diabetes = {};
    $scope.diabetes.carbIntake;
    $scope.diabetes.bloodSugar;
    $scope.diabetes.weight;
    $scope.diabetes.meal;


    $scope.finalCalculation = function() {
        $scope.diabetes.carbCover = $scope.diabetes.carbIntake * ratio;
        $scope.diabetes.correctionDose = ($scope.diabetes.bloodSugar - 120) / 50;
        $scope.diabetes.final = ($scope.diabetes.carbCover + $scope.diabetes.correctionDose).toFixed(1);
        console.log($scope.diabetes.final);
    };

    var ratio;
    $scope.insulinCalc = function(data) {

        if ($scope.diabetes.weight <= 60) {
            ratio = 1 / 30;
            console.log(ratio);
        } else if ($scope.diabetes.weight > 60 && $scope.diabetes.weight <= 80) {
            ratio = 1 / 25;
            console.log(ratio);
        } else if ($scope.diabetes.weight > 80 && $scope.diabetes.weight <= 100) {
            ratio = 1 / 20;
            console.log(ratio);
        } else if ($scope.diabetes.weight > 100 && $scope.diabetes.weight <= 120) {
            ratio = 1 / 18;
            console.log(ratio);
        } else if ($scope.diabetes.weight > 120 && $scope.diabetes.weight <= 140) {
            ratio = 1 / 15;
            console.log(ratio);
        } else if ($scope.diabetes.weight > 140 && $scope.diabetes.weight <= 170) {
            ratio = 1 / 12;
            console.log(ratio);
            console.log("Getting here!", ratio);
        } else if ($scope.diabetes.weight > 170 && $scope.diabetes.weight <= 200) {
            ratio = 1 / 10;
            console.log(ratio);
        } else if ($scope.diabetes.weight > 200 && $scope.diabetes.weight <= 230) {
            ratio = 1 / 8;
            console.log(ratio);
        } else if ($scope.diabetes.weight > 230 && $scope.diabetes.weight <= 270) {
            ratio = 1 / 6;
            console.log(ratio);
        } else if ($scope.diabetes.weight > 270) {
            ratio = 1 / 5;
            console.log(ratio);
        };

        $scope.finalCalculation();
        console.log($scope.diabetes);
    };
}]);
app.controller('usersController', function() {
    console.log('usersController is working');
})
app.controller('registerController', function() {
    console.log("registerlog is working");
})
app.controller('MainController', ['$scope', '$http', function($scope, $http) {

}]);
