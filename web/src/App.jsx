import Map from './components/Map';
import Toon2 from './components/Toon2';
import { BagTypes, BodyColors, BodyTypes, BottomTypes, HairColors, HairTypes, HatTypes, TopTypes } from "./model/ToonModel";

function App() {
    return (
        <div>
            <h1>hello!</h1>
            {/* <Map /> */}
            <svg className="toonBuild">
                <Toon2
                    bodyType={BodyTypes.B} 
                    bodyColor={BodyColors.Light}
                    hairType={HairTypes.Type1}
                    hairColor={HairColors.Green}
                    topType={TopTypes.TShirt}
                    topColor={TopTypes.TShirt.colors.Black}
                    bottomType={BottomTypes.Jeans}
                    bottomColor={BottomTypes.Jeans.colors.Navy}
                    hatType={HatTypes.Fedora}
                    bagType={BagTypes.SportyBackpack}
                />
            </svg>
        </div>
    )
}

export default App
