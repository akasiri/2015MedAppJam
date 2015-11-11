main.controller('MeCtrl', ['$scope','$state', 'userFactory', function($scope, $state, userFactory) {

    $scope.setting = function() {
        console.log("going to setting");
        $state.go('setting');
    };

    $scope.edit_profile = function() {
        $state.go('edit_profile', {}, {reload: true});
    };

    var refresh = function() {
        //console.log(Parse.User.current());
        userFactory.fetchcurrent();
        $scope.user = userFactory.getUser();
        //console.log($scope.user);

        //console.log("refresh", $scope.user);
    };
    refresh();
}]);
