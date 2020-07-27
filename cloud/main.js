Parse.Cloud.define('hello', function(req, res) {
	var pushQuery = new Parse.Query(Parse.Installation);
// pushQuery.containedIn("user", userlist);
return Parse.Push.send({
	where: pushQuery, 
	data: {
		alert: "Your push message here!"
	}
}, {
	success: function() {
		response.success("pushed");
	}, error: function(error) {
		reponse.error("didn't push");
	}
});

//return 'Hi Foodiee!';
});
