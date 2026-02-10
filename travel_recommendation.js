let apiData = {};


fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        apiData = data;
        console.log("Travel API loaded:", apiData);
    })
    .catch(error => console.error("API load error:", error));


function searchRecommendations() {
    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const results = document.getElementById("results");
    results.innerHTML = "";

    if (!keyword) return;

    let recommendations = [];

    if (keyword.includes("beach")) {
        recommendations = apiData.beaches || [];
    } else if (keyword.includes("temple")) {
        recommendations = apiData.temples || [];
    } else if (keyword.includes("country")) {
        recommendations = apiData.countries || [];
    }

    recommendations.slice(0, 2).forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;

        results.appendChild(card);
    });
}


function clearResults() {
    document.getElementById("results").innerHTML = "";
    document.getElementById("searchInput").value = "";
}


function showCountryTime(timeZone, country) {
    const options = {
        timeZone,
        hour12: true,
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };

    const time = new Date().toLocaleTimeString("en-US", options);
    console.log(`Current time in ${country}:`, time);
}
