// Main JavaScript file for Wikipedia Viewer
var searchButtonId = "#search_button";
var searchQueryId = "#search_query";
var searchButton;
var searchQuery;

$(document).ready(function () {
   searchButton = $(searchButtonId);
   searchQuery = $(searchQueryId);

   searchButton.click(searchButtonOnClick);
});

function searchButtonOnClick() {
    // console.log("click");

    var query = searchQuery.val();
    // console.log(query);

    
}