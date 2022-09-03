const loadNews = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

// fetching all categories
const displayCategories = categories => {
  categories.forEach(category => {
    insertData(category, 'category-container');
  });
};
// inserting all categories on page
const insertData = (data, id) => {
  const dataElement = document.createElement('div');

  dataElement.innerHTML = `
    <button onclick="loadThisIdNews(${data.category_id})">${data.category_name}</button>
  `;

  const dataField = document.getElementById(id);

  dataField.appendChild(dataElement);
};

// load category specific news
const loadThisIdNews = async category_id => {
  toggleSpinner(true);

  const categoryId = '0' + category_id;

  // const url = `https://openapi.programming-hero.com/api/news/category/`;
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    displayNewsByCategory(data.data);
  } catch (error) {
    console.log(error);
  }
};

// display news for a specific category
const displayNewsByCategory = news => {
  if (news.length === 0) {
    document.getElementById('dropdown-container').classList.add('hidden');
    toggleSpinner(false);

    displayTotalNewsFound(0, 'Culture');
  }

  news = news.sort((a, b) => b.total_view - a.total_view);

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';

  let count = 0;