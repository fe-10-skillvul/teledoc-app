// Script untuk mengambil data dari API NewsAPI

// API endpoint
const url = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=68b2606222714d07a71bdcc49bd9eef6";
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
  const { title, author, publishedAt, urlToImage, url, content } = topArticle;

  const html = `
    <div class="card mb-3">
      <img src="${urlToImage}" class="card-img-top" alt="error" style="height: auto; width:100%;">
      <div class="card-body">
        <h4 class="card-title"><a class="text-decoration-none" href='detailArtikel.html?title=${title}&url=${url}&author=${author}&publishedAt=${publishedAt}&content=${content}&urlToImage=${urlToImage}'>${title}</h4>
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
    const { title, author, publishedAt, urlToImage, url, content } = article;

    html += `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${urlToImage}" class="img-fluid rounded-start" alt="error" style="height: 66.38px; width:118px;">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title"><a class="text-decoration-none" href='detailArtikel.html?title=${title}&url=${url}&author=${author}&publishedAt=${publishedAt}&content=${content}&urlToImage=${urlToImage}'>${title}</a></h5>
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

// Fungsi untuk menampilkan artikel terbaru
const rendernewArticles = (articles) => {
  let html = "";

  articles.forEach((article) => {
    const { title, author, publishedAt, urlToImage, url, content, description } = article;

    html += `
    <div class="card" id="article-card">
      <img src="${urlToImage}" alt="error" />
      <div class="card-body">
        <h5 class="card-title"><a class="text-decoration-none" href="detailArtikel.html?title=${title}&url=${url}&author=${author}&publishedAt=${publishedAt}&content=${content}&urlToImage=${urlToImage}">${title}</a></h5>
      <p class="card-text" style="font-size:13px">${description}</p>
      </div>
    </div>
    `;
  });

  document.querySelector("#newArticle").innerHTML += html;
};

// Fungsi untuk menampilkan artikel lainnya
const loadMoreArticles = async () => {
  const data = await getNews(pageNumber);
  const articles = data.articles.slice(0, 8);

  // Callback untuk menampilkan artikel setelah data berhasil diambil
  rendernewArticles(articles, () => {
    // Setelah artikel berhasil ditampilkan, increment pageNumber
    pageNumber++;
  });
};

// Memanggil fungsi artikel lainnya
document.addEventListener("DOMContentLoaded", async () => {
  await loadMoreArticles();
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.addEventListener("click", loadMoreArticles);
});
