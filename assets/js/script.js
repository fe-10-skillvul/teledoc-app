// Script untuk mengambil data dari API NewsAPI

// API endpoint
const url = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=bb2c3dd8bdb84cf9a75cba68741aa1ce";
let pageNumber = 1;

// Fungsi untuk mengambil data dari API
const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Fungsi untuk menampilkan artikel terpopuler di sebelah kiri besar
const renderTopArticle = async () => {
  const data = await getNews();
  const topArticle = data.articles[0];
  const { title, description, urlToImage, url } = topArticle;

  const html = `
    <div class="card mb-3">
      <img src="${urlToImage}" class="card-img-top" alt="${title}" height=600 width=867>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
      </div>
    </div>
  `;

  document.querySelector("#topArticle").innerHTML = html;
};

// Fungsi untuk menampilkan 7 artikel terpopuler di sebelah kanan
const renderOtherArticles = async () => {
  const data = await getNews();
  const otherArticles = data.articles.slice(1, 8);

  let html = "";

  otherArticles.forEach((article) => {
    const { title, urlToImage } = article;

    html += `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${urlToImage}" class="img-fluid rounded-start" alt="${title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector("#otherArticles").innerHTML = html;
};

// Memanggil fungsi untuk menampilkan artikel
renderTopArticle();
renderOtherArticles();

// artikel terbaru
// Fungsi untuk menampilkan artikel terbaru
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


// Fungsi untuk menampilkan artikel lainnya
async function loadMoreArticles() {
  const response = await fetch(url);
  const data = await response.json();
  renderArticles(data.articles);
  pageNumber++;
}

// Memanggil fungsi artikel lainnya
document.addEventListener("DOMContentLoaded", async () => {
  await loadMoreArticles();
  await loadMoreArticles();
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.addEventListener("click", loadMoreArticles);
});
