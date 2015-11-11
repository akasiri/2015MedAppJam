main.controller('CommunityCtrl', ['$scope','$state','$ionicModal', 'userFactory','$ionicLoading','$ionicPopup', function($scope, $state, $ionicModal, userFactory, $ionicLoading,$ionicPopup) {
    //$ionicLoading.show({
    //    //this function is used before the page is loaded to create a spinner
    //    content: 'Loading',
    //    animation: 'fade-in',
    //    showBackdrop: true,
    //    maxWidth: 200,
    //    showDelay: 0
    //});
    userFactory.fetchcurrent();
    $scope.user = userFactory.getUser();

    $scope.setting = function() {
      console.log("going to setting");
      $state.go('setting');
    };

    //popup for error/success
    var alertError = function(err) {
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: err.message
        });
    };

    var alertSuccess = function(msg) {
        var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: err.message
        });
    };
}]);
