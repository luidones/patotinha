import { useEffect, useState } from "react";

const TILE_SIZE = 32;

const Directions = {
    Up: 0,
    Right: 1,
    Down: 2,
    Left: 3
}

export function Toon(props) {
    const ox = props.size.x % 2 == 0 ? (TILE_SIZE / 2) : 0;
    const oy = props.size.y % 2 == 0 ? (TILE_SIZE / 2) : 0;
    let odx = 0, ody = 0;

    if (props.d == Directions.Up) ody = -4;
    if (props.d == Directions.Right) odx = 4;
    if (props.d == Directions.Down) ody = 4;
    if (props.d == Directions.Left) odx = -4;

    const dx = props.x * TILE_SIZE + ox + odx;
    const dy = props.y * TILE_SIZE + oy + ody;

    const bx = props.x * TILE_SIZE + ox;
    const by = props.y * TILE_SIZE + oy;

    return <g className="toon">
        <circle className="direction" cx={dx} cy={dy} r="8" />
        <circle className="body" cx={bx} cy={by} r="10" />
    </g>
}

export function Me(props) {
    const [position, setPosition] = useState({
        x: props.x || 0,
        y: props.y || 0,
        d: Directions.Down
    });

    const tryToMove = direction => {
        const movement = {};

        if (direction == position.d) {
            if (direction == Directions.Up)
                movement.y = position.y - 1;
                
            if (direction == Directions.Right)
                movement.x = position.x + 1;

            if (direction == Directions.Down)
                movement.y = position.y + 1;

            if (direction == Directions.Left)
                movement.x = position.x - 1;
        }

        movement.d = direction;

        const newPosition = Object.assign({}, position, movement);
        const wasIEnabledToMove = props.triedToMove(newPosition);
        
        if (wasIEnabledToMove)
            setPosition(newPosition);
    }

    const handleKeyDown = e => {
        switch (e.keyCode) {
            case 37:
                tryToMove(Directions.Left);
                break;
            case 38:
                tryToMove(Directions.Up);
                break;
            case 39:
                tryToMove(Directions.Right);
                break;
            case 40:
                tryToMove(Directions.Down);
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [position]);
    
    return <Toon size={props.size} x={position.x} y={position.y} d={position.d} />
}