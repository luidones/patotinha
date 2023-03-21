import { useEffect, useState } from "react";

export const BodyTypes = { A: 'a', B: 'b' };
export const BodyColors = { Dark: 'dark', Light: 'light', Medium: 'medium', Pale: 'pale' };
export const Directions = { Up: 'up', Right: 'right', Down: 'down', Left: 'left' };
export const HairTypes = { Bald: 'bald', Type1: '1', Type2: '2', Type3: '3', Type4: '4', Type5: '5', Type6: '6', Type7: '7', Type8: '8' };
export const HairColors = {
    Black: 'black',
    Blond: 'blond',
    Blue: 'blue',
    Brown: 'brown',
    Cyan: 'cyan',
    Ginger: 'ginger',
    Green: 'green',
    Pink: 'pink',
    Purple: 'purple',
    Red: 'red',
    White: 'white'
};

export function Toon2(props) {
    const bodyType = props.bodyType || BodyTypes.A;
    const bodyColor = props.bodyColor || BodyColors.Dark;
    const hairType = props.hairType || HairTypes.Type1;
    const hairColor = props.hairColor || HairColors.Ginger;
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

    return <svg viewBox="0 0 36 50" width={36} height={50}>
        <image className={classNames} height={256} width={256} preserveAspectRatio="xMidYMid slice" href={`/images/avatar/bodies/${bodyType}_${bodyColor}.png`}/>
        { hairType != HairTypes.Bald && <image className={classNames} height={256} width={256} preserveAspectRatio="xMidYMid slice" href={`/images/avatar/hairs/${hairType}_${hairColor}.png`}/>}
    </svg>
}