import referenceTable from '/js/referenceTable.js';

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
    document.getElementById('dbtest').innerHTML += '<object data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+clothingList[i].mainColour+'\')};"></object><br>'
    document.getElementById('dbtest').innerHTML += 'mainColour: ' + clothingList[i].mainColour + '<br>';
    document.getElementById('dbtest').innerHTML += '<div class="coloursHolder"><div class="mainColour" style="background-color:'+clothingList[i].mainColour+';"></div><div id="subColoursHolder'+i+'" class="subColoursHolder"></div></div>';
    // SubColours
    for (var j=0; j<clothingList[i].subColours.length; j++) {
      if (j == 12) { return; }
      document.getElementById('subColoursHolder'+i).innerHTML += '<div class="subColour" style="background-color:'+clothingList[i].subColours[j]+';"></div>'
    }
  }
}

updateClothingArray();

const addClothing = (id, mainColour, subColours) => {

  console.log('Adding clothing: '+id);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
      updateClothingArray();
    }
  }
  var body = {"id": id,"mainColour": mainColour,"subColours": subColours}
  console.log(body)
  xhttp.open('POST', '/api/addClothing');
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(body));
}

document.getElementById('addClothingBTN').addEventListener('click', () => {
  addClothing("%01%0001", "#000000", ["#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"])
})