export function displayNews(newsItems) {
  const newsContainer = document.getElementById('news-container');

  newsItems.slice(0, 6).forEach((item) => {
    const newsItemElement = document.createElement('div');
    const titleElement = document.createElement('h2');
    const descriptionElement = document.createElement('p');
    const linkElement = document.createElement('a');

    newsItemElement.classList.add('news-item');

    titleElement.textContent = item.title;

    descriptionElement.textContent = item.description;

    linkElement.href = item.link;
    linkElement.textContent = 'Read More';

    newsItemElement.appendChild(titleElement);
    newsItemElement.appendChild(descriptionElement);
    newsItemElement.appendChild(linkElement);
    newsContainer.appendChild(newsItemElement);
  });
}
