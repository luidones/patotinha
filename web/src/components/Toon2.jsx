import { useEffect, useState } from "react";
import { BodyColors, BodyTypes, HairColors, HairTypes, TopTypes, Directions } from "../model/ToonModel";

export default function Toon2(props) {
    const outfit = {
        bodyType: props.bodyType || BodyTypes.A,
        bodyColor: props.bodyColor || BodyColors.Dark,
        hairType: props.hairType || HairTypes.Type1,
        hairColor: props.hairColor || HairColors.Ginger,
        topType: props.topType || TopTypes.ClassyTop,
        topColor: props.topColor || TopTypes.ClassyTop.colors.Navy
    }
    
    const [direction, setDirection] = useState(props.direction || Directions.Down);
    
    const classNames = `body walking body-${direction}`;
    
    const handleKeyDown = e => {
        switch (e.keyCode) {
            case 37:
                setDirection(Directions.Left);
                break;
            case 38:
                setDirection(Directions.Up);
                break;
            case 39:
                setDirection(Directions.Right);
                break;
            case 40:
                setDirection(Directions.Down);
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    const getSprite = (url) =>
        <image height={256} width={256} preserveAspectRatio="xMidYMid slice" href={url}/>;

    const bodySprite = getSprite(`/images/avatar/bodies/${outfit.bodyType}_${outfit.bodyColor}.png`);
    const hairSprite = getSprite(`/images/avatar/hairs/${outfit.hairType}_${outfit.hairColor}.png`);
    const topVariance = outfit.topType.hasVariance ? `_${outfit.bodyType}` : '';
    const topSprite = getSprite(`/images/avatar/tops/${outfit.topType.key}${topVariance}_${outfit.topColor}.png`);

    return <svg viewBox="0 0 36 50" width={36} height={50} className={classNames}>
        { bodySprite }
        { topSprite }
        { hairSprite }
    </svg>
}