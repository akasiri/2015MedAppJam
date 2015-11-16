main.controller('MeCtrl', ['$scope','$state', 'userFactory', function($scope, $state, userFactory) {

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
    $scope.myShares = [];

    $scope.posts = [
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
    $scope.items.push({ id: $scope.items.length});

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
    var refresh = function() {
        //console.log(Parse.User.current());
        userFactory.fetchcurrent();
        $scope.user = userFactory.getUser();
        //console.log($scope.user);

        //console.log("refresh", $scope.user);
    };
    refresh();

    $scope.getMyShares();
}]);
