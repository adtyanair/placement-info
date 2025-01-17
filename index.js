const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

var messageCount = 0;
// var messagesjson = [];
var basicUrl = "https://groups.yahoo.com/api/v1/groups/mec2k20/messages/";

function getStuff(i) {
	axios
		.get(basicUrl.concat(i, "/"))
		.then(function(response) {
			// handle success
			//console.log(i);
			//var details = { "subject": response.data.ygData.subject, "msgbody": response.data.ygData.messageBody };
			return {
				subject: response.data.ygData.subject,
				msgbody: response.data.ygData.messageBody
			};
		})
		.catch(function(error) {
			// handle error
			//console.log(error);
		});
}

app.get("/api/getdetails", (req, res) => {
	let messagesjson = [];
	axios
		.get("https://groups.yahoo.com/api/v1/groups/mec2k20/messages?count=100")
		.then(function(response) {
			messagesjson = [];
			messageCount = response.data.ygData.messages.length;
			console.log(response.data.ygData.messages.length);
		})
		.then(function() {
			//messagesjson.push({ "totalcount": messageCount });
			//console.log(messageCount);
			for (var i = 0; i <= messageCount; i++) {
				console.log(i);
				messagesjson.push(getStuff(i + 1));
			}
		})
		.then(function() {
			//console.log(messagesjson);
			res.json(messagesjson);
		});
});

app.listen(5000, () => {
	console.log("app listening on port 5000");
});
