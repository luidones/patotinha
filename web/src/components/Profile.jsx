import Toon from './Toon';
import { BodyColors, BodyTypes, HairTypes, HairColors, Directions, TopTypes, BottomTypes, HatTypes, BagTypes } from '../model/ToonModel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PROFILE_KEY = 'patotinha.profile';

export default function Profile() {
    const navigate = useNavigate();
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}');
    
    const [direction, setDirection] = useState(Directions.Down);
    
    const [bodyType, setBodyType] = useState(profile.bodyType || BodyTypes.A);
    const [bodyColor, setBodyColor] = useState(profile.bodyColor || BodyColors.Dark);
    const [hairType, setHairType] = useState(profile.hairType || HairTypes.Type1);
    const [hairColor, setHairColor] = useState(profile.hairColor || HairColors.Black);
    const [topType, setTopType] = useState(profile.topType || TopTypes.None);
    const [topColor, setTopColor] = useState(profile.topColor || null);
    const [bottomType, setBottomType] = useState(profile.bottomType || BottomTypes.None);
    const [bottomColor, setBottomColor] = useState(profile.bottomColor || null);
    const [hatType, setHatType] = useState(profile.hatType || HatTypes.None);
    const [hatColor, setHatColor] = useState(profile.hatColor || null);
    const [bagType, setBagType] = useState(profile.bagType || BagTypes.None);
    const [bagColor, setBagColor] = useState(profile.bagColor || null);
    const [nickname, setNickname] = useState(profile.nickname || '');

    const buildOptions = (o) => Object.keys(o).map(k => <option key={k} value={o[k]}>{k}</option>);

    const bodyTypeOptions = buildOptions(BodyTypes);
    const bodyColorOptions = buildOptions(BodyColors);
    const hairTypeOptions = buildOptions(HairTypes);
    const hairColorOptions = buildOptions(HairColors);

    const buildDependantOptions = (o) => Object.keys(o).map(k => <option key={k} value={k}>{k}</option>);

    const topTypeOptions = buildDependantOptions(TopTypes);
    const topColorOptions = topType.colors && buildOptions(topType.colors);
    
    const bottomTypeOptions = buildDependantOptions(BottomTypes);
    const bottomColorOptions = bottomType.colors && buildOptions(bottomType.colors);
    
    const hatTypeOptions = buildDependantOptions(HatTypes);
    const hatColorOptions = hatType.colors && buildOptions(hatType.colors);
    
    const bagTypeOptions = buildDependantOptions(BagTypes);
    const bagColorOptions = bagType.colors && buildOptions(bagType.colors);

    const rotate = () => {
        if (direction == Directions.Down)
            setDirection(Directions.Left);
        else if (direction == Directions.Left)
            setDirection(Directions.Up);
        else if (direction == Directions.Up)
            setDirection(Directions.Right);
        else if (direction == Directions.Right)
            setDirection(Directions.Down);
    }

    const selectDependant = (t, e, st, sc) => {
        const _type = t[e.target.value];
        const firstColor = _type.colors && Object.keys(_type.colors)[0];

        st(_type);
        sc(firstColor && _type.colors[firstColor]);
    }

    const selectTop = e => selectDependant(TopTypes, e, setTopType, setTopColor);
    const selectBottom = e => selectDependant(BottomTypes, e, setBottomType, setBottomColor);
    const selectHat = e => selectDependant(HatTypes, e, setHatType, setHatColor);
    const selectBag = e => selectDependant(BagTypes, e, setBagType, setBagColor);

    const persistProfile = () => {
        const profile = {
            bodyType, bodyColor,
            hairType, hairColor,
            topType, topColor,
            bottomType, bottomColor,
            hatType, hatColor,
            bagType, bagColor,
            nickname
        };

        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        navigate('/');
    }

    return (
        <div className="profile">
            <div className="outfit">
                <svg className="toon-builder" height={200} width={160} viewBox="-75 -60 150 120">
                    <Toon direction={direction} bodyType={bodyType} bodyColor={bodyColor} hairType={hairType} hairColor={hairColor}
                        topType={topType} topColor={topColor} bottomType={bottomType} bottomColor={bottomColor}
                        hatType={hatType} hatColor={hatColor} bagType={bagType} bagColor={bagColor} />
                    <svg fill="#000000" height="20" width="20" className="rotate" viewBox="0 0 214.367 214.367"
                        x={-70} y={-88} onClick={rotate}>
                        <path d="M202.403,95.22c0,46.312-33.237,85.002-77.109,93.484v25.663l-69.76-40l69.76-40v23.494
                            c27.176-7.87,47.109-32.964,47.109-62.642c0-35.962-29.258-65.22-65.22-65.22s-65.22,29.258-65.22,65.22
                            c0,9.686,2.068,19.001,6.148,27.688l-27.154,12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964,42.716,54.68,0,107.184,0
                            S202.403,42.716,202.403,95.22z"/>
                    </svg>
                </svg>

                <div className="properties">
                    <div>
                        <label>Body Type</label>
                        <select value={bodyType} onChange={e => setBodyType(e.target.value)}>{bodyTypeOptions}</select>
                    </div>
                    <div>
                        <label>Body Color</label>
                        <select value={bodyColor} onChange={e => setBodyColor(e.target.value)}>{bodyColorOptions}</select>
                    </div>
                    <div>
                        <label>Hair Type</label>
                        <select onChange={e => setHairType(e.target.value)}>{hairTypeOptions}</select>
                    </div>
                    <div>
                        <label>Hair Color</label>
                        <select onChange={e => setHairColor(e.target.value)}>{hairColorOptions}</select>
                    </div>
                    <div>
                        <label>Top Type</label>
                        <select onChange={selectTop}>{topTypeOptions}</select>
                    </div>
                    <div>
                        <label>Top Color</label>
                        <select onChange={e => setTopColor(e.target.value)}>{topColorOptions}</select>
                    </div>
                    <div>
                        <label>Bottom Type</label>
                        <select onChange={selectBottom}>{bottomTypeOptions}</select>
                    </div>
                    <div>
                        <label>Bottom Color</label>
                        <select onChange={e => setBottomColor(e.target.value)}>{bottomColorOptions}</select>
                    </div>
                    <div>
                        <label>Hat Type</label>
                        <select onChange={selectHat}>{hatTypeOptions}</select>
                    </div>
                    <div>
                        <label>Hat Color</label>
                        <select onChange={e => setHatColor(e.target.value)}>{hatColorOptions}</select>
                    </div>
                    <div>
                        <label>Bag Type</label>
                        <select onChange={selectBag}>{bagTypeOptions}</select>
                    </div>
                    <div>
                        <label>Bag Color</label>
                        <select onChange={e => setBagColor(e.target.value)}>{bagColorOptions}</select>
                    </div>
                </div>
            </div>
            <input type="text" placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
            <button onClick={persistProfile}>Done!</button>
        </div>
    )
}