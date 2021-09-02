

const addSubOption = () => {
  var newNo = document.getElementById('clothingSubColours').childElementCount;
  document.getElementById('clothingSubColours').innerHTML += "<div class='subColourHolder' id='subColourHolder"+Number(newNo)+"'><input class='subInput' id='subColourInput"+Number(newNo)+"' type='color'><div class='subColourRM' id='subColourRM"+Number(newNo)+"' onclick='rmSub(this.id)'>-</div></div>"
}

document.getElementById('addSubBTN').addEventListener('click', () => {
  addSubOption();
})

function rmSub(id) {
  var index = id.replace('subColourRM', '')
  document.getElementById('subColourHolder'+index).remove()
}

var selectedItem;
var submitDisabled = true;

function selectItem(item) {
  if (selectedItem) {
    selectedItem.classList.remove('selected')
  } else {
    document.getElementById('submitClothingItem').classList.remove('disabled');
    submitDisabled = false;
  }
  item.classList.add('selected')
  selectedItem = item;
}

document.getElementById('submitClothingItem').addEventListener('click', () => {
  if (!submitDisabled) {

    var data = {
      id: '',
      mainColour: '',
      subColours: []
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
    console.log(subColours);
    data.subColours = subColours;
    
    // PUSH data to server
    console.log(data)

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status === 200) {
        console.log('Added to database successfully')
      }
    }
    // console.log(body)
    xhttp.open('POST', '/api/addClothing');
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));

  }
})