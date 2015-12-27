'use strict';
angular.module('SignupMod')
  .controller('SignupCtrl', ['$scope', '$http', 'toastr', ($scope, $http, toastr) => {
    console.log('Signup Controller initialized ...');

    $scope.runSignup = () => {
      console.log('Signing Up '+ $scope.name );

      //Submit to Sails Server
      $http.post('/signup', {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      })
        .then(function onSuccess(response) {
          window.location = '/user';
        })
        .catch(function onError(err) {
          console.log('Error: ' + err);
        });
    };
}]);