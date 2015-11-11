main.run(function($rootScope, $location) {
    $rootScope.$location = $location;
});


main.config(['$stateProvider','$urlRouterProvider','$urlMatcherFactoryProvider','$ionicConfigProvider', function( $stateProvider,$urlRouterProvider, $urlMatcherFactoryProvider, $ionicConfigProvider){


  Parse.initialize("eJUkJsep0rVlRHKH21bwUQMvPAsOaftCSPARkDn9", "3h6hoYPkqBWSXvxh6kJ8K8dnB4NcJjAHyy6a1tW8");

    var goals = {
        url: '/goals',
        templateUrl: "templates/goals.html",
        controller: "GoalsCtrl"
    };

    var signup = {
        url: '/signup',
        templateUrl:"templates/sign_up.html",
        controller: "signupCtrl"
    };

    var login = {
        url:'/login',
        templateUrl:"templates/login.html",
        controller:"loginCtrl"
    };

    var email_signin = {
        url: "/signin",
        templateUrl:"templates/email_login.html",
        controller: "email-loginCtrl"
    };

    var resetPassword ={
        url: "/resetPassword",
        templateUrl:"templates/reset_password.html",
        controller: "resetPwCtrl"
    };

    var setting = {
        url: '/setting',
        templateUrl:"templates/settings.html",
        controller: "settingCtrl"
    };

    var edit_profile = {
        url: '/edit_profile',
        templateUrl:"templates/edit_profile.html",
        controller: "editProfileCtrl"
    };


    var tab = {
        url:"/tab",
        abstract:true,
        templateUrl:"templates/tabs.html"
    };


    var community_tab = {
        url:"/community",
        views:{
            'community-tab':{
                templateUrl: "templates/community.html",
                controller:'CommunityCtrl'
            }
        }
    };

    var me_tab = {
        url:'/me',
        views:{
            'me-tab':{
                templateUrl:"templates/me.html",
                controller:"MeCtrl"
            }
        }
    };

    var goals_tab = {
        url:'/goals',
        views:{
            'goals-tab':{
                templateUrl:"templates/goals.html",
                controller:"GoalsCtrl"
            }
        }
    };

    var calendar_tab = {
      url:'/calendar',
      views:{
            'calendar-tab':{
              templateUrl:"templates/calendar.html",
              controller: "CalendarCtrl"
            }
        }
    };

    //$urlRouterProvider.when($urlMatcherFactoryProvider.compile("/signup"), function($state) {
    //    $state.go('signup');
    //});

    $stateProvider.state('signup', signup);
    $stateProvider.state('signin', email_signin);
    $stateProvider.state('login', login);
    $stateProvider.state('resetPassword', resetPassword);
    $stateProvider.state('setting', setting);
    $stateProvider.state('edit_profile', edit_profile);
    $stateProvider.state('transaction', goals);
    //$stateProvider.state('zendesk', zendesk);

    $stateProvider.state('tabs', tab);
    $stateProvider.state('tabs.community',community_tab);
    $stateProvider.state('tabs.me',me_tab);
    $stateProvider.state('tabs.goals', goals_tab);
    $stateProvider.state('tabs.calendar', calendar_tab);

    $urlRouterProvider.otherwise('/tabs.community');

    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');


}]);

main.run(['$state', '$rootScope', function ($state, $rootScope, $ionicPlatform) {

    //$ionicPlatform.ready(function () {
    //  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    //  // for form inputs)
    //  if (window.cordova && window.cordova.plugins.Keyboard) {
    //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //  }
    //  if (window.StatusBar) {
    //    StatusBar.styleDefault();
    //  }
    //});

    $rootScope.$on("$stateChangeStart", function (event, toState, current) {
        //if there isn't a user logged in to Parse, and if the state they're going to is login pages, let them go to login.
        //if (Parse.User.current() == null) {
        //    if (toState.name === 'login' || toState.name === 'signin' || toState.name === 'signup' || toState.name === 'resetPassword') {
        //    } else {
        //        event.preventDefault();
        //        $state.go('login');
        //    }
        //}else {
        //    //if there is a user logged in, don't allow user to go to login pages. Redirect to home page.
        //    if (toState.name === 'login' || toState.name === 'signin' || toState.name === 'signup' || toState.name === 'resetPassword') {
        //        event.preventDefault();
        //        $state.go('tabs.community')
        //    }
        //}
    });
}]);
