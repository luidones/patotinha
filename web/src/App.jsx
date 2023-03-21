import Map from './components/Map'
import { BodyTypes, BodyColors, Toon2, HairTypes, HairColors } from './components/Toon2'

function App() {
    return (
        <div>
            <h1>hello!</h1>
            {/* <Map /> */}
            <svg className="toonBuild">
                <Toon2 bodyType={BodyTypes.B}  bodyColor={BodyColors.Light} hairType={HairTypes.Bald} hairColor={HairColors.White} />
            </svg>
        </div>
    )
}

export default App
