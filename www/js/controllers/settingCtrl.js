
main.controller('settingCtrl', ['$scope','$state', '$ionicPopup', 'userFactory', function($scope, $state, $ionicPopup, userFactory) {
    $scope.version_num = "1.0.0";
    $scope.user = userFactory.getUser();

    $scope.backToProfile = function() {
        $state.go('tabs.me');
    };

    $scope.logout = function(){
        if (userFactory.isLoggedIn()) {
            //console.log("logging out", $scope.user.id);
            Parse.User.logOut($scope.user.id);
        }
        else {
            //console.log("No User logged in");
        }
        $state.go('login');
    };

}]);
