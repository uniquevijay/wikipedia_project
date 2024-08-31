let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    // creating result item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");    
    searchResultsEl.appendChild(resultItemEl);

    //creating title
    let {link, title, description} = result;

    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);

    //creating break element
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    //creating URL element
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    //creating break element
    let breakEl = document.createElement("br");
    resultItemEl.appendChild(breakEl);

    //creating description element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
    createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        };

        fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            let {search_results} = jsonData;
            displayResults(search_results);
        })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
