// Script untuk mengambil data dari API NewsAPI

// API endpoint
const url = "https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=bb2c3dd8bdb84cf9a75cba68741aa1ce";

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
      <img src="https://via.placeholder.com/867x600" class="card-img-top" alt="${title}">
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
    const { title, urlToImage, url } = article;

    html += `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="https://via.placeholder.com/88x69" class="img-fluid rounded-start" alt="${title}">
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
