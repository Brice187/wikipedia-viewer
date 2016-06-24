$(document).ready(function () {
	$("#randomWiki").click(function (event) {
		var url = "https://en.wikipedia.org/wiki/Special:Random";
		window.open(url, '_blank');

	});

	$("#searchButton").click(function (event) {
		var searchstring = $("#searchText");
		$.ajax({
				url: '//en.wikipedia.org/w/api.php',
				data: {
					action: 'query',
					list: 'search',
					srsearch: searchstring.val(),
					format: 'json'
				},
				dataType: "jsonp"
			})
			.done(function (json) {
				$("#content").prepend("<div class=\"new-entry-box\"><h3>" + json.query.search[0].title + "</h3>" + json.query.search[0].snippet + "</div>");
				$("#content").animate({
					scrollTop: $("#content").scrollHeight
				}, 500);

			})
			.fail(function (xhr, status, errorThrown) {
				alert("Sorry, there was a problem! Error: " + errorThrown);
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			});
	});
});
