main.controller('loginCtrl', function($scope, $ionicPopup,$state){


    var isEmailAddress = function(email) {
        var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(pattern.test(email) == true){
            $scope.data.email = email;
        }
        else
        {
            alert("Enter a valid email");
        }
    };

    var isValidPassword = function(password) {
        if (password.length > 8) {
            $scope.data.password = password;
        }
        else
        {
            alert("Password must be at least 8 characters long");
        }
    };

    $scope.login = function(user){
        $state.go('tabs.community');

    };

    $scope.createUser = function(){
        $state.go('signup');
    };

    $scope.goLogin = function (){
        $state.go('signin')
    }

});
