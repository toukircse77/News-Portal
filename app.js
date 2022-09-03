const loadAllNews =async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    displayAllNews(data.data.news_category)
    }
const displayAllNews = allNews =>{
    console.log(allNews);
    const newsContainer = document.getElementById('news-container')
    allNews.forEach(news => {
        console.log(news.category_id)
    const newsDiv = document.createElement('div')
    newsDiv.classList.add('d-flex')
    newsDiv.innerHTML = `
    <ul><li><button class="btn" onclick="loadNewsCard(${news.category_id})" href="">${news.category_name}</button></li></ul>
    `
    newsContainer.appendChild(newsDiv);

    });
    


}
const loadNewsCard = async(id)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await response.json();
    displayNewsCard(data.data)
}
const displayNewsCard = cards =>{
    const newsCard = document.getElementById('news-card');
    newsCard.innerHTML='';
    cards.forEach(card =>{
        console.log(card)
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML=`
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4 p-3">
        <img src="${card.image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${ card.title}</h5>
          <p class="card-text py-3">${card.details.length > 300 ? card.details.slice(0,300) + '...' : card.details}</p>
          <div class="d-flex justify-content-between">
            <div class="d-flex"><img width="30" height="24" class ="img-fluid rounded-circle"src="${card.author.img}" alt="" srcset="">
            <p class="ms-2 fs-5">${card.author.name}</p>
            </div>
            <div><i class="fa-solid fa-eye"> ${card.total_view} </i></div>
            <div><button class="btn btn-primary">Details</button></div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
    `
    newsCard.appendChild(cardDiv);
    })
}
loadNewsCard();
loadAllNews();
