main.controller('GoalsCtrl', ['$scope', '$state', '$ionicModal', '$ionicPopup', 'userFactory', function ($scope, $state, $ionicModal, $ionicPopup, userFactory) {


    //Load the user from factory.
    //userFactory.fetchcurrent();
    //$scope.user = userFactory.getUser();

    /**
     * NOTIFICATIONS/ IONIC POP UP
     */

    // goals is now an array of database entries (I think)
    $scope.goals = userFactory.allMyGoals();
    $scope.newGoal = "";
    $scope.showAdd = false;

// display goals on open
// input box size
// input box reset value after submission
// list entry size
// archive button and section

    $scope.initGoals = function() {
        console.log("just got to initGoals()");
        $scope.doRefresh();
//        $state.go($state.current, {}, {reload: true});
    }

    var checkIfGoalExists = function(goal, list) {
        var listLen = list.length;
        for (var i = 0; i < listLen; i++) {
            if (goal == list[i].text) {
                return true;
            }
        }
        return false;
    };

    $scope.toggleShowAdd = function () {
        $scope.showAdd = !$scope.showAdd;
    };

    $scope.getGoals = function () {
        var Goal = Parse.Object.extend("UserGoals");
        var query = new Parse.Query(Goal);

        query.equalTo("active", true);
        query.equalTo("createdBy", Parse.User.current());

        query.ascending("createdAt");
        query.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) {
                    $scope.goals[i] = results[i];
                };
                console.log("goals: ")
                console.log($scope.goals);
            },
            error: function(error) {
                alert("Error " + error.code + " " + error.message);
            }
        })
    };

    $scope.remove = function(goal) {
        goal.destroy( {success: function(myObject) {
            // The object was deleted from the Parse Cloud.
            console.log('Object destroyed with objectId: ' + goal.id);
          },
          error: function(myObject, error) {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to destroy object, with error code: ' + error.message);
          }
        });

        $scope.goals.splice($scope.goals.indexOf(goal), 1);
//        $scope.doRefresh();
    };

    $scope.add = function(newGoal) {
        // if (!checkIfGoalExists(newGoal, $scope.goals)) {
            if (newGoal != "") {

            var Goal = Parse.Object.extend("UserGoals");
            var goal = new Goal();
            goal.set("text", newGoal);
            goal.set("createdBy", Parse.User.current());
            goal.set("active", true);
            goal.set("isComplete", false);

            goal.save(null, {
                success: function(goal) {
                    // Execute any logic that should take place after the object is saved.
                    console.log('New object created with objectId: ' + goal.id);
                },
                error: function(goal, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    console.log('Failed to create new object, with error code: ' + error.message);
                }
            })

            $scope.goals[$scope.goals.length] = goal;
//            $scope.doRefresh();

            $scope.showAdd = false;

            }
            else {
                var alertPopup = $ionicPopup.alert({
                  title: 'Uh oh',
                  template: 'No empty goal please'
                });
                alertPopup.then(function(res) {
                    // pass
                });
            }
        // }
        // else {
        //     var alertPopup = $ionicPopup.alert({
        //       title: 'Cannot add to the list',
        //       template: 'Already in list'
        //     });
        //     alertPopup.then(function(res) {
        //         // pass
        //     });
        // }
    };

    $scope.toggleComplete = function(goal) {
        goal.set("isComplete", goal.attributes.isComplete);

        var date = new Date();
        if (goal.attributes.isComplete == true) {
            goal.set("completedAt", date);
        }
        else {
            goal.set("completedAt", null);
        }
        goal.save(null, {
            success: function () {
                // Execute any logic that should take place after the object is saved.
                console.log('New date set to objectId: ' + goal.id);
            },
            error: function(goal, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                console.log('Failed to update date, with error code: ' + error.message);
            }
        });
    };

    $scope.setting = function() {
        console.log("going to setting");
        $state.go('setting');
    };

//    $scope.goals = ["washing the car", "walking the dog", "get gold"];
    //Alert success if added the transaction, then clear the fields so user can send another transaction
    var alertSuccess = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: 'You have successfully transferred to ' + $scope.data.name
        });
        alertPopup.then(function (res) {
            $scope.confirm_modal.hide();
            $scope.data = {
                name: "",
                amount: "",
                note: ""
            };
        });
    };

    //Alert error if something went wrong, then close the confirm modal.
    var alertError = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Something went wrong.'
        });
        alertPopup.then(function (res) {
            $scope.confirm_modal.hide();
            $scope.data = {
                name: "",
                amount: "",
                note: ""
            };
        });
    };

    //Alert incorrect email or name, then clear the fields so user can enter again.
    var alertBadName = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Select a user!'

        });
        alertPopup.then(function (res) {
            $scope.confirm_modal.hide();
            $scope.data = {
                name: "",
                amount: "",
                note: ""
            };
        });
    };

    //Alert user if amount entered isn't a valid number
    var alertInvalidAmount = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Invalid number, enter again!'

        });
        alertPopup.then(function (res) {
            $scope.confirm_modal.hide();
            $scope.data = {
                name: "",
                amount: "",
                note: ""
            };
        });
    };

    //Alert name or amount field is empty and tell them to enter again.
    var alertEmpty = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Enter both name and amount'
        });
    };


    $scope.doRefresh = function() {
        $scope.getGoals();
        $scope.$broadcast('scroll.refreshComplete');
    };
}]);
