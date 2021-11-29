// // // // // //
//  Home Page  //
// // // // // // 

document.getElementById("slideUpBarHolder").addEventListener('touchmove', (event) => {
  // console.log(event.touches[0].clientY);
  if (event.touches[0].clientY >= (window.innerHeight / 10)) {
    document.getElementById("slideUpContainer").style.top = event.touches[0].clientY + 'px'
  }
})

const dragThreshold = 300;

document.getElementById("slideUpBarHolder").addEventListener('touchend', (event) => {
  // console.log(event);
  if (event.changedTouches[0].clientY > dragThreshold) {
    // console.log('Bellow')
    document.getElementById("slideUpContainer").style.transition = 'top 0.25s'
    document.getElementById("slideUpContainer").style.top = '53vh'
    setTimeout(() => {document.getElementById("slideUpContainer").style.transition = ''}, 250)
  } else {
    // console.log('Above')
    document.getElementById("slideUpContainer").style.transition = 'top 0.25s'
    document.getElementById("slideUpContainer").style.top = '10vh'
    setTimeout(() => {document.getElementById("slideUpContainer").style.transition = ''}, 250)
  }
})

// Clothes List

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
  document.getElementById('clothesList').innerHTML = ''
  for (var i=0; i < clothingList.length; i++) {
    
    let typeID = clothingList[i].id.split('%')[1]

    var listItem = document.createElement('div')
    listItem.className = 'clothesListItem'
    listItem.innerHTML = '<object class="clothesListIcon" data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+clothingList[i].mainColour+'\')};"></object><p class="clothesListName">'+clothingList[i].name+'</p><div id="rmItem'+ clothingList[i].id +'" class="rmClothesItem">-</div>'
    
    document.getElementById('clothesList').appendChild(listItem)
    
    // listItem.getElementById("rmItem" + clothingList[i].id).addEventListener('click', () => {
    //   var r = confirm("Are you sure you want to delete this item?");
    //   if (r) {
    //     deleteClothingItem(clothingList[i].id);
    //   } else {
    //     return
    //   }
    // })

    // document.getElementById('dbtest').innerHTML += 'id: ' + clothingList[i].id + '<br>';
    // document.getElementById('dbtest').innerHTML += 'iconPath: ' + referenceTable.clothingIconPaths[Number(typeID)] + '<br>';
    // document.getElementById('dbtest').innerHTML += '<object data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+clothingList[i].mainColour+'\')};"></object><br>'
    // document.getElementById('dbtest').innerHTML += 'mainColour: ' + clothingList[i].mainColour + '<br>';
    // document.getElementById('dbtest').innerHTML += '<div class="coloursHolder"><div class="mainColour" style="background-color:'+clothingList[i].mainColour+';"></div><div id="subColoursHolder'+i+'" class="subColoursHolder"></div></div>';
    // // SubColours
    // for (var j=0; j<clothingList[i].subColours.length; j++) {
    //   if (j == 12) { return; }
    //   document.getElementById('subColoursHolder'+i).innerHTML += '<div class="subColour" style="background-color:'+clothingList[i].subColours[j]+';"></div>'
    // }
  }
}

updateClothingArray();

document.addEventListener('click', (e) => {
  if (e.target && e.target.className == 'rmClothesItem') {
    var r = confirm("Are you sure you want to delete this item?");
    var id = e.target.id.replace('rmItem', '')
    if (r) {
      deleteClothingItem(id);
    } else {
      return
    }
  }
  })

const deleteClothingItem = (id) => {
  console.log("Deleting: "+id)

  var data = {
    itemID: ''
  }

  // ID data collection
  data.itemID = id
  
  // PUSH data to server
  // console.log(data)

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
      console.log('Removed from database successfully')
    }
  }
  // console.log(body)
  xhttp.open('POST', '/api/rmClothingItem');
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(data));
  
  
  updateClothingArray();
}

// // // // //
// Menu Bar //
// // // // //

var currentPage = 'home';

const loadPage = (page) => {
  document.getElementById(currentPage+'PageContainer').style.display = 'none';
  document.getElementById(page+'PageContainer').style.display = 'block';
  currentPage = page;
}

document.getElementById("homeBTN").addEventListener("click", () => {
  loadPage('home')
})

document.getElementById("itemsBTN").addEventListener("click", () => {
  loadPage('items')
})

document.getElementById("outfitsBTN").addEventListener("click", () => {
  loadPage('outfits')
})

// // // // // //
// Items Page  //
// // // // // //

import referenceTable from "./referenceTable.js";

const buildGrid = () => {
  for (var i=0; i<referenceTable.clothingIconPaths.length; i++) {
    document.getElementById('clothingGrid').innerHTML += '<div id="c'+('0'+i).slice(-2)+'" class="clothingGridItem"><object data="'+ referenceTable.clothingIconPaths[i] +'"></object></div>'
  }
}

buildGrid();


var subCount = 1;

const addSubOption = () => {
  if (subCount < 12) {
    var newNo = document.getElementById('clothingSubColours').childElementCount;
    var newInput = document.createElement('div');
    newInput.innerHTML = "<input class='subInput' id='subColourInput"+Number(newNo)+"' type='color'><div class='subColourRM' id='subColourRM"+Number(newNo)+"'>-</div>"
    newInput.className = "subColourHolder"
    newInput.id = "subColourHolder"+Number(newNo)
    document.getElementById("clothingSubColours").appendChild(newInput)
    // var newInput = "<div class='subColourHolder' id='subColourHolder"+Number(newNo)+"'><input class='subInput' id='subColourInput"+Number(newNo)+"' type='color'><div class='subColourRM' id='subColourRM"+Number(newNo)+"'>-</div></div>"
    // document.getElementById('clothingSubColours').innerHTML += "<div class='subColourHolder' id='subColourHolder"+Number(newNo)+"'><input class='subInput' id='subColourInput"+Number(newNo)+"' type='color'><div class='subColourRM' id='subColourRM"+Number(newNo)+"'>-</div></div>"
    subCount++;
  }
}

document.getElementById('addSubBTN').addEventListener('click', () => {
  addSubOption();
})

function rmSub(id) {
  var index = id.replace('subColourRM', '')
  document.getElementById('subColourHolder'+index).remove()
  subCount--;
}

var selectedItem;
var submitDisabled = true;

const selectItem = (item) => {
  if (selectedItem) {
    selectedItem.classList.remove('selected')
  } else {
    document.getElementById('submitClothingItem').classList.remove('disabled');
    submitDisabled = false;
  }
  item.classList.add('selected')
  selectedItem = item;
}

document.body.addEventListener('click', (event) => {
  if ([...document.getElementById("clothingGrid").children].includes(event.target)) {
    selectItem(event.target);
  } else if (event.target.id.includes('subColourRM')) {
    rmSub(event.target.id);
  }else {
    return
  }
})

document.getElementById('submitClothingItem').addEventListener('click', () => {
  if (!submitDisabled) {

    var data = {
      id: '',
      name: '',
      mainColour: '',
      subColours: []
    }
    
    const whiteSpace = new RegExp("^\\s*$");

    if (whiteSpace.test(document.getElementById('clothingNameInput').value)) {
      data.name = "unnamed clothing item"
    } else {
      data.name = document.getElementById("clothingNameInput").value
    }

    // ID data collection
    data.id = document.querySelector('.selected').id.replace('c', '')
    
    // Main Colour data collection
    data.mainColour = document.getElementById('mainColourInput').value;
    
    // Sub-Colours data collection
    var subColours = [];
    let subChildren = document.getElementsByClassName('subInput')
    for (var i=0; i<subChildren.length; i++) {
      subColours.push(subChildren[i].value)
    }
    // console.log(subColours);
    data.subColours = subColours;
    
    // PUSH data to server
    console.log(data)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        console.log('Added to database successfully')
        updateClothingArray();
      }
    }
    // console.log(body)
    xhttp.open('POST', '/api/addClothing');
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));

  }
})