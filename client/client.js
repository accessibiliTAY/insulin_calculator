var app = angular.module('insulinCal', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
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
    // .when('/contact', {
    //   templateUrl: 'views/contact.html',
    //   controller: 'ContactController',
    //   controllerAs: 'contact'
    // })
  $locationProvider.html5Mode(true);

}])

app.controller('apiController', function(){
$scope.formData = {};
$scope.processForm = function(){
  console.log("made it");
}
})
app.controller('insulinController', function(){
  //insulin.form =
});
// app.controller('ContactController', function(){
//   this.message = "Flannel kogi leggings ennui, normcore organic jean shorts. Messenger bag meh farm-to-table paleo synth, shoreditch ramps bespoke. Farm-to-table readymade post-ironic, banh mi authentic locavore bicycle rights. PBR&B four dollar toast sartorial celiac waistcoat, blog meggings normcore irony gochujang echo park YOLO cred. Selfies distillery mixtape, mlkshk disrupt church-key locavore banjo intelligentsia williamsburg taxidermy butcher photo booth. Sriracha iPhone affogato, single-origin coffee tote bag whatever polaroid skateboard cronut. Offal VHS DIY, seitan messenger bag pork belly meh."
// })
app.controller('MainController', function(){
  this.message = "Blah";
})
