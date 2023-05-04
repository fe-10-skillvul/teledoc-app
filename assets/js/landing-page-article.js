// ================ARTIKEL================
const articleUrl =
  "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=68b2606222714d07a71bdcc49bd9eef6";

const renderArticle = async () => {
  const response = await fetch(articleUrl);
  const data = await response.json();

  const articles = data.articles.slice(2, 6);

  const articleContainer = document.querySelector("#card-article");

  articles.forEach((article) => {
    const { title, description, urlToImage, url } = article;

    const maxTitleLength = 6;
    const trimTitle = title.split(" ").slice(0, 8).join(" ");
    const shortTitle =
      trimTitle.length < title.length ? trimTitle + "..." : trimTitle;

    articleCard = `
    <div class="col-md mt-sm-3">        
    <div class="card card-height">
    <a href="${url}" class="card-article text-decoration-none">
          <img
            src="${urlToImage}"
            class="card-img-top"
            alt="${title}" height=150 width=867
          />
          <div class="card-body">
          <div class="badge bg-primary text-wrap fw-light p-1 mb-2" style="width: auto fw-light">
          Makanan Sehat
        </div>
            <h5 class="card-title">${shortTitle}</h5>
            <p class="card-text">${description}</p>
          </div>
          </a>
          </div>
          </div>`;

    articleContainer.innerHTML += articleCard;
  });
};

renderArticle();
