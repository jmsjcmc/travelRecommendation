let travelData = [];

/* ================= FETCH JSON DATA ================= */
fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("API data loaded:", travelData);
    })
    .catch(error => console.error("Error loading data:", error));

/* ================= SEARCH FUNCTION ================= */
function searchRecommendations() {
    const keyword = document.getElementById("searchInput").value
        .toLowerCase()
        .trim();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!keyword) return;

    let matchedResults = [];

    if (keyword.includes("beach")) {
        matchedResults = travelData.beaches;
    } else if (keyword.includes("temple")) {
        matchedResults = travelData.temples;
    } else if (keyword.includes("country")) {
        matchedResults = travelData.countries;
    }

    matchedResults.slice(0, 2).forEach(place => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        `;

        resultsDiv.appendChild(card);
    });
}

/* ================= CLEAR RESULTS ================= */
function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}

/* ================= OPTIONAL: COUNTRY TIME ================= */
function showCountryTime(timeZone, countryName) {
    const options = {
        timeZone: timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    const time = new Date().toLocaleTimeString("en-US", options);
    console.log(`Current time in ${countryName}:`, time);
}
