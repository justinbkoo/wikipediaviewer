// Main JavaScript file for Wikipedia Viewer

// Relevant object IDs
var resultsId = "#results";
var searchButtonId = "#search_button";
var searchQueryId = "#search_query";

// Relevant objects
var searchButton;
var searchQuery;
var results;

/*
 * Initialize objects and click actions
 */
$(document).ready(function () {
   searchButton = $(searchButtonId);
   searchQuery = $(searchQueryId);
   results = $(resultsId);

   searchButton.click(searchButtonOnClick);
});

/*
 * Action to take when search button is clicked
 */
function searchButtonOnClick() {
    // console.log("click");

    var query = searchQuery.val();
    // console.log(query);

    $.ajax({
        url:'http://en.wikipedia.org/w/api.php',
        data: {
            action: 'query',
            format: 'json',
            list: 'search',
            utf8: '1',
            srsearch: query
        },
        dataType: 'jsonp',
        success: processResult
    });
}

/*
 * Update HTML with relevant data
 */
function processResult(data) {
    // console.log(data["query"]["search"]);
    var pages = data["query"]["search"];
    var titles = [];
    var ids = [];

    results.text("");

    for (var i = 0; i<pages.length; i++) {
        titles.push(pages[i]["title"]);
        ids.push(pages[i]["pageid"]);

        results.append("<li>" + titles[i] + "</li>");
    }
    // console.log(titles);
}