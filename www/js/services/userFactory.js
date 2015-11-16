main.factory('userFactory', function() {

    var user = {};
    var service = {};
    var isLoggedIn = false;
    var allShares = [];
    var allMyShares = [];
    var allMyGoals = [];

    service.getUser = function () {
        service.fetchcurrent();
        return user;
    };

    service.allShares = function () {
      service.getAllShares();
      return allShares;
    };

    service.allMyShares = function () {
        service.getAllMyShares();
        return allMyShares;
    };

    service.allMyGoals = function () {
      service.getAllMyGoals();
      return allMyGoals;
    };

    service.getAllShares = function() {
        var Share = Parse.Object.extend("Share");
        var query = new Parse.Query(Share);
        query.limit(10);
        query.descending("createdAt");
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              allShares[i] = results[i];
            };
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    };

    service.getAllMyShares = function() {
        var query = new Parse.Query("Share");
        query.equalTo("createdBy", Parse.User.current());
        query.find({
          success: function(results) {
            allMyShares = results;
            console.log(allMyShares);
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    };

    service.getAllMyGoals = function () {
      var Goal = Parse.Object.extend("UserGoals");
      var query = new Parse.Query(Goal);

      query.equalTo("active", true);
      query.equalTo("createdBy", Parse.User.current());

      query.ascending("createdAt");
      query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) {
            allMyGoals[i] = results[i];
          };
          console.log(allMyGoals);
        },
        error: function(error) {
          alert("Error " + error.code + " " + error.message);
        }
      })
    };
    service.fetchcurrent = function () {
            var current_user = Parse.User.current();
            //console.log("fetch from Parse", current_user);
            if (current_user) {
                user = {
                    "id": current_user.id,
                    "firstname": current_user.attributes.first_name,
                    "lastname": current_user.attributes.last_name,
                    "email": current_user.attributes.email,
                    "about" : current_user.attributes.about,
                    "message_count" : 0
                };
                isLoggedIn = true;
            }
            else
            isLoggedIn = false;
        //console.log(user);
    };

    service.isLoggedIn = function () {
        return isLoggedIn;
    };

    return service;
});


