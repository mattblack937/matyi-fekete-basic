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
  sortingInAbcOrder(userDatas);
  listGotCharacters(userDatas);

}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function sortingInAbcOrder(data) {
  data.sort(function sort(a, b) {
    return a.name.localeCompare(b.name);
  });
}

function listGotCharacters(data) {
  for (var i = 0; i < data.length; i += 1) {
    if (!data[i].dead) {
      createListingElements(data[i]);
    }
  }
}

function createListingElements(character) {
  var leftDiv = document.querySelector('.left-div');
  leftDiv.innerHTML += `
    <div>
    <img src="${character.portrait}" alt="${character.name}">
    <br>
    <span>${character.name}</span>
    </div>
  `;
}

function searchInCharacters(data) {
  var userInput = document.getElementById('right-div__searchbox');
  userInput = userInput.value.toLowerCase();
  var rightDiv = document.querySelector('.right-div');
  for (var i = 0; i < data.length; i += 1) {
    if (userInput === data.toLowerCase()) {
      rightDiv.innerHTML = createRightDiv(data[i], rightDiv);
    } else {
      noInfoOfCharacter(rightDiv);
    }
  }
}

function createRightDiv(character, element) {
  element.innerHTML = `
    <h2>Game of Thrones</h2>
    <img src="${character.picture}" alt="${character.name}">
    <span>${character.name}</span>
    <div>${character.bio}</div>
    <button id="right-div__searchbutton">Kereses</button>
    <input type="text" id="right-div__searchbox">
  `;
}

function noInfoOfCharacter(element) {
  element.innerHTML = `
    <h2>Game of Thrones</h2>
    <p>Character not found</p>
    <button id="right-div__searchbutton">Kereses</button>
    <input type="text" id="right-div__searchbox">
  `;
}

function characterOnClick() {

}