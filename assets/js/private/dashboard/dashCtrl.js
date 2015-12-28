'use strict';
angular.module('DashMod')
  .controller('DashCtrl', ['$scope', '$http', ($scope, $http) => {
    $scope.getUser = () => {
      //code
      console.log('Getting User ...');
      $http.get('/getuser')
      .then(function onSuccess(user) {
        $scope.user = user.data;
      }).catch(function onError(err) {
        console.log(err);
      });
    };
}]);