main.controller('CalendarCtrl', ['$scope','$state','$ionicModal', 'userFactory','$ionicLoading','$ionicPopup', function($scope, $state, $ionicModal, userFactory, $ionicLoading,$ionicPopup) {
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
  $scope.goals = ["washing the car", "walking the dog", "get gold"];
  //
  // var disabledDates = [
  //       new Date(1437719836326),
  //       new Date(),
  //       new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
  //       new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
  //       new Date("08-14-2015"), //Short format
  //       new Date(1439676000000) //UNIX format
  //     ];
  //
  var datePickerCallback = function (val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      console.log('Selected date is : ', val)
    }
  };
  //
  $scope.datepickerObject = {
      //  titleLabel: 'Calendar',  //Optional
      //  todayLabel: 'Today',  //Optional
      //  closeLabel: 'Close',  //Optional
      //  setLabel: 'Set',  //Optional
      //  setButtonType : 'button-assertive',  //Optional
      //  todayButtonType : 'button-assertive',  //Optional
      //  closeButtonType : 'button-assertive',  //Optional
      //  inputDate: new Date(),  //Optional
      //  mondayFirst: true,  //Optional
      //  disabledDates: disabledDates, //Optional
      //  weekDaysList: weekDaysList, //Optional
      //  monthList: monthList, //Optional
      //  templateType: 'popup', //Optional
      //  showTodayButton: 'true', //Optional
      //  modalHeaderColor: 'bar-positive', //Optional
      //  modalFooterColor: 'bar-positive', //Optional
      //  from: new Date(2012, 8, 2), //Optional
      //  to: new Date(2018, 8, 25),  //Optional
       callback: function (val) {  //Mandatory
         datePickerCallback(val);
       }
      //  dateFormat: 'dd-MM-yyyy', //Optional
      //  closeOnSelect: false, //Optional
     };


  $scope.setting = function() {
    console.log("going to setting");
    $state.go('setting');
  };

  $scope.goSetting = function(){
    $state.go('setting');
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
}]);
