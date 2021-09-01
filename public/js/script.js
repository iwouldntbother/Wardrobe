import referenceTable from './referenceTable.js';

var clothingList = [];


const updateClothingArray = () => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
      clothingList = JSON.parse(xhttp.responseText);
      // console.log(clothingList)
      updateList();
    }
  }
  xhttp.open('GET', '/api/getClothing');
  xhttp.send()
}

const updateList = () => {
  // console.log(clothingList.length)
  document.getElementById('dbtest').innerHTML = ''
  for (var i=0; i < clothingList.length; i++) {

    let typeID = clothingList[i].id.split('%')[1]

    document.getElementById('dbtest').innerHTML += 'id: ' + clothingList[i].id + '<br>';
    document.getElementById('dbtest').innerHTML += 'iconPath: ' + referenceTable.clothingIconPaths[Number(typeID)] + '<br>';
    document.getElementById('dbtest').innerHTML += '<object data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="this.contentDocument.querySelector(\'path\').setAttribute(\'fill\', \'red\')"></object><br>'
    document.getElementById('dbtest').innerHTML += 'mainColour: ' + clothingList[i].mainColour + '<br>';
    document.getElementById('dbtest').innerHTML += 'subColours: ' + clothingList[i].subColours + '<br><br>';
  }
}

updateClothingArray();

const addClothing = (id, mainColour, subColours) => {

  // console.log('Adding clothing: '+id);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
      updateClothingArray();
    }
  }
  var body = {"id": id,"mainColour": mainColour,"subColours": subColours}
  // console.log(body)
  xhttp.open('POST', '/api/addClothing');
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(body));
}

document.getElementById('addClothingBTN').addEventListener('click', () => {
  addClothing("%01%testID", "testMainColour", ["test","sub","colours"])
})