main.controller('MeCtrl', ['$scope','$state', 'userFactory', function($scope, $state, userFactory) {

    $scope.setting = function() {
        console.log("going to setting");
        $state.go('setting');
    };

    $scope.edit_profile = function() {
        $state.go('edit_profile', {}, {reload: true});
    };

  //$http.get("http://jsonplaceholder.typicode.com/posts/").then(function(result){
  //  // console.log(result.data);
  //  $scope.posts = result.data;
  //});

  $scope.showShare = false;
  $scope.showFav = true;

  $scope.show_fav = function () {
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
      }

    ];


  $scope.myfav = [
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
    },

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
    },

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



  $scope.deletefav = function(post) {
    var alertPopup = $ionicPopup.alert({
      title: 'Delete',
      template: 'Do you want to delete from my favorites?'
    });
    alertPopup.then(function(res) {
      $scope.myfav.splice($scope.myfav.indexOf(post), 1);
    });

  };

  $scope.deleteshare = function(post) {
    var alertPopup = $ionicPopup.alert({
      title: 'Delete',
      template: 'Do you want to delete from my shares?'
    });
    alertPopup.then(function(res) {
      $scope.myshare.splice($scope.myshare.indexOf(post), 1);
    });


  };


  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true



    var refresh = function() {
        //console.log(Parse.User.current());
        userFactory.fetchcurrent();
        $scope.user = userFactory.getUser();
        //console.log($scope.user);

        //console.log("refresh", $scope.user);
    };
    refresh();
}]);
