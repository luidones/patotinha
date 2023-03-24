import Map from './components/Map';
import Toon2 from './components/Toon2';
import RTC from './components/RTC';
import { BagTypes, BodyColors, BodyTypes, BottomTypes, HairColors, HairTypes, HatTypes, TopTypes } from "./model/ToonModel";

function App() {
    return (
        <div>
            <h1>hello!</h1>
            {/* <Map /> */}
            {/* <svg className="toonBuild">
                <Toon2
                    bodyType={BodyTypes.A} 
                    bodyColor={BodyColors.Light}
                    hairType={HairTypes.Type8}
                    hairColor={HairColors.Red}
                    topType={TopTypes.ScarfShirt}
                    topColor={TopTypes.ScarfShirt.colors.Blue}
                    bottomType={BottomTypes.LongSkirt}
                    bottomColor={BottomTypes.LongSkirt.colors.Pink}
                    hatType={HatTypes.Cat}
                    bagType={BagTypes.None}
                />
            </svg> */}

            {/* <RTC /> */}
        </div>
    )
}

export default App
