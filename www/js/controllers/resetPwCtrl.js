main.controller('resetPwCtrl', ['$scope','$state','$ionicPopup', function($scope,$state,$ionicPopup) {

    $scope.email ='';

    $scope.backToSignIn = function() {
        $state.go('signin');
    };

    $scope.resetPw = function(email) {
        //console.log(email);
        if (email == "") {
            alertIncorrectEmail();
        }else{
            Parse.User.requestPasswordReset(email,{
                success: function(){
                    alertSentEmail();
                },
                error:function(error){
                    alertIncorrectEmail();
                }
            })
        }
    };

    var alertSentEmail = function(){
        var alertPopup = $ionicPopup.alert({
            title:"Reset Password",
            template: "Check your email inbox for resetting your password"
        });
        alertPopup.then(function(res){
            $state.go('signin');
        })
    };

    var alertIncorrectEmail = function(){
        var alertPopup = $ionicPopup.alert({
            title:"Error",
            template:"Invalid Email, enter again!"
        });
    };
}]);