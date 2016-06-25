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
				for (item in json.query.search) {
					var title = json.query.search[item].title;
					var snippet = json.query.search[item].snippet;
					var linktitle = title;

					linktitle = linktitle.split(' ').join('_');

					var link = "http://en.wikipedia.org/wiki/" + linktitle;

					$("#content").append("<div class=\"new-entry-box\"><h3>" + "<a href=" + link + ">" + title + "</a></h3>" + snippet + "</div>");
				}


			})
			.fail(function (xhr, status, errorThrown) {
				alert("Sorry, there was a problem! Error: " + errorThrown);
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			});
	});
});
