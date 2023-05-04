const API_KEY = "bb2c3dd8bdb84cf9a75cba68741aa1ce";
const BASE_URL = "https://newsapi.org/v2/top-headlines";
let pageNumber = 1;

function renderArticles(articles) {
  const articlesContainer = document.getElementById("articles-container");
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", "article-card");

    const image = document.createElement("img");
    image.src = article.urlToImage;
    image.alt = article.title;
    card.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = article.title;
    cardBody.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = article.description;
    cardBody.appendChild(description);

    card.appendChild(cardBody);

    articlesContainer.appendChild(card);
  });
}

async function loadMoreArticles() {
  const response = await fetch(`${BASE_URL}?country=us&category=health&apiKey=${API_KEY}&page=${pageNumber}`);
  const data = await response.json();
  renderArticles(data.articles);
  pageNumber++;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadMoreArticles();
  await loadMoreArticles();
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.addEventListener("click", loadMoreArticles);
});
