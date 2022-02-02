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
      updateOutfitList();
    }
  }
  xhttp.open('GET', '/api/getClothing');
  xhttp.send()
}

const updateList = () => {
  // console.log(clothingList.length)
  document.getElementById('clothesList').innerHTML = ''
  for (var i=0; i < clothingList.length; i++) {
    
    let typeID = clothingList[i].type.split('%')[1]

    var listItem = document.createElement('div')
    listItem.className = 'clothesListItem'
    listItem.innerHTML = '<object class="clothesListIcon" data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+clothingList[i].mainColour+'\')};"></object><p class="clothesListName">'+clothingList[i].name+'</p><div id="rmItem'+ clothingList[i].id +'" class="rmClothesItem">-</div>'
    
    document.getElementById('clothesList').appendChild(listItem)
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
      data.name = "Unnamed"
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
        console.log(xhttp.responseText)
      } else if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 500) {
        console.log(xhttp.responseText)
      }
    }
    // console.log(body)
    xhttp.open('POST', '/api/addClothing');
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));

  }
})

// Outfits Page //

const updateOutfitList = () => {
  document.getElementById('clothingListHolder').innerHTML = ''
  for (var i=0; i < clothingList.length; i++) {
    
    let typeID = clothingList[i].type.split('%')[1]

    var listItem = document.createElement('div')
    listItem.className = 'clothesListItem'
    listItem.setAttribute('data', i)
    listItem.innerHTML = '<object class="clothesListIcon" data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+clothingList[i].mainColour+'\')};"></object><p class="clothesListName">'+clothingList[i].name+'</p>'
    
    document.getElementById('clothingListHolder').appendChild(listItem)
  }
}

document.getElementById('clothingListHolder').addEventListener('click', (e) => {

  if (outfitGrid.length == 8) {
    return
  }

  if (e.target.classList.contains('clothesListItem')) {
    if (e.target.classList.contains('selectedClothingItem')) {
      // Deselect
      e.target.classList.remove('selectedClothingItem');
      const index = outfitGrid.indexOf(clothingList[e.target.getAttribute('data')])
      if (index > -1) {
        outfitGrid.splice(index, 1)
      }
      updateOutfitClothingGrid();
    } else {
      // Select
      e.target.classList.add('selectedClothingItem');
      console.log('Selected: '+clothingList[e.target.getAttribute('data')].name)
      outfitGrid.push(clothingList[e.target.getAttribute('data')])
      updateOutfitClothingGrid();
    }
  }
})

let outfitGrid = []
let submitOutfitDisabled = true

const updateOutfitClothingGrid = () => {

  if (outfitGrid.length < 1) {
    submitOutfitDisabled = true
  } else {
    submitOutfitDisabled = false
  }

  document.getElementById('outfitClothingGrid').innerHTML = '';
  for (var i=0; i<outfitGrid.length; i++) {
    var typeID = outfitGrid[i].type.replace('%', '')
    document.getElementById('outfitClothingGrid').innerHTML += 
    '<div id="c'+outfitGrid[i].id+'" class="outfitClothingGridItem"><object class="clothesListIcon" data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+clothingList[i].mainColour+'\')};"></object></div>'
  }
}


var outfitArray = [];

const updateOutfitArray = () => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
      outfitArray = JSON.parse(xhttp.responseText);
      updateCarousel();
      console.log(outfitArray)
    }
  }
  xhttp.open('GET', '/api/getOutfit');
  xhttp.send()
}

const updateCarousel = () => {
  document.getElementById('outfitCarouselHolder').innerHTML = ''
  for (var i=0; i < outfitArray.length; i++) {
    
    let outfitID = outfitArray[i].id

    var carouselItem = document.createElement('div')
    carouselItem.className = 'outfitCarouselCell'
    carouselItem.id = outfitID;

    var outfitName = document.createElement('h1')
    outfitName.className = 'outfitName'
    outfitName.innerHTML = outfitArray[i].name || 'Untitled'

    carouselItem.appendChild(outfitName);

    for (var j=0; j<outfitArray[i].items.length; j++) {
      let itemOBJ = clothingList.find(x => x.id === outfitArray[i].items[j])
      if (!itemOBJ) {
        console.log('Clothing from outfit: '+outfitArray[i].id+' missing.')
        break
      }
      console.log(itemOBJ, outfitArray[i].items);
      var carouselCellItem = document.createElement('div')
      carouselCellItem.className = 'outfitCarouselCellItem'
      carouselCellItem.innerHTML = '<object class="clothesListIcon" data="'+ referenceTable.clothingIconPaths[Number(itemOBJ.type.replace('%', ''))] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+itemOBJ.mainColour+'\')};"></object>'
      carouselItem.appendChild(carouselCellItem)
    }

    // carouselItem.innerHTML = '<object class="clothesListIcon" data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+clothingList[i].mainColour+'\')};"></object><p class="clothesListName">'+clothingList[i].name+'</p><div id="rmItem'+ clothingList[i].id +'" class="rmClothesItem">-</div>'
    
    document.getElementById('outfitCarouselHolder').appendChild(carouselItem)
  }
}

updateOutfitArray();


document.getElementById('submitOutfit').addEventListener('click', () => {
  if (!submitOutfitDisabled) {

    var data = {
      id: '',
      name: '',
      items: []
    }
    
    const whiteSpace = new RegExp("^\\s*$");

    if (whiteSpace.test(document.getElementById('outfitNameInput').value)) {
      data.name = "Unnamed"
    } else {
      data.name = document.getElementById("outfitNameInput").value
    }

    for (let i=0; i<outfitGrid.length; i++) {
      data.items.push(outfitGrid[i].id);
    }

    // ID data collection
    data.id = 'to_be_changed'
    
    // PUSH data to server
    console.log(data)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        console.log('Added to database successfully')
        updateOutfitArray();
      }
    }
    // console.log(body)
    xhttp.open('POST', '/api/addOutfit');
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));

  }
})