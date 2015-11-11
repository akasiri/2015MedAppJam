
main.controller('email-loginCtrl', function($scope,$state,$ionicPopup,userFactory) {
    //console.log('login-Ctrl');

    $scope.backToSignUp = function() {
        $state.go('signup');
    };

    $scope.createUser = function(){
      $state.go('signup');
    };

    /**
     * Validates a user from logging in, checking their credentials
     * If successful, they get logged in, else ERROR
     */
    $scope.loginEmail = function() {
        if (isValidFields($scope.data.email, $scope.data.password)) {

            Parse.User.logIn($scope.data.email, $scope.data.password, {
                success: function (user) {
                    //console.log(user);
                    alertSuccess();
                },
                error: function (user, error) {
                    // The login failed. Check error to see why.
                    alertError();
                }
            });
        }
    };

    /**
     * Helper function for isValidFields
     * Regular expression that checks if an email address is in a valid format.
     */
    var isEmailAddress = function(str) {
        var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    };


    /**
     * @param email
     * @param password
     * @returns {boolean}
     * For ACCOUNT CREATION
     * Determine whether an email address is valid For Signing up.
     * Determines if the email address is long enough and if the PW is atleast 8 characters.
     */
    var isValidFields = function(email, password) {
        if (!isEmailAddress(email) || email.length <= 0) {
            alertInvalidEmail();
            return false;
        }
        if (password.length < 8) {
            alertInvalidPw();
            return false;
        }
        return true;
    }

    var alertError = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: 'Incorrect Password or Username'
        });
        $scope.data.password = "";
    };
    var alertSuccess = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Success!',
            template: 'Log in successful'
        });
        alertPopup.then(function(res) {
            $state.go('tabs.community');
            $scope.data.email = '';
            $scope.data.password = '';
        });
    };
    var alertInvalidEmail = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: 'Enter a valid email'
        });
    };
    var alertInvalidPw = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: 'Password must be at least 8 characters long'
        });
    };
});
