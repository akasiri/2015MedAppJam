main.controller('CommunityCtrl', ['$scope','$state','$ionicModal', 'userFactory','$ionicLoading','$ionicPopup', function($scope, $state, $ionicModal, userFactory, $ionicLoading,$ionicPopup) {
    userFactory.fetchcurrent();
    $scope.user = userFactory.getUser();

    $scope.mood = 0;
    $scope.share = {text: ''};

    $scope.slider = {};
    $scope.slider.rangeValue = 0;

    $scope.$watch('slider.rangeValue',function(val,old){
      $scope.slider.rangeValue = parseInt(val);
      console.log('range=' + $scope.slider.rangeValue)

    });

    console.log(userFactory.allMyGoals());
    console.log(userFactory.allMyShares());
    $scope.messages = userFactory.allShares();
    console.log($scope.messages);
    //inspirational omg heart feelya congrats lol
    $scope.msgUpvotes =[{uid:0, i:1, o:3, h:3, f:7, c:6, l:2},
      {uid:1, i:0, o:0, h:0, f:0, c:0, l:0}
    ];
    $scope.setting = function() {
      console.log("going to setting");
      $state.go('setting');
    };

    $scope.addMessage = function() {
        console.log($scope.share);
        var Share = Parse.Object.extend("Share");
        var share = new Share();
        share.set("text", $scope.share.text);
        share.set("categories", {inspirational: 0, omg: 0, heart: 0, feel: 0, congrats: 0, lol: 0});
        share.set("createdBy", Parse.User.current());

        share.save(null, {
          success: function(share) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + share.id);
          },
          error: function(share, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          }
        });

        $scope.share = {text: ''};
        $scope.doRefresh();
    };

    $scope.timeAgo = function(date) {
      return moment(date).startOf('second').fromNow();
    };

    $scope.getShares = function() {
        var Share = Parse.Object.extend("Share");
        var query = new Parse.Query(Share);
        query.limit(10);
        query.descending("createdAt");
        query.find({
          success: function(results) {
              for (var i = 0; i < results.length; i++) {
                  $scope.messages[i] = results[i];
              };
              console.log($scope.messages);
          },
          error: function(error) {
              alert("Error: " + error.code + " " + error.message);
          }
        });
    };

  //popup for error/success
    var alertError = function(err) {
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: err.message
        });
    };

    var alertSuccess = function(msg) {
        var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: err.message
        });
    };




    //added


    // A confirm dialog
  $scope.showFavorite = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Add to Favorite?',
      template: 'Are you sure you want to add this share to your favorites?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

  $scope.showSubmit = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Share to world?',
      template: 'Are you sure you want share this?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.addMessage();
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

  //buttons on the bottom of posts
  $scope.clickedInspirational = function(message) {
      message.attributes.categories.inspirational++;
      message.save();
  };

  $scope.clickedOmg = function(message) {
      message.attributes.categories.omg++;
      message.save();
  };
  $scope.clickedHeart = function(message) {
      message.attributes.categories.heart++;
      message.save();
  };
  $scope.clickedFeel = function(message) {
      message.attributes.categories.feel++;
      message.save();
  };
  $scope.clickedGrats = function(message) {
      message.attributes.categories.congrats++;
      message.save();
  };
  $scope.clickedLol = function(message) {
      message.attributes.categories.lol++;
      message.save();
  };


  $scope.doRefresh = function() {
    $scope.getShares();
    $scope.$broadcast('scroll.refreshComplete');
  };

}]);
