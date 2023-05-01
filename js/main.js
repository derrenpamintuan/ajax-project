const $form = document.querySelector('form');
const $noResults = document.querySelector('.not-found');
const $results = document.querySelector('.results');
const $input = document.querySelector('#search');
const $tbody = document.querySelector('tbody');
const $table = document.querySelector('table');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  $tbody.innerHTML = '';
  const countryCode = $input.value;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://date.nager.at/api/v3/publicholidays/2023/' + countryCode);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const apiData = xhr.response;

    if (apiData === null || apiData.status === 404) {
      $results.style.display = 'none';
      $noResults.style.display = 'block';
    } else {
      $noResults.style.display = 'none';
    }

    for (let i = 0; i < apiData.length; i++) {
      const holiday = renderRow(apiData[i]);
      $tbody.appendChild(holiday);
      $results.style.display = 'block';
    }
  });
  xhr.send();

});

function renderRow(holiday) {
  const $date = document.createElement('td');
  $date.setAttribute('class', 'date');

  const $dateText = document.createTextNode(holiday.date);
  $date.appendChild($dateText);

  const $localName = document.createElement('td');
  $localName.setAttribute('class', 'local-name');

  const $localNameText = document.createTextNode(holiday.localName);
  $localName.appendChild($localNameText);

  const $name = document.createElement('td');
  $name.setAttribute('class', 'name');

  const $nameText = document.createTextNode(holiday.name);
  $name.appendChild($nameText);

  const $code = document.createElement('td');
  $code.setAttribute('class', 'code');

  const $codeText = document.createTextNode(holiday.countryCode);
  $code.appendChild($codeText);

  const $iconElement = document.createElement('i');
  $iconElement.setAttribute('class', 'fa-regular fa-heart');

  for (let i = 0; i < data.holidays.length; i++) {
    if (holiday.localName === data.holidays[i].localName && holiday.countryCode === data.holidays[i].countryCode) {
      $iconElement.setAttribute('class', 'fa-solid fa-heart');
    }
  }

  const $tr = document.createElement('tr');
  $tr.append($code, $date, $localName, $name, $iconElement);

  return $tr;
}

$table.addEventListener('click', function (event) {
  if (event.target.className === 'fa-regular fa-heart') {
    const $codeValue = event.target.closest('tr').childNodes[0].textContent;
    const $dateValue = event.target.closest('tr').childNodes[1].textContent;
    const $localNameValue = event.target.closest('tr').childNodes[2].textContent;
    const $nameValue = event.target.closest('tr').childNodes[3].textContent;

    const holiday = {};
    holiday.countryCode = $codeValue;
    holiday.date = $dateValue;
    holiday.localName = $localNameValue;
    holiday.name = $nameValue;
    holiday.id = data.holidayId;
    data.holidays.push(holiday);
    data.holidayId++;

    event.target.setAttribute('class', 'fa-solid fa-heart');
  }
});

// eslint-disable-next-line no-unused-vars
function renderSaved(saved) {

  const $saveContainer = document.createElement('div');
  $saveContainer.setAttribute('class', 'save-container');

  const $savedHeader = document.createElement('div');
  $savedHeader.setAttribute('class', 'row saved-header');

  const $savedCode = document.createElement('h3');
  $savedCode.textContent = saved.countryCode;

  const $delete = document.createElement('i');
  $delete.setAttribute('class', 'fa-solid fa-square-xmark');

  const $savedNameRow = document.createElement('div');
  $savedNameRow.setAttribute('class', 'row');

  const $savedName = document.createElement('h4');
  $savedName.textContent = saved.name;

  const $savedDateRow = document.createElement('div');
  $savedDateRow.setAttribute('class', 'row');

  const $savedDate = document.createElement('h4');
  $savedDate.textContent = saved.date;

  const $ratingsRow = document.createElement('div');
  $ratingsRow.setAttribute('class', 'row ratings');

  const $rating1 = document.createElement('i');
  $rating1.setAttribute('class', 'fa-regular fa-star');

  const $rating2 = document.createElement('i');
  $rating2.setAttribute('class', 'fa-regular fa-star');

  const $rating3 = document.createElement('i');
  $rating3.setAttribute('class', 'fa-regular fa-star');

  const $rating4 = document.createElement('i');
  $rating4.setAttribute('class', 'fa-regular fa-star');

  const $rating5 = document.createElement('i');
  $rating5.setAttribute('class', 'fa-regular fa-star');

  const $li = document.createElement('li');

  $ratingsRow.append($rating1, $rating2, $rating3, $rating4, $rating5);

  $savedDateRow.append($savedDate);

  $savedNameRow.append($savedName);

  $savedHeader.append($savedCode, $delete);

  $saveContainer.append($savedHeader, $savedNameRow, $savedDateRow, $ratingsRow);

  $li.append($saveContainer);

  return $li;
}

const $searchView = document.getElementById('search-view');
const $savedView = document.getElementById('saved-view');

// eslint-disable-next-line no-unused-vars
function viewSwap(view) {
  data.view = view;
  if (view === 'search-view') {
    $searchView.className = 'view';
    $savedView.className = 'view hidden';
  } else {
    $searchView.className = 'view hidden';
    $savedView.className = 'view';
  }
}
