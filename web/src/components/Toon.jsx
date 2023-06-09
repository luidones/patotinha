import { useEffect, useState } from "react";
import { Directions, BagTypes, BodyColors, BodyTypes, BottomTypes, HairColors, HairTypes, HatTypes, TopTypes } from "../model/ToonModel";

export default function Toon(props) {
    const [version, setVersion] = useState(0);

    const outfit = {
        bodyType: props.bodyType || BodyTypes.A,
        bodyColor: props.bodyColor || BodyColors.Dark,
        hairType: props.hairType || HairTypes.Type1,
        hairColor: props.hairColor || HairColors.Ginger,
        topType: props.topType || TopTypes.Classy,
        topColor: props.topColor || TopTypes.Classy.colors.Navy,
        bottomType: props.bottomType || BottomTypes.Classy,
        bottomColor: props.bottomColor || BottomTypes.Classy.colors.Navy,
        hatType: props.hatType || HatTypes.None,
        hatColor: props.hatColor,
        bagType: props.bagType || BagTypes.SportyBackpack,
        bagColor: props.bagColor || BagTypes.SportyBackpack.colors.Yellow
    }

    const direction = props.direction || Directions.Down;
    const walking = !!props.walking ? 'walking' : '';
   
    const classNames = `toon ${walking} body-${direction}`;

    const getSprite = (url) =>
        <image height={256} width={256} preserveAspectRatio="xMidYMid slice" href={`/images/avatar/${url}`}/>;

    const bodySprite = getSprite(`bodies/${outfit.bodyType}_${outfit.bodyColor}.png`);

    const hairSprite = outfit.hairType != HairTypes.Bald
                     ? getSprite(`hairs/${outfit.hairType}_${outfit.hairColor}.png`)
                     : getSprite('empty.png');

    const topVariance = outfit.topType.hasVariance ? `_${outfit.bodyType}` : '';
    const topSprite = outfit.topType != TopTypes.None
                    ? getSprite(`tops/${outfit.topType.key}${topVariance}_${outfit.topColor}.png`)
                    : getSprite('empty.png');
    
    const bottomVariance = outfit.bottomType.hasVariance ? `_${outfit.bodyType}` : '';
    const bottomSprite = outfit.bottomType != BottomTypes.None
                       ? getSprite(`bottoms/${outfit.bottomType.key}${bottomVariance}_${outfit.bottomColor}.png`)
                       : getSprite('empty.png');
    
    const hatColor = outfit.hatColor ? `_${outfit.hatColor}` : '';
    const hatSprite = outfit.hatType != HatTypes.None
                    ? getSprite(`hats/${outfit.hatType.key}${hatColor}.png`)
                    : getSprite('empty.png');

    const bagColor = outfit.bagColor ? `_${outfit.bagColor}` : '';
    const bagSprite = outfit.bagType != HatTypes.None 
                    ? getSprite(`bags/${outfit.bagType.key}${bagColor}.png`)
                    : getSprite('empty.png');

    return <svg viewBox="0 0 38 60" width={38} height={60} className={classNames} x={props.x || -19} y={props.y || -30}>
        { bodySprite }
        { bottomSprite }
        { topSprite }
        { bagSprite }
        { hairSprite }
        { hatSprite }
    </svg>
}