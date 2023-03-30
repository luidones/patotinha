import { useCallback, useEffect, useState } from "react";
import { Directions } from "../model/ToonModel";
import Toon from "./Toon";

const TILE_SIZE = 32;
const SPAWN_POS = { x: -17, y:-24 };
const DIRECTIONS_INCREMENT = {};

DIRECTIONS_INCREMENT[Directions.Down] = { x: 0, y: -1 };
DIRECTIONS_INCREMENT[Directions.Left] = { x: 1, y: 0 };
DIRECTIONS_INCREMENT[Directions.Right] = { x: -1, y: 0 };
DIRECTIONS_INCREMENT[Directions.Up] = { x: 0, y: 1 };

let lastKeyDown;
let movementInterval;

export default function Map() {
    const [mapPos, setMapPos] = useState(SPAWN_POS);
    const [direction, setDirection] = useState(Directions.Up);
    const [walking, setWalking] = useState(false);

    const handleKeyDown = useCallback((e) => {
        if (lastKeyDown == e.keyCode)
            return;
        
        lastKeyDown = e.keyCode;
        
        const p = mapPos;
        const d = e.keyCode == 37 ? Directions.Left
                : e.keyCode == 38 ? Directions.Up
                : e.keyCode == 39 ? Directions.Right
                : e.keyCode == 40 ? Directions.Down
                : null;
                
        setWalking(true);
        setDirection(d);
        clearInterval(movementInterval);
            
        movementInterval = setInterval(() => {
            p.x += DIRECTIONS_INCREMENT[d].x;
            p.y += DIRECTIONS_INCREMENT[d].y;
            setMapPos({ ...p });
        }, 80);
    }, [mapPos]);

    const handleKeyUp = (e) => {
        if (lastKeyDown == e.keyCode) {
            setWalking(false);
            clearInterval(movementInterval);
            lastKeyDown = null;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown]);

    return <section className="map">
        <svg width="100%" height="100%" viewBox="0 0 1280 1024">
            <image className="bg" x={mapPos.x * TILE_SIZE} y={mapPos.y * TILE_SIZE}  width="2560" height="2048" href="images/maps/ic_out.png" />
            <Toon walking={walking} direction={direction} x="50%" y="50%" />
            <image className="fg" x={mapPos.x * TILE_SIZE} y={mapPos.y * TILE_SIZE}  width="2560" height="2048" href="images/maps/ic_out_fg.png" />
        </svg>
    </section>
}