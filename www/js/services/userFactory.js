main.factory('userFactory', function() {
    var user = {};
    var service = {};
    var isLoggedIn = false;

    service.getUser = function () {
        service.fetchcurrent();
        return user;
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


