// Main JavaScript file for Wikipedia Viewer

// Relevant object IDs
var resultsId = "#results";
var searchButtonId = "#search_button";
var searchQueryId = "#search_query";

// Relevant objects
var searchButton;
var searchQuery;
var results;

// Strings to compare old and new queries.
var query;

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
    query = searchQuery.val();

    if (!query) {
        return;
    }
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
        success: function(data) {
            // Array of search results
            const search = data["query"]["search"];
            //console.log(search);

            // String used in titles field of 'data' in upcoming ajax call.
            // Form: "title1|title2|title3|...|lasttitle"
            const titles = search.map(searchItem => searchItem["title"]).join('|');
            //console.log(titles);
            $.ajax({
                url:'http://en.wikipedia.org/w/api.php',
                data: {
                    action: 'query',
                    format: 'json',
                    prop: 'extracts',
                    titles: titles,
                    exsentences: '1',
                    exlimit: '20',
                    exintro: '1',
                    explaintext: '1'
                },
                dataType: 'jsonp',
                success: function(data2) {
                    const pages = data2["query"]["pages"];
                    //console.log(pages);
                    const markup = `
                    ${search.map(searchItem =>
                        `<li>
                            <a href="https://en.wikipedia.org/wiki/${searchItem["title"].replace(' ', '_')}">${searchItem["title"]}</a>
                            <h5>${pages[searchItem["pageid"] + ""].extract}</h5>
                         </li>`)
                        .join('')}`;
                    //console.log(markup);
                    results.html(markup);
                }
            });
        }
    });
}