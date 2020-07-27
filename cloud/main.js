Parse.Cloud.define('hello', function(req, res) {
	var user = req.user;

    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("user",user);

    Parse.Push.send({
        where: pushQuery,
        data: {
            alert: user.get("username") + "Free hotdogs at the Parse concession stand!"
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

    return reponse;
});