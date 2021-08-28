import './css/clothingItem.css';

class ClothingItem {
  constructor(type, mainColour, subColours) {
    window.self.type = type;
    window.self.mainColour = mainColour;
    window.self.subColours = subColours; 
  }

  render() {
    return(
      <div>
        <h1>{window.self.type}</h1>
      </div>
    )
  }


}

function ClothingItemCollection() {
  let shirt = new ClothingItem('shirt', '#111', ['#222', '#333'])
  let ShirtRender = shirt.render;
  return(
    <div>
      <h1>Clothing Items:</h1>
      <ShirtRender />
    </div>
  )
}



export default ClothingItemCollection;