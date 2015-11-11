main.controller('editProfileCtrl', ['$scope','$state', 'userFactory','$ionicPopup','$ionicLoading', function($scope, $state, userFactory,$ionicPopup,$ionicLoading) {
    $scope.updated = false;
    $scope.disableButton = false;
    $scope.data = {
        note: "",
        remain_character: 400
    };

    $scope.profile_page = function () {
        $state.go('tabs.me');
    };

    $scope.update = function () {

    };

    $scope.submit = function () {
        //console.log("clicked submit");
        var newProfile = Parse.User.current();
        $scope.disableButton = true;

        if (newProfile) {
            //update about me
            if ($scope.data.note != undefined) {
                newProfile.set("about", $scope.data.note);
            }

            //prepare the image for upload
            var fileUploadControl = document.getElementById("inputPic");
            var file = fileUploadControl.files[0];

            if (file) {
                //upload image to Parse, set that image to newProfile
                ParseFile = new Parse.File(file.name, file);
                ParseFile.save({
                    success: function (res) {
                        newProfile.set("Image", res);
                        $ionicLoading.show({
                            content: 'Loading',
                            animation: 'fade-in',
                            showBackdrop: true,
                            maxWidth: 200,
                            showDelay: 0
                        });
                        newProfile.save({
                            success: function () {
                                $scope.disableButton = false;
                            },
                            error: function (err) {
                                alertError();
                            }
                        }).then( function() {
                            $ionicLoading.hide();
                            alertSuccess();

                        });
                    },
                    error: function (err) {
                        alertError();
                    }
                });
            }
            else {
                //save newProfile to Parse
                newProfile.save().then(function () {
                    $scope.disableButton = false;
                    alertSuccess();
                });
            }
        }
    };

    /**
     * Used for displaying the amount of characters left (out of 400)
     * for the description portion of Edit Profile
     */
    $scope.updateCount = function () {
        $scope.data.remain_character = 400 - $scope.data.note.length;
    };

    /**
     * Refreshes the data of users from the User Factory
     * Updates user information "about me" and the remaining characters
     */
    var refresh = function() {
        userFactory.fetchcurrent();
        $scope.user = userFactory.getUser();
        $scope.data.note = $scope.user.about;
        $scope.updateCount();
        //console.log($scope.user);
    };

    //binds file input button to uploadBtn
    $('#uploadBtn').bind("click" , function () {
        $('#inputPic').click();
    });

    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#uploadPreview').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    };
    refresh();

    //whenever inputPic selects new image update updatePreivew
    $("#inputPic").change(function(){
        readURL(this);
    });


    var alertSuccess = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: 'You have successfully updated your information!'
        }).then(function(){
            $state.go("tabs.me");
        });
    };
    var alertError = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Something went wrong'
        });
    };

}]);
