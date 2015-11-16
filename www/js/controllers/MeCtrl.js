main.controller('MeCtrl', ['$scope', '$ionicModal' ,'$state', 'userFactory', '$ionicPopup',function($scope, $ionicModal, $state, userFactory, $ionicPopup) {

  $scope.setting = function() {
    console.log("going to setting");
    $state.go('setting');
  };

  userFactory.fetchcurrent();
  $scope.user = userFactory.getUser();
  //$http.get("http://jsonplaceholder.typicode.com/posts/").then(function(result){
  //  // console.log(result.data);
  //  $scope.posts = result.data;
  //});
  $scope.myShares = userFactory.allMyShares();
  console.log($scope.myShares);

  $scope.showShare = false;
  $scope.showFav = true;

  $scope.show_fav = function (){
    $scope.showFav = true;
    $scope.showShare = false;
  };

  $scope.show_share = function () {
    $scope.showFav = false;
    $scope.showShare = true;
  };


  $scope.myshare = [

    {
      title: 'lol',
      date: '28 Nov'
    },
    {
      title: 'pop',
      date: '30 Oct'
    },
    {
      title: 'hoho',
      date: '1 Sep'
    },
    {
      title: 'yolo',
      date: '12 Sep'
    }

  ];


  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true


  $scope.noMoreItemsAvailable = false;


  $scope.loadMore = function() {
    $scope.items.push({id: $scope.items.length});
  };

  $scope.delete_fav = function(post) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete',
      template: 'Do you want to delete from my favorites?'
    });
    confirmPopup.then(function(res) {
      // TODO: delete the post
      if (res) {
        $scope.myfav.splice($scope.myfav.indexOf(post), 1);
      }
    });


    if ( $scope.items.length == posts.length ) {
      $scope.noMoreItemsAvailable = true;
    }
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };


  $scope.formatDate = function(date) {
    return moment(date).format('MMMM Do YYYY');
  };

  $scope.getMyShares = function() {
    var query = new Parse.Query("Share");
    query.equalTo("createdBy", Parse.User.current());
    query.find({
      success: function(results) {
        console.log($scope.myShares);
        $scope.myShares = results;
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

  $scope.delete_share = function(message) {
    console.log('delete share');
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete',
      template: 'Do you want to delete from my shares?'
    });
    confirmPopup.then(function(res) {
      // TODO: delete the post
      if (res) {
        message.destroy({
          success: function(myObject) {
            $scope.myShares.splice($scope.myShares.indexOf(message),1);
            $scope.goals.splice($scope.goals.indexOf(goal), 1);
          },
          error: function(myObject, error) {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
          }
        });
      }
    });


  };



  $scope.doRefresh = function() {
    //TODO: get new favorite posts and shares
    $scope.getMyShares();
    $scope.$broadcast('scroll.refreshComplete');
  }

  //$scope.shouldShowDelete = false;
  //$scope.shouldShowReorder = false;
  //$scope.listCanSwipe = true




  var refresh = function() {
    //console.log(Parse.User.current());
    userFactory.fetchcurrent();
    $scope.user = userFactory.getUser();
    //console.log($scope.user);

    //console.log("refresh", $scope.user);
  };
  refresh();


}]);
