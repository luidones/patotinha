import { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Me, Toon } from './Toon';

const TILE_SIZE = 32;

function _calcMapBorders(size) {
    const borders = [];
    const ex = Math.floor(size.x / 2) + 1;
    const ey = Math.floor(size.y / 2) + 1;
    const lx = size.x % 2 == 0 ? -1 : 0;
    const ly = size.y % 2 == 0 ? -1 : 0;

    for (let i = 0; i < size.x + 2; i++) {
        borders.push({ x: ex * -1 + i, y: ey * -1 });
        borders.push({ x: ex * -1 + i, y: ey + ly });
    }

    for (let i = 1; i < size.y + 1; i++) {
        borders.push({ x: ex * -1, y: ey * -1 + i });
        borders.push({ x: ex + lx, y: ey * -1 + i });
    }
    
    return borders;
}

function _calcViewBox(size) {
    const ox = size.x % 2 == 0 ? 2 : 2;
    const oy = size.y % 2 == 0 ? 2 : 2;

    const mapSize = { height: TILE_SIZE * (size.y + oy), width: TILE_SIZE * (size.x + ox) };
    const viewBox = `-${mapSize.width / 2} -${mapSize.height / 2} ${mapSize.width} ${mapSize.height}`;

    return viewBox;
}

function Barrier(props) {
    const ox = props.size.x % 2 == 0 ? (TILE_SIZE / 2) : 0;
    const oy = props.size.y % 2 == 0 ? (TILE_SIZE / 2) : 0;

    return <circle className="barrier" cx={props.x * TILE_SIZE + ox} cy={props.y * TILE_SIZE + oy } r="14" />
}

let socket;
let myId;

function Map(props) {
    const [map, setMap] = useState();
    const [users, setUsers] = useState({});

    useEffect(() => {
        socket = io('localhost:8080');
        socket.on('connect', () => {
            console.log('connected to sockets');
            myId = socket.id;
        });

        socket.on('map', mapData => {
            setMap(mapData);
        });

        socket.on('userEntered', user => {
            if (user.id == myId) console.log('eu cai pra mim aqui');

            setUsers(prevState => {
                const users = Object.assign({}, prevState);
                users[user.id] = user;
                return users;
            });
        });

        socket.on('userDisconnected', user => {
            setUsers(prevState => {
                const users = Object.assign({}, prevState);
                delete users[user.id];
                return users;
            });
        });

        socket.on('userMoved', user => {
            if (user.id == myId) return;

            setUsers(prevState => {
                const users = Object.assign({}, prevState);

                if (users[user.id])
                    Object.assign(users[user.id], user);
                else
                    users[user.id] = user;

                return users;
            });
        });

        () => socket.close();
    }, []);

    if (!map) return;
    
    const obstacles = _calcMapBorders(map.size).concat(map.barriers);

    const triedToMove = (newPosition) => {
        const mayIMove = !obstacles.find(o => o.x == newPosition.x && o.y == newPosition.y)
                      && !Object.values(users).find(u => u.x == newPosition.x && u.y == newPosition.y);

        if (mayIMove)
            socket.emit('userMoved', newPosition);
        
        return mayIMove;
    }
    const viewBox = _calcViewBox(map.size);
    const barriers = obstacles.map(b => {
        return <Barrier key={Math.random()} size={map.size} x={b.x} y={b.y} />
    });

    const toons = Object.values(users)
        .filter(u => u.id != myId)
        .map(u => <Toon key={u.id} size={map.size} x={u.x} y={u.y} d={u.d} />);

    return (
        <svg className="map" viewBox={viewBox}>
            <image x="-192" y="-192" width="384" height="384" href="/sample.png" />
            {/* {barriers} */}
            {toons}
            <Me size={map.size} x={0} y={0} triedToMove={triedToMove} />
        </svg>
    )
}

export default Map