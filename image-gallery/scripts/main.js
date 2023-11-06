console.log('1. Вёрстка +10\n   - на странице есть несколько фото и строка поиска +5\n   - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, [логотип курса](https://rs.school/images/rs_school_js.svg) со [ссылкой на курс](https://rs.school/js-stage0/) +5\n2. При загрузке приложения на странице отображаются полученные от API изображения +10\n3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10\n4. Поиск +30\n   - при открытии приложения курсор находится в поле ввода +5\n   - есть placeholder +5\n   - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5\n   - поисковый запрос можно отправить нажатием клавиши Enter +5   \n   - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5\n   - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5\nИтого: 60/60\n');
const galleryView = document.querySelector('.gallery__view');

function addImage(image) {
  const imageTemplate = `
  <a href="#" " target="_blank" class="gallery__img-container"><img src="images/50x50.png" alt="placeholder"></a>
  `
  const newTemplate = document.createElement('div');
  newTemplate.innerHTML = imageTemplate;
  const newElement = newTemplate.firstElementChild;
  newElement.querySelector('img').src = image.urls.small;
  newElement.setAttribute('href', image.links.html);
  galleryView.append(newElement);
}
function showImages(images) {
  galleryView.innerHTML = ''; //remove all current images
  images.forEach(image => {
    addImage(image)
  });
}

async function getImages(showImages, firstKeyword) {
  const api = 'https://api.unsplash.com/photos/random';
  const myAccessKey = 'eK7lPcF6Rw7TmFkJAgoVGG3JyKJ6yVsNG5CZjbLIZIM';

  const form = new FormData(document.querySelector('.gallery__search-form'));
  const imageCount = form.get("image-count");
  const keyword = form.get("keyword");

  const url = new URL(api);
  url.searchParams.append('query', firstKeyword || keyword);
  url.searchParams.append('count', imageCount);
  url.searchParams.append('orientation', "landscape");
  url.searchParams.append('content_filter', "high");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept-Version", "v1");
  headers.append("Authorization", `Client-ID ${myAccessKey}`);

  const options = {
    method: "GET",
    headers: headers,
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    showImages(data);
  } catch (error) {
    console.log(error);
  }
}

document
  .querySelector('.gallery__search-form')
  .addEventListener('submit', (event) => getImages(showImages));

getImages(showImages, 'cats');
document.querySelector('.gallery__search-form input[name="keyword"').focus();
