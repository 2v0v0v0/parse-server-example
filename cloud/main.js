Parse.Cloud.define('hello', function(req, res) {
	var user = req.user;
	var params = req.params;

	/*const otherUserQuery = new Parse.Query(Parse.User);
	otherUserQuery.equalTo("objectId", params.otherUser);  
	const otheruser = await otherUserQuery.find();*/


    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user",user);

    return Parse.Push.send({
        where: pushQuery,
        data: {
            alert: "message from " + user.get("username") + " to" + //otheruser.get("username")
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