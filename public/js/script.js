var clothingList = [];

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

const updateList = () => {
  for (var i=0; i < clothingList.length; i++) {
    document.getElementById('dbtest').innerHTML += 'id: ' + clothingList[i].id + '<br>';
    document.getElementById('dbtest').innerHTML += 'iconPath: ' + clothingList[i].iconPath + '<br>';
    document.getElementById('dbtest').innerHTML += '<object data="'+ clothingList[i].iconPath+'" onload="this.contentDocument.querySelector(\'path\').setAttribute(\'fill\', \'red\')"></object><br>'
    document.getElementById('dbtest').innerHTML += 'mainColour: ' + clothingList[i].mainColour + '<br>';
    document.getElementById('dbtest').innerHTML += 'subColours: ' + clothingList[i].subColours + '<br><br>';
  }
}