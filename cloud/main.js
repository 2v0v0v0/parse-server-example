Parse.Cloud.define('hello', function(req, res) {
	var user = req.user;
	var otherUserId = req.params.objectId;

	Parse.Cloud.useMasterKey();
	var query = new Parse.Query(Parse.User);
	query.equalTo("ObjectId", otherUserId);

	query.first(
	{
	    success: function(res) {
	        response.success(res);
	    },
	    error: function(err) {
	        response.error(err);
	    }
	});


    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user",user);

    Parse.Push.send({
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