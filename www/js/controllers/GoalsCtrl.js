main.controller('GoalsCtrl', ['$scope', '$state', '$ionicModal', '$ionicPopup', 'userFactory', function ($scope, $state, $ionicModal, $ionicPopup, algolia, userFactory) {


    //Load the user from factory.
    //userFactory.fetchcurrent();
    //$scope.user = userFactory.getUser();

    /**
     * NOTIFICATIONS/ IONIC POP UP
     */

    $scope.goals = [];
    $scope.newGoal = "";


    var checkIfInArray = function(x, list) {
        var listLen = list.length;
        for (var i = 0; i < listLen; i++) {
            if (x == list[i]) {
                return true;
            }
        }
        return false;
    };

    $scope.remove = function(goal) {
        $scope.goals.splice($scope.goals.indexOf(goal), 1);
    };

    $scope.add = function(newGoal) {
        if (!checkIfInArray(newGoal, $scope.goals) && (newGoal != "")) {
            $scope.goals.push({text:newGoal,complete:false});
        }
        else {
            var alertPopup = $ionicPopup.alert({
              title: 'Don\'t eat that!',
              template: 'Cannot add to the list'
            });
            alertPopup.then(function(res) {
                // pass
            });
        }
    };

    $scope.toggleComplete = function(goal) {
        goal.complete = !goal.complete;
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


}]);
