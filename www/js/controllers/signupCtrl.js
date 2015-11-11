
main.controller('signupCtrl', ['$scope','$state', function($scope, $state) {

    $scope.signIn = function(){
        $state.go('signin');
    };

    $scope.cancelSignUp = function(){
        $state.go('login');
    };

    $scope.signup = function () {
        var firstname   = $scope.user.firstname;
        var lastname    = $scope.user.lastname;
        var email       = $scope.user.email;
        var password    = $scope.user.password;

        if (isValidFields(firstname,lastname,email,password)) {
            Parse.User.signUp(email, password, {
                'first_name': firstname,
                'last_name': lastname,
                'email': email
            },{
                success: function(user) {
                    alert("successfully signed-up");
                    $state.go('tabs.community');
                },
                error: function(user, error) {
                    alert("error: " + error.code + " " + error.message);
                }
            });
        }
        else {
            //console.log("Invalid Fields!");
        }
    };

    var isEmailAddress = function(str) {
        var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    };

    var isValidFields = function(firstname, lastname, email, password) {
        if (firstname.length <= 0) {
            alert("You have not entered your first name");
            return false;
        }
        if (lastname.length <= 0) {
            alert("You have not entered your last name");
            return false;
        }
        if (!isEmailAddress(email) || email.length <= 0) {
            alert("Enter a valid email");
            return false;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return false;
        }
        return true;
    }
}]);
