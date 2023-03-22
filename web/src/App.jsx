import Map from './components/Map';
import Toon2 from './components/Toon2';
import { BodyColors, BodyTypes, HairColors, HairTypes } from "./model/ToonModel";

function App() {
    return (
        <div>
            <h1>hello!</h1>
            {/* <Map /> */}
            <svg className="toonBuild">
                <Toon2 bodyType={BodyTypes.A}  bodyColor={BodyColors.Light} hairType={HairTypes.Type5} hairColor={HairColors.Black} />
            </svg>
        </div>
    )
}

export default App
