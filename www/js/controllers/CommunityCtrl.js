main.controller('CommunityCtrl', ['$scope','$state','$ionicModal', 'userFactory','$ionicLoading','$ionicPopup', function($scope, $state, $ionicModal, userFactory, $ionicLoading,$ionicPopup) {
    //$ionicLoading.show({
    //    //this function is used before the page is loaded to create a spinner
    //    content: 'Loading',
    //    animation: 'fade-in',
    //    showBackdrop: true,
    //    maxWidth: 200,
    //    showDelay: 0
    //});
    userFactory.fetchcurrent();
    $scope.user = userFactory.getUser();

    $scope.mood = 0;
    $scope.share = {text: ''};

    //$scope.people = [{name:'Johnathan Tran', color: "green"} ];
    //$scope.messages = [{msgid:0, sender:'Johnathan Tran', message:'Got gold in league!', date:'11/12/2015'},
    //  {msgid:1, sender:'Arzang Kasiri', message:"I'll paint my body when we get over $800 donations.", date:'11/13/2015'}
    //];

    $scope.messages = [];
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

        share.save(null, {
          success: function(gameScore) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + share.id);
          },
          error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          }
        });

        $('input[type="text"], textarea').val('');
        $scope.doRefresh();
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



// Triggered on a button click, or some other target
  $scope.showUpvotes = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '',
      cssClass:'popup1',
      title: 'Choose one or more:',
      subTitle: '',
      scope: $scope,
      buttons: [
        { text: 'Inspirational',
        type: 'button button-royal button-small',
        //onTap: function(i) {
        //  //code
        //}
        },
        { text: 'OMG',
          type: 'button-calm button-small',
          //onTap: function(o) {
          //  //code
          //}
        },
        { text: '<3',
          type: 'button-assertive button-small',
          //onTap: function(h) {
          //  //code
          //}
        },
        { text: 'feel ya',
          type: 'button-energized button-small',
          //onTap: function(f) {
          //  //code
          //}
        },
        { text: 'Congrats~!~',
          type: 'button-balanced button-small',
          //onTap: function(c) {
          //  //code
          //}
        },
        {
          text: 'LoL',
          type: 'button-positive button-small',
          //onTap: function(l) {
          //  //code
          //}
        }
        //bottom line code is how to do things supposedly?
        //},
        //{
        //  text: '<b>Save</b>',
        //  type: 'button-positive',
        //  //on top stuff
        //  onTap: function(e) {
        //    if (!$scope.data.wifi) {
        //      //don't allow the user to close unless he enters wifi password
        //      e.preventDefault();
        //    } else {
        //      return $scope.data.wifi;
        //    }
        //  }
        //}
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };

  ////refresh function
  //angular.module('testApp', ['ionic'])
  //  .controller('MyController', function($scope, $http) {
  //    $scope.items = [1,2,3];
  //    $scope.doRefresh = function() {
  //      $http.get('/new-items')
  //        .success(function(newItems) {
  //          $scope.items = newItems;
  //        })
  //        .finally(function() {
  //          // Stop the ion-refresher from spinning
  //          $scope.$broadcast('scroll.refreshComplete');
  //        });
  //    };
  //  });

  $scope.doRefresh = function() {
    $scope.getShares();
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.getShares();
}]);
