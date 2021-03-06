main.controller('MeCtrl', ['$scope', '$ionicModal' ,'$state', 'userFactory', '$ionicPopup',function($scope, $ionicModal, $state, userFactory, $ionicPopup) {

  $scope.setting = function() {
    console.log("going to setting");
    $state.go('setting');
  };

  console.log(userFactory.allShares());
  console.log(userFactory.allMyGoals());
  console.log(userFactory.allMyShares());
  console.log(userFactory.allMyFavorites());
  //$http.get("http://jsonplaceholder.typicode.com/posts/").then(function(result){
  //  // console.log(result.data);
  //  $scope.posts = result.data;
  //});

  $scope.myFavorites = userFactory.allMyFavorites();
  $scope.myShares = userFactory.allMyShares();
  $scope.myGoals = userFactory.allMyGoals();
  console.log($scope.myShares);

  $scope.showShare = true;
  $scope.showFav = false;
  $scope.showGoals = false;

  $scope.show_fav = function (){
    $scope.showFav = true;
    $scope.showShare = false;
    $scope.showGoals = false;
  };

  $scope.show_share = function () {
    $scope.showFav = false;
    $scope.showShare = true;
    $scope.showGoals = false;
  };

  $scope.show_goals = function () {
    $scope.showFav = false;
    $scope.showShare = false;
    $scope.showGoals = true;
  };

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;


  $scope.noMoreItemsAvailable = false;


  $scope.loadMore = function() {
    $scope.items.push({id: $scope.items.length});
  };

  $scope.delete_fav = function(post) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete',
      subTitle: 'Do you want to delete from my favorites?'
    });
    confirmPopup.then(function(res) {
      // TODO: delete the post
      if (res) {
        var user = Parse.User.current();
        var relation = user.relation("likes");
        relation.remove(post);
        user.save();
        $scope.myFavorites.splice($scope.myFavorites.indexOf(post), 1);
      }
    });


    //if ( $scope.items.length == $scope.myFavorites.length ) {
    //  $scope.noMoreItemsAvailable = true;
    //}
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };


  $scope.formatDate = function(date) {
    return moment(date).format('MMMM Do YYYY hh:mm');
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

  $scope.getMyFavorites = function() {
    var user = Parse.User.current();
    var relation = user.relation("likes");
    relation.query().find({
      success: function(list) {
        $scope.myFavorites = list;
      }
    });
  };

  $scope.delete_share = function(message) {
    console.log('delete share');
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete',
      subTitle: 'Do you want to delete from my shares?'
    });
    confirmPopup.then(function(res) {
      // TODO: delete the post
      if (res) {
        message.destroy({
          success: function(myObject) {;
          },
          error: function(myObject, error) {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
          }
        });
        $scope.myShares.splice($scope.myShares.indexOf(message),1)
      }
    });


  };

  $scope.getMyGoals = function () {
      var query = new Parse.Query("UserGoals");
      query.equalTo("createdBy", Parse.User.current());
      query.equalTo("isComplete", true);
      query.find({
          success: function(results) {
              $scope.myGoals = results;
          },
          error: function(error) {
              console.log("Failed on search for the user's completed goals.")
          }
      });
  };


  $scope.doRefresh = function() {
    //TODO: get new favorite posts and shares
    $scope.getMyShares();
    $scope.getMyGoals();
    $scope.getMyFavorites();
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.getMyShares();
  $scope.getMyGoals();
  $scope.getMyFavorites();

}]);
