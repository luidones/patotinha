import Map from './components/Map';
import Toon2 from './components/Toon2';
import { BodyColors, BodyTypes, HairColors, HairTypes } from "./model/ToonModel";

function App() {
    return (
        <div>
            <h1>hello!</h1>
            {/* <Map /> */}
            <svg className="toonBuild">
                <Toon2 bodyType={BodyTypes.B}  bodyColor={BodyColors.Light} hairType={HairTypes.Type4} hairColor={HairColors.Ginger} />
            </svg>
        </div>
    )
}

export default App
