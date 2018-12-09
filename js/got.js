function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var aliveChar = listCharastersAlive(userDatas);
  createStartingElements();
  sortingInAbcOrder(aliveChar);
  createListingElements(aliveChar);
  searchButton(aliveChar);
  eventListenerOnAllCharacters(aliveChar);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function createStartingElements() {
  var leftDiv = document.createElement('div');
  var rightDiv = document.createElement('div');
  var newDiv = document.createElement('div');
  var input = document.createElement('input');
  var button = document.createElement('button');
  leftDiv.setAttribute('class', 'left-div');
  rightDiv.setAttribute('class', 'right-div');
  newDiv.setAttribute('class', 'righ-div__character');
  input.setAttribute('id', 'right-div__input');
  button.setAttribute('id', 'right-div__button');
  button.innerHTML = 'Kereses';
  document.body.appendChild(leftDiv);
  rightDiv.appendChild(newDiv);
  rightDiv.appendChild(button);
  rightDiv.appendChild(input);
  document.body.appendChild(rightDiv);
}

function sortingInAbcOrder(data) {
  data.sort(function sort(a, b) {
    return a.name.localeCompare(b.name);
  });
}

function listCharastersAlive(data) {
  var aliveChar = [];
  for (var i = 0; i < data.length; i += 1) {
    if (!data[i].dead) {
      aliveChar.push(data[i]);
    }
  }
  return aliveChar;
}


// portrek kiiratasa
function createListingElements(data) {
  var leftDiv = document.querySelector('.left-div');
  for (var i = 0; i < data.length; i += 1) {
    leftDiv.innerHTML += `
    <div>
    <img class="click-on" src="${data[i].portrait}" alt="${data[i].name}">
    <br>
    <span>${data[i].name}</span>
    </div>
  `;
  }
}

function searchButton(data) {
  document.querySelector('#right-div__button').addEventListener('click', function () {
    searchInCharacters(data);
  });
}

function searchInCharacters(data) {
  var userInput = document.getElementById('right-div__input').value;
  var rightDiv = document.querySelector('.righ-div__character');
  for (var i = 0; i < data.length; i += 1) {
    if (userInput.toLowerCase() === data[i].name.toLowerCase()) {
      createRightDiv(data[i], rightDiv);
      i = data.length;
    } else {
      noInfoOfCharacter(rightDiv);
    }
  }
}

function createRightDiv(character, element) {
  element.innerHTML = `
    <img src="${character.picture}" alt="${character.name}"><br>
    <span>${character.name}</span>`;
  if (character.house) {
    element.innerHTML +=
      `<img src="assets/houses/${character.house}.png">`;
  }
  element.innerHTML += `<p>${character.bio}</p>`;
}

function noInfoOfCharacter(element) {
  element.innerHTML = `
    <p>Character not found</p>
  `;
}

function eventListenerOnAllCharacters(data) {
  var clickOnImages = document.querySelectorAll('.click-on');
  for (var i = 0; i < clickOnImages.length; i += 1) {
    clickOnImages[i].addEventListener('click', function () {
      clickOnCharacters(data, this.alt);
    });
  }
}

function clickOnCharacters(data, character) {
  var rightDiv = document.querySelector('.righ-div__character');
  for (var i = 0; i < data.length; i += 1) {
    if (data[i].name === character) {
      createRightDiv(data[i], rightDiv);
    }
  }
}