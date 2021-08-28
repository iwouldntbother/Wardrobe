import './css/clothingGrid.css';
import {ReactComponent as JacketIcon} from '../icons/Jacket.svg'

function ClothingGrid({size}) {

  let x = Number(size.split('x')[0])
  // let y = Number(size.split('x')[1])

  let scale = String(100 / x)

  // let className = 'gridItem gix-'+{x}+' giy-'+{y}

  return (
    <div className='clothingGrid'>

      <div className='gridItem'
           style={{
             width: scale+'vw',
             height: scale+'vw',
             backgroundColor: randomColour()}}>
        {/* <JacketIcon /> */}
      </div>
    </div>
  )
}

// function getIcon(iconName) {

// }

let randomColour = () => {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

const clothingTypeLookup = ['T-Shirt','Shirt','Trousers']

class ClothingItem {
  constructor(id, mainColour, subColours) {
    this.id = id || '';
    this.mainColour = mainColour || '';
    this.subColours = subColours || [];
  }

  addSubcolour(colour) {
    this.subColours.append(String(colour))
  }

  getType() {
    let type = clothingTypeLookup[Number(this.id.split('%')[1])];
    return !type ? 'error' : type;
  }

}

let TestItem = new ClothingItem('%01%0001', '#256207', ['#459102', '#298037'])

console.log(TestItem);
console.log(TestItem.getType());

export default ClothingGrid;