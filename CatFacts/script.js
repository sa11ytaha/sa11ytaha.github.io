const allFactsEndpoint = "https://cat-fact.herokuapp.com";
const randomFactEndpoint = "https://cat-fact.herokuapp.com/facts/random";
const factsContainer = document.getElementById("factsContainer");
const searchBox = document.getElementById("searchBox");
const reloadBtn = document.getElementById("reloadBtn");
const randomFactBtn = document.createElement("button");

// Add a button for fetching random facts
randomFactBtn.className = "btn btn-secondary mb-3";
randomFactBtn.innerText = "Show Random Fact";
document.querySelector(".container").insertBefore(randomFactBtn, factsContainer);

// Fetch all facts from the API
async function fetchAllFacts() {
  try {
    const response = await fetch(allFactsEndpoint);
    if (!response.ok) throw new Error("Failed to fetch data");
    const facts = await response.json();
    console.log(facts);
    displayFacts(facts);
  } catch (error) {
    factsContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
}

// Fetch a random fact from the API
async function fetchRandomFact() {
  try {
    const response = await fetch(randomFactEndpoint);
    if (!response.ok) throw new Error("Failed to fetch data");
    const fact = await response.json();
    displayFacts([fact]); // Display as an array for compatibility
  } catch (error) {
    factsContainer.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
}

// Display facts dynamically
function displayFacts(facts) {
    console.log(facts);
  factsContainer.innerHTML = "";
  facts.forEach((fact) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body">
          <p class="card-text">${fact.text}</p>
        </div>
      </div>`;
    factsContainer.appendChild(card);
  });
}

// Search functionality
searchBox.oninput = function () {
  const searchTerm = searchBox.value.toLowerCase();
  const cards = document.querySelectorAll("#factsContainer .card");
  cards.forEach((card) => {
    const factText = card.innerText.toLowerCase();
    card.style.display = factText.includes(searchTerm) ? "block" : "none";
  });
};

// Reload facts
reloadBtn.onclick = fetchAllFacts;

// Random fact button functionality
randomFactBtn.onclick = fetchRandomFact;

// Initial Fetch
fetchAllFacts();
