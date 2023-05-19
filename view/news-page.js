export function displayNews(newsItems) {
  const newsContainer = document.getElementById('news-container');

  newsItems.slice(0, 6).forEach((item) => {
    const newsItemElement = document.createElement('div');
    newsItemElement.classList.add('news-item');

    const titleElement = document.createElement('h2');
    titleElement.textContent = item.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = item.description;

    // const imageElement = document.createElement('img');
    // imageElement.src = item.image;
    // imageElement.alt = 'News Image';

    const linkElement = document.createElement('a');
    linkElement.href = item.link;
    linkElement.textContent = 'Read More';

    newsItemElement.appendChild(titleElement);
    newsItemElement.appendChild(descriptionElement);
    // newsItemElement.appendChild(imageElement);
    newsItemElement.appendChild(linkElement);

    newsContainer.appendChild(newsItemElement);
  });
}
