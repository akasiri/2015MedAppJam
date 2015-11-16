main.controller('CommunityCtrl', ['$scope','$state','$ionicModal', 'userFactory','$ionicLoading','$ionicPopup', function($scope, $state, $ionicModal, userFactory, $ionicLoading,$ionicPopup) {
    userFactory.fetchcurrent();
    $scope.user = userFactory.getUser();

    $scope.mood = {text: ''};
    $scope.share = {text: ''};

    $scope.slider = {};
    $scope.slider.rangeValue = 0;

    $scope.show_write = true;

    $scope.toggle_write = function() {
      $scope.show_write=!$scope.show_write;
    }

    $scope.selectedCategory = {text: 'Recent'};

    $scope.$watch('slider.rangeValue',function(val,old){
      $scope.slider.rangeValue = parseInt(val);
      console.log('range=' + $scope.slider.rangeValue)
    });

    console.log(userFactory.allShares());
    console.log(userFactory.allMyGoals());
    console.log(userFactory.allMyShares());
    console.log(userFactory.allMyFavorites());
    $scope.messages = userFactory.allShares();

    $scope.setting = function() {
      console.log("going to setting");
      $state.go('setting');
    };

    $scope.addMessage = function() {
        console.log($scope.share);
        console.log($scope.mood);

        var Share = Parse.Object.extend("Share");
        var share = new Share();

        if($scope.slider.rangeValue==0)
          share.set("primaryCategory", "none");
        else if($scope.slider.rangeValue==1)
          share.set("primaryCategory", "Inspirational");
        else if($scope.slider.rangeValue==2)
          share.set("primaryCategory", "OMG");
        else if($scope.slider.rangeValue==3)
          share.set("primaryCategory", "<3");
        else if($scope.slider.rangeValue==4)
          share.set("primaryCategory", "feel ya");
        else if($scope.slider.rangeValue==5)
          share.set("primaryCategory", "Congrats~!~");
        else if($scope.slider.rangeValue==6)
          share.set("primaryCategory", "LOL!");

        share.set("text", $scope.share.text);
        share.set("categories", {inspirational: 0, omg: 0, heart: 0, feel: 0, congrats: 0, lol: 0});
        share.set("createdBy", Parse.User.current());
        share.set("mood", $scope.mood.text);


        share.save(null, {
          success: function(share) {
            // Execute any logic that should take place after the object is saved.
          },
          error: function(share, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
          }
        });

        $scope.mood = {text: ''};
        $scope.share = {text: ''};
        $scope.doRefresh();
    };

    $scope.timeAgo = function(date) {
      return moment(date).startOf('second').fromNow();
    };

    $scope.getShares = function() {
      $scope.messages = [];
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
          }
        });
    };

    $scope.getInspirationalShares = function() {
      $scope.messages = [];
      var Share = Parse.Object.extend("Share");
      var query = new Parse.Query(Share);
      query.descending("createdAt");
      query.equalTo("primaryCategory", "Inspirational");
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

    $scope.getOMGShares = function() {
      $scope.messages = [];
      var Share = Parse.Object.extend("Share");
      var query = new Parse.Query(Share);
      query.descending("createdAt");
      query.equalTo("primaryCategory", "OMG");
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

    $scope.getHeartShares = function() {
      $scope.messages = [];
      var Share = Parse.Object.extend("Share");
      var query = new Parse.Query(Share);
      query.descending("createdAt");
      query.equalTo("primaryCategory", "<3");
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

    $scope.getFeelShares = function() {
      $scope.messages = [];
      var Share = Parse.Object.extend("Share");
      var query = new Parse.Query(Share);
      query.descending("createdAt");
      query.equalTo("primaryCategory", "feel ya");
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

    $scope.getCongratShares = function() {
      $scope.messages = [];
      var Share = Parse.Object.extend("Share");
      var query = new Parse.Query(Share);
      query.descending("createdAt");
      query.equalTo("primaryCategory", "Congrats~!~");
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

    $scope.getLOLShares = function() {
      $scope.messages = [];
      var Share = Parse.Object.extend("Share");
      var query = new Parse.Query(Share);
      query.descending("createdAt");
      query.equalTo("primaryCategory", "LOL!");
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

    $scope.chooseCategory = function() {
      console.log("selected");
      console.log($scope.selectedCategory.text);
      if($scope.selectedCategory.text == "Recent")
        $scope.getShares();
      else if($scope.selectedCategory.text == "Inspirational")
        $scope.getInspirationalShares();
      else if($scope.selectedCategory.text == "OMG")
        $scope.getOMGShares();
      else if($scope.selectedCategory.text == "<3")
        $scope.getHeartShares();
      else if($scope.selectedCategory.text == "feel ya")
        $scope.getFeelShares();
      else if($scope.selectedCategory.text == "Congrats~!~")
        $scope.getCongratShares();
      else if($scope.selectedCategory.text == "LOL!")
        $scope.getLOLShares();
    };

    $scope.addToFavorites = function(message) {
        var user = Parse.User.current();
        var relation = user.relation("likes");
        relation.add(message);
        user.save();
    };

    //$scope.checkInFavorites = function(message) {
    //  var favorites = [];
    //  var user = Parse.User.current();
    //  var relation = user.relation("likes");
    //  relation.query().find({
    //    success: function(list) {
    //      favorites = list;
    //    }
    //  });
    //  if(favorites.indexOf(message) == -1)
    //    return false;
    //  };


    //added


    // A confirm dialog
  $scope.showFavorite = function(message) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Add to Favorite?',
      template: 'Are you sure you want to add this share to your favorites?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
        $scope.addToFavorites(message);
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
    $scope.chooseCategory();
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.getShares();
}]);
