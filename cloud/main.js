Parse.Cloud.define('hello', function(req, res) {
	var user = req.user;

    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery..equalTo("user",user);

    return Parse.Push.send({
        where: pushQuery,
        data: {
            alert: "Your push message here!"
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

    //return 'Hi Foodiee!';
});