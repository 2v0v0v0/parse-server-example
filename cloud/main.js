Parse.Cloud.define('hello', function(req, res) {
	var currentuser = req.user;
	var otheruser;
	var otherUserId = req.params.objectId;


	getUser(otherUserId).then
    (   
        //When the promise is fulfilled function(res) fires, and now we have our USER!
        function(res)
        {
            response.success(res);
            return "hi"
        }
        ,
        function(err)
        {
            response.error(err);
            return "no"
        }
    );


    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user",currentuser);

    Parse.Push.send({
        where: pushQuery,
        data: {
            alert: "message from " + currentuser + " to " otherUserId
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

    return otheruser;

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