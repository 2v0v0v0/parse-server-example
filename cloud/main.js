Parse.Cloud.define('hello', function(req, response) {
	var currentuser = req.user;
	var otherUserId = req.params.otherUser

	console.log("Hello World");


	
	getUser(otherUserId).then
    (   
        //When the promise is fulfilled function(res) fires, and now we have our USER!
        function(res)
        {
            response.success(res);
            console.log("getUser response "+ res.get("username"));
            console.log("getUser response "+ otheruser);

        }
        ,
        function(err)
        {
            response.error(err);
        }
    );
    


    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("userId", otherUserId);

    Parse.Push.send({
        where: pushQuery,
        data: {
            alert: "message from "  + currentuser.get("username") + " to " + otherUserId
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
    
    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo("objectId", userId);

    //Here you aren't directly returning a user, but you are returning a function that will sometime in the future return a user. This is considered a promise.
    return userQuery.first
    ({ useMasterKey: true }, {
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