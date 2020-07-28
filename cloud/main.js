Parse.Cloud.define('hello', function(req, res) {
	var user = req.user;
	var params = req.params;

	var query = new Parse.Query(Parse.User);
	query.equalTo("username", "user2");  // find all the women
	var women = await query.find();

    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user",user);

    return Parse.Push.send({
        where: pushQuery,
        data: {
            alert: "message from " + user.get("username") + " to" + params.otherUser
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