// // // // // //
//  Home Page  //
// // // // // //

document
  .getElementById('slideUpBarHolder')
  .addEventListener('touchmove', (event) => {
    // console.log(event.touches[0].clientY);
    if (event.touches[0].clientY >= window.innerHeight / 10) {
      document.getElementById('slideUpContainer').style.top =
        event.touches[0].clientY + 'px';
    }
  });

const dragThreshold = 300;

document
  .getElementById('slideUpBarHolder')
  .addEventListener('touchend', (event) => {
    // console.log(event);
    if (event.changedTouches[0].clientY > dragThreshold) {
      // console.log('Bellow')
      document.getElementById('slideUpContainer').style.transition =
        'top 0.25s';
      document.getElementById('slideUpContainer').style.top = '53vh';
      setTimeout(() => {
        document.getElementById('slideUpContainer').style.transition = '';
      }, 250);
    } else {
      // console.log('Above')
      document.getElementById('slideUpContainer').style.transition =
        'top 0.25s';
      document.getElementById('slideUpContainer').style.top = '9.75vh';
      setTimeout(() => {
        document.getElementById('slideUpContainer').style.transition = '';
      }, 250);
    }
  });

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
  };
  xhttp.open('GET', '/api/getClothing');
  xhttp.send();
};

const getFullName = (text) => {
  let returnName = '';
  switch (text) {
    case 'charityShop':
      returnName = 'Charity Shop';
      break;

    case 'secondHand':
      returnName = 'Second Hand';
      break;

    case 'new':
      returnName = 'New';
      break;

    default:
      returnName = 'Unknown';
      break;
  }
  return returnName;
};

const updateList = () => {
  // console.log(clothingList.length)
  document.getElementById('clothesList').innerHTML = '';
  for (var i = 0; i < clothingList.length; i++) {
    let typeID = clothingList[i].type.split('%')[1];

    var listItem = document.createElement('div');
    listItem.className = 'clothesListItem';

    // Icon
    let listIcon = document.createElement('object');
    listIcon.className = 'clothesListIcon';
    listIcon.data = referenceTable.clothingIconPaths[Number(typeID)];
    listIcon.setAttribute(
      'onload',
      "for (let i=0; i<this.contentDocument.querySelectorAll('path').length; i++) {this.contentDocument.querySelectorAll('path')[i].setAttribute('fill', '" +
        clothingList[i].colour +
        "')};"
    );
    listIcon.setAttribute('colour', clothingList[i].colour);

    listItem.appendChild(listIcon);

    let textHolder = document.createElement('div');

    // Name
    let listName = document.createElement('p');
    listName.className = 'clothesListName';
    listName.innerHTML = clothingList[i].name;
    textHolder.appendChild(listName);

    // Details
    let detailsHolder = document.createElement('div');
    detailsHolder.className = 'clothesListDetails';

    // Brand
    let listBrand = document.createElement('p');
    listBrand.className = 'clothesListBrand';
    listBrand.innerHTML = clothingList[i].brand;
    detailsHolder.append(listBrand);

    // Size
    let listSize = document.createElement('p');
    listSize.className = 'clothesListSize';
    listSize.innerHTML = clothingList[i].size;
    detailsHolder.append(listSize);

    // Source
    let listSource = document.createElement('p');
    listSource.className = 'clothesListSource';
    listSource.innerHTML = getFullName(clothingList[i].source);
    detailsHolder.append(listSource);

    textHolder.appendChild(detailsHolder);

    listItem.appendChild(textHolder);

    // Remove Button
    let deleteBTN = document.createElement('div');
    deleteBTN.id = 'rmItem' + clothingList[i].id;
    deleteBTN.className = 'rmClothesItem';
    deleteBTN.innerHTML = '+';

    listItem.appendChild(deleteBTN);

    document.getElementById('clothesList').appendChild(listItem);
  }
};

document.addEventListener('click', (e) => {
  if (e.target && e.target.className == 'rmClothesItem') {
    var r = confirm(
      'Are you sure you want to delete this item? (This will also remove any outfits containing this item.'
    );
    var id = e.target.id.replace('rmItem', '');
    if (r) {
      deleteClothingItem(id);
    } else {
      return;
    }
  }
});

const deleteClothingItem = (id) => {
  console.log('Deleting: ' + id);

  var data = {
    itemID: '',
  };

  // ID data collection
  data.itemID = id;

  // PUSH data to server
  // console.log(data)

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
      console.log('Removed from database successfully');
      updateClothingArray();
      updateOutfitArray();
    }
  };
  // console.log(body)
  xhttp.open('POST', '/api/rmClothingItem');
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhttp.send(JSON.stringify(data));
};

// // // // //
// Menu Bar //
// // // // //

var currentPage = 'home';

const loadPage = (page) => {
  document.getElementById(currentPage + 'PageContainer').style.display = 'none';
  document.getElementById(page + 'PageContainer').style.display = 'block';
  currentPage = page;
};

document.getElementById('homeBTN').addEventListener('click', () => {
  loadPage('home');
});

document.getElementById('itemsBTN').addEventListener('click', () => {
  loadPage('items');
});

document.getElementById('outfitsBTN').addEventListener('click', () => {
  loadPage('outfits');
});

// // // // // //
// Items Page  //
// // // // // //

import referenceTable from './referenceTable.js';

const buildGrid = () => {
  for (var i = 0; i < referenceTable.clothingIconPaths.length; i++) {
    document.getElementById('clothingGrid').innerHTML +=
      '<div id="c' +
      ('0' + i).slice(-2) +
      '" class="clothingGridItem"><object data="' +
      referenceTable.clothingIconPaths[i] +
      '"></object></div>';
  }
};

buildGrid();

var selectedItem;
var submitDisabled = true;

const selectItem = (item) => {
  if (selectedItem) {
    selectedItem.classList.remove('selected');
  } else {
    document.getElementById('submitClothingItem').classList.remove('disabled');
    submitDisabled = false;
  }
  item.classList.add('selected');
  selectedItem = item;
};

document.body.addEventListener('click', (event) => {
  if (
    [...document.getElementById('clothingGrid').children].includes(event.target)
  ) {
    selectItem(event.target);
  } else {
    return;
  }
});

document.getElementById('submitClothingItem').addEventListener('click', () => {
  if (!submitDisabled) {
    var data = {
      id: '',
      name: '',
      brand: '',
      size: '',
      source: '',
      colour: '',
    };

    const whiteSpace = new RegExp('^\\s*$');

    if (whiteSpace.test(document.getElementById('clothingNameInput').value)) {
      data.name = 'Unnamed';
    } else {
      data.name = document.getElementById('clothingNameInput').value;
    }

    // ID data collection
    data.id = document.querySelector('.selected').id.replace('c', '');

    // Colour data collection
    data.colour = document.getElementById('colourInput').value;

    // Size data collection
    data.size = document.getElementById('sizeInput').value;

    // Brand data collection
    data.brand = document.getElementById('brandInput').value;

    // Source data collection
    data.source = document.getElementById('sourceInput').value;

    // PUSH data to server
    console.log(data);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        console.log('Added to database successfully');
        updateClothingArray();
        console.log(xhttp.responseText);
      } else if (
        xhttp.readyState == XMLHttpRequest.DONE &&
        xhttp.status === 500
      ) {
        console.log(xhttp.responseText);
      }
    };
    // console.log(body)
    xhttp.open('POST', '/api/addClothing');
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(data));
  }
});

// Outfits Page //

const updateOutfitList = () => {
  document.getElementById('clothingListHolder').innerHTML = '';
  for (var i = 0; i < clothingList.length; i++) {
    let typeID = clothingList[i].type.split('%')[1];

    var listItem = document.createElement('div');
    listItem.className = 'clothesListItem';
    listItem.setAttribute('data', i);

    // Icon
    let listIcon = document.createElement('object');
    listIcon.className = 'clothesListIcon';
    listIcon.data = referenceTable.clothingIconPaths[Number(typeID)];
    listIcon.setAttribute(
      'onload',
      "for (let i=0; i<this.contentDocument.querySelectorAll('path').length; i++) {this.contentDocument.querySelectorAll('path')[i].setAttribute('fill', '" +
        clothingList[i].colour +
        "')};"
    );
    listItem.appendChild(listIcon);

    let textHolder = document.createElement('div');

    // Name
    let listName = document.createElement('p');
    listName.className = 'clothesListName';
    listName.innerHTML = clothingList[i].name;
    textHolder.appendChild(listName);

    // Details
    let detailsHolder = document.createElement('div');
    detailsHolder.className = 'clothesListDetails';

    // Brand
    let listBrand = document.createElement('p');
    listBrand.className = 'clothesListBrand';
    listBrand.innerHTML = clothingList[i].brand;
    detailsHolder.append(listBrand);

    // Size
    let listSize = document.createElement('p');
    listSize.className = 'clothesListSize';
    listSize.innerHTML = clothingList[i].size;
    detailsHolder.append(listSize);

    // Source
    let listSource = document.createElement('p');
    listSource.className = 'clothesListSource';
    listSource.innerHTML = getFullName(clothingList[i].source);
    detailsHolder.append(listSource);

    textHolder.appendChild(detailsHolder);

    listItem.appendChild(textHolder);

    // Remove Button
    let deleteBTN = document.createElement('div');
    deleteBTN.id = 'rmItem' + clothingList[i].id;
    deleteBTN.className = 'rmClothesItem';
    deleteBTN.innerHTML = '+';

    listItem.appendChild(deleteBTN);

    document.getElementById('clothingListHolder').appendChild(listItem);
  }
};

document.getElementById('clothingListHolder').addEventListener('click', (e) => {
  if (outfitGrid.length == 8) {
    return;
  }

  if (e.target.classList.contains('clothesListItem')) {
    if (e.target.classList.contains('selectedClothingItem')) {
      // Deselect
      e.target.classList.remove('selectedClothingItem');
      const index = outfitGrid.indexOf(
        clothingList[e.target.getAttribute('data')]
      );
      if (index > -1) {
        outfitGrid.splice(index, 1);
      }
      updateOutfitClothingGrid();
    } else {
      // Select
      e.target.classList.add('selectedClothingItem');
      console.log('Selected: ' + clothingList[e.target.getAttribute('data')]);
      outfitGrid.push(clothingList[e.target.getAttribute('data')]);
      updateOutfitClothingGrid();
    }
  }

  if (
    outfitGrid.length > 0 &&
    document.querySelector('#submitOutfit').classList.contains('disabled')
  ) {
    document.querySelector('#submitOutfit').classList.remove('disabled');
  } else if (outfitGrid.length === 0) {
    document.querySelector('#submitOutfit').classList.add('disabled');
  }
});

let outfitGrid = [];
let submitOutfitDisabled = true;

const updateOutfitClothingGrid = () => {
  if (outfitGrid.length < 1) {
    submitOutfitDisabled = true;
  } else {
    submitOutfitDisabled = false;
  }

  document.getElementById('outfitClothingGrid').innerHTML = '';
  for (var i = 0; i < outfitGrid.length; i++) {
    var typeID = outfitGrid[i].type.replace('%', '');

    let gridItem = document.createElement('div');
    gridItem.id = 'c' + outfitGrid[i].id;
    gridItem.className = 'outfitClothingGridItem';

    let gridItemObject = document.createElement('object');
    gridItemObject.classNAme = 'clothesListIcon';
    gridItemObject.setAttribute(
      'data',
      referenceTable.clothingIconPaths[Number(typeID)]
    );
    gridItemObject.setAttribute(
      'onload',
      "for (let i=0; i<this.contentDocument.querySelectorAll('path').length; i++) {this.contentDocument.querySelectorAll('path')[i].setAttribute('fill', '" +
        outfitGrid[i].colour +
        "')};"
    );

    gridItem.append(gridItemObject);

    document.getElementById('outfitClothingGrid').append(gridItem);
  }
};

var outfitArray = [];

const updateOutfitArray = () => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
      outfitArray = JSON.parse(xhttp.responseText);
      updateCarousel();
      console.log(outfitArray);
    }
  };
  xhttp.open('GET', '/api/getOutfit');
  xhttp.send();
};

const updateCarousel = () => {
  document.getElementById('outfitCarouselHolder').innerHTML = '';
  for (var i = 0; i < outfitArray.length; i++) {
    let outfitID = outfitArray[i].id;

    var carouselItem = document.createElement('div');
    carouselItem.className = 'outfitCarouselCell';
    carouselItem.id = outfitID;

    let outfitDetailsHolder = document.createElement('div');
    outfitDetailsHolder.className = 'outfitDetailsHolder';

    // var outfitName = document.createElement('h1');
    // outfitName.className = 'outfitName';
    // outfitName.innerHTML = outfitArray[i].name || 'Untitled';

    // outfitDetailsHolder.append(outfitName);

    let outfitDelBTN = document.createElement('p');
    outfitDelBTN.className = 'outfitDelBTN';
    outfitDelBTN.id = 'rmOutfit' + String(outfitID);
    outfitDelBTN.innerHTML = '+';

    outfitDetailsHolder.append(outfitDelBTN);

    carouselItem.append(outfitDetailsHolder);

    var carouselItemGrid = document.createElement('div');
    carouselItemGrid.className = 'outfitCarouselCellItemGrid';
    carouselItem.appendChild(carouselItemGrid);

    for (var j = 0; j < outfitArray[i].items.length; j++) {
      let itemOBJ = clothingList.find((x) => x.id === outfitArray[i].items[j]);
      if (!itemOBJ) {
        console.log('Clothing from outfit: ' + outfitArray[i].id + ' missing.');
        removeOutfit(outfitArray[i].id);
        break;
      }
      // console.log(itemOBJ, outfitArray[i].items);
      var carouselCellItem = document.createElement('div');
      carouselCellItem.className = 'outfitCarouselCellItem';

      let carouselCellItemObject = document.createElement('object');
      carouselCellItemObject.className = 'clothesListIcon';
      carouselCellItemObject.data =
        referenceTable.clothingIconPaths[Number(itemOBJ.type.replace('%', ''))];
      carouselCellItemObject.setAttribute(
        'onload',
        "for (let i=0; i<this.contentDocument.querySelectorAll('path').length; i++) {this.contentDocument.querySelectorAll('path')[i].setAttribute('fill', '" +
          itemOBJ.colour +
          "')};"
      );
      carouselCellItem.append(carouselCellItemObject);

      carouselItemGrid.append(carouselCellItem);
    }

    // carouselItem.innerHTML = '<object class="clothesListIcon" data="'+ referenceTable.clothingIconPaths[Number(typeID)] +'" onload="var x = this.contentDocument.querySelectorAll(\'path\'); for(var i=0;i<x.length;i++){x[i].setAttribute(\'fill\', \''+clothingList[i].mainColour+'\')};"></object><p class="clothesListName">'+clothingList[i].name+'</p><div id="rmItem'+ clothingList[i].id +'" class="rmClothesItem">-</div>'

    document.getElementById('outfitCarouselHolder').appendChild(carouselItem);
  }
};

const removeOutfit = (itemID) => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
      // let replyString = JSON.parse(xhttp.responseText);
      // console.log(replyString);
      updateOutfitArray();
    }
  };
  xhttp.open('POST', '/api/rmOutfitItem');
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhttp.send(JSON.stringify({ itemID: itemID }));
};

document
  .querySelector('#outfitCarouselHolder')
  .addEventListener('click', (e) => {
    // console.log(e.target.className);
    if (e.target.className === 'outfitDelBTN') {
      var r = confirm('Are you sure you want to delete this outfit?');
      var id = e.target.id.replace('rmOutfit', '');
      if (r) {
        removeOutfit(id);
      } else {
        return;
      }
    }
  });

document.getElementById('submitOutfit').addEventListener('click', () => {
  if (!submitOutfitDisabled) {
    var data = {
      id: '',
      // name: '',
      items: [],
    };

    // const whiteSpace = new RegExp('^\\s*$');

    // if (whiteSpace.test(document.getElementById('outfitNameInput').value)) {
    //   data.name = 'Unnamed';
    // } else {
    //   data.name = document.getElementById('outfitNameInput').value;
    // }

    for (let i = 0; i < outfitGrid.length; i++) {
      data.items.push(outfitGrid[i].id);
    }

    // ID data collection
    data.id = 'to_be_changed';

    // PUSH data to server
    console.log(data);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        console.log('Added to database successfully');
        updateOutfitArray();
      }
    };
    // console.log(body)
    xhttp.open('POST', '/api/addOutfit');
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(data));
  }
});

// DEV //

loadPage('outfits');

updateClothingArray();
updateOutfitArray();
