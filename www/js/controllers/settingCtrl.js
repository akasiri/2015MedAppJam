
main.controller('settingCtrl', ['$scope','$state', '$ionicPopup', 'userFactory', function($scope, $state, $ionicPopup, userFactory) {
    $scope.version_num = "1.0.0";
    $scope.user = userFactory.getUser();


    $scope.about = {text: $scope.user.about};
    $scope.notepad = {text: Parse.User.current().get("notepad")};
    $scope.showAbout = false;
    $scope.showPassword = false;
    $scope.showNotepad = true;

    $scope.toggleAbout = function() {
        console.log($scope.showAbout);
        $scope.showAbout = !$scope.showAbout
    };

    $scope.togglePassword = function() {
      console.log($scope.showAbout);
      $scope.showPassword = !$scope.showPassword
    };

    $scope.toggleNotepad = function() {
      console.log($scope.showAbout);
      $scope.showNotepad = !$scope.showNotepad
    };

    $scope.changepassword = function(){
      $state.go('resetPassword');
    };


    $scope.saveChanges = function() {
      console.log("click");
      Parse.User.current().set("about", $scope.about.text);
      Parse.User.current().set("notepad", $scope.notepad.text);
      Parse.User.current().save();
      console.log("saved");
    }

    $scope.logout = function(){
        if (userFactory.isLoggedIn()) {
            //console.log("logging out", $scope.user.id);
            Parse.User.logOut($scope.user.id);
            userFactory.clear();
            window.location.reload();
        }
        else {
            //console.log("No User logged in");
        }
        $state.go('login');
    };

}]);
