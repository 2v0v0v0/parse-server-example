Parse.Cloud.define('hello', function(req, res) {
	var user = req.user;
	var otherUserId = req.params.objectId;

	/*Parse.Cloud.useMasterKey();
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
	});*/

	getUser(otherUserId).then
    (   
        //When the promise is fulfilled function(user) fires, and now we have our USER!
        function(user)
        {
            response.success(user);
            console.log("the user is... " + user.get("username"));
        }
        ,
        function(error)
        {
            response.error(error);
        }
    );


    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user",user);

    Parse.Push.send({
        where: pushQuery,
        data: {
            alert: "message from " + user.get("username") + " to" 
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

function getUser(userId)
{
    Parse.Cloud.useMasterKey();
    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo("objectId", userId);

    //Here you aren't directly returning a user, but you are returning a function that will sometime in the future return a user. This is considered a promise.
    return userQuery.first
    ({
        success: function(userRetrieved)
        {
            //When the success method fires and you return userRetrieved you fulfill the above promise, and the userRetrieved continues up the chain.
            return userRetrieved;
        },
        error: function(error)
        {
            return error;
        }
    });
};