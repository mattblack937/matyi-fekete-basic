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
  listingPortaits(aliveChar);
  searchButton(aliveChar);
  eventListenerOnPortraits(aliveChar);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function listCharastersAlive(data) {
  var aliveChar = [];
  for (var i = 0; i < data.length; i += 1) {
    if (!data[i].dead) {
      aliveChar.push(data[i]);
    }
  }
  return aliveChar;
}

function createStartingElements() {
  var sidebar = document.querySelector('.right-div');
  var newDiv = document.createElement('div');
  var input = document.createElement('input');
  var button = document.createElement('button');
  newDiv.setAttribute('class', 'right-div__character');
  input.setAttribute('id', 'right-div__input');
  input.setAttribute('placeholder', 'Search a character');
  button.setAttribute('id', 'right-div__button');
  button.innerHTML = 'Search';
  sidebar.appendChild(newDiv);
  sidebar.appendChild(button);
  sidebar.appendChild(input);
}

function sortingInAbcOrder(data) {
  data.sort(function sort(a, b) {
    return a.name.localeCompare(b.name);
  });
}

// portrek kiiratasa
function listingPortaits(data) {
  var leftDiv = document.querySelector('.left-div');
  for (var i = 0; i < data.length; i += 1) {
    leftDiv.innerHTML += `
    <div class="left-div__main">
      <img class="main__click-on" src="${data[i].portrait}" alt="${data[i].name}">
      <br>
      <span class="main__name">${data[i].name}</span>
    </div>
  `;
  }
}

function searchButton(data) {
  document.querySelector('#right-div__button').addEventListener('click', function fn() {
    searchInCharacters(data);
  });
}

function searchInCharacters(data) {
  var userInput = document.querySelector('#right-div__input').value;
  var rightDivCharacter = document.querySelector('.right-div__character');
  var clickOnImages = document.querySelectorAll('.main__click-on');
  for (var i = 0; i < data.length; i += 1) {
    if (userInput.toLowerCase() === data[i].name.toLowerCase()) {
      infoSelectedCharacter(data[i], rightDivCharacter);
      fadeOnSearch(data[i], clickOnImages);
      i = data.length;
    } else {
      noInfoOfCharacter(rightDivCharacter);
    }
  }
}

function infoSelectedCharacter(character, target) {
  target.innerHTML = `
    <img class="character__movie-pic" src="${character.picture}" alt="${character.name}"><br>
    <span class="character__name" >${character.name}</span>`;
  if (character.house) {
    target.innerHTML +=
      `<img class="character__houses-pic" src="assets/houses/${character.house}.png">`;
  }
  target.innerHTML += `<p class="character__bio">${character.bio}</p>`;
}

function noInfoOfCharacter(target) {
  target.innerHTML = `
    <p class="not-found">Character not found</p>
  `;
}

function eventListenerOnPortraits(data) {
  var clickOnImages = document.querySelectorAll('.main__click-on');
  for (var i = 0; i < clickOnImages.length; i += 1) {
    clickOnImages[i].addEventListener('click', function fn() {
      clickOnCharacters(data, this);
    });
  }
}

function clickOnCharacters(data, character) {
  var rightDiv = document.querySelector('.right-div__character');
  for (var i = 0; i < data.length; i += 1) {
    if (data[i].name === character.alt) {
      infoSelectedCharacter(data[i], rightDiv);
    }
  }
  changeOpacity(character);
}

function changeOpacity(character) {
  var clickOnImages = document.querySelectorAll('.main__click-on');
  var decision = decide(clickOnImages, character);
  if (decision === 0) {
    chosenIsFaded(clickOnImages, character);
  } else if (decision === 1) {
    thereIsAFadedOne(clickOnImages);
  } else {
    noFaded(clickOnImages, character);
  }
}

function decide(clickOnImages, character) {
  var decision;
  if (character.classList.contains('fade-away')) {
    decision = 0;
  } else {
    for (var i = 0; i < clickOnImages.length; i += 1) {
      if (clickOnImages[i].classList.contains('fade-away')) {
        decision = 1;
      } else {
        decision = -1;
      }
    }
  }
  return decision;
}

function chosenIsFaded(clickOnImages, character) {
  for (var i = 0; i < clickOnImages.length; i += 1) {
    if (clickOnImages[i].classList.contains('fade-away') && character.alt === clickOnImages[i].alt) {
      clickOnImages[i].classList.remove('fade-away');
    } else if (!clickOnImages[i].classList.contains('fade-away')) {
      clickOnImages[i].classList.add('fade-away');
    }
  }
}

function thereIsAFadedOne(clickOnImages) {
  for (var i = 0; i < clickOnImages.length; i += 1) {
    clickOnImages[i].classList.remove('fade-away');
  }
}

function noFaded(clickOnImages, character) {
  for (var i = 0; i < clickOnImages.length; i += 1) {
    if (clickOnImages[i].alt !== character.alt) {
      clickOnImages[i].classList.add('fade-away');
    }
  }
}

function fadeOnSearch(character, clickOnImages) {
  for (var i = 0; i < clickOnImages.length; i += 1) {
    if (clickOnImages[i].classList.contains('fade-away') && character.name === clickOnImages[i].alt) {
      clickOnImages[i].classList.remove('fade-away');
    } else if (!clickOnImages[i].classList.contains('fade-away') && character.name !== clickOnImages[i].alt) {
      clickOnImages[i].classList.add('fade-away');
    }
  }
}