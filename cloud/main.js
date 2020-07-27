Parse.Cloud.define('hello', function(req, res) {
	var user = req.user;
	var params = req.params;


	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	var otheruser = query.get(params.otherUser);

    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user",user);

    return Parse.Push.send({
        where: pushQuery,
        data: {
            alert: "message from " + user.get("username") + otheruser.get("username")
        }
    }, {
        useMasterKey: true
    }, {
        success: function() {
            response.success("pushed");
        },
        error: function(error) {
            reponse.error("didn't push");
        }
    });

});