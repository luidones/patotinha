import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ],
    iceCandidatePoolSize: 10
};

const candidates = [];
const peerConnection = new RTCPeerConnection(servers);
let socket;
let candidatesSent = false;

export default function RTC () {
    const [offer, setOffer] = useState();
    
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [localStream, setLocalStream] = useState();
    const [remoteStream, setRemoteStream] = useState();

    useEffect(() => {
        socket = io('localhost:8080');
        socket.on('connect', () => {
            console.log('connected to sockets');
        });

        socket.on('offered', data => {
            console.log('offered: ', data);
            setOffer(data)
        });

        socket.on('answered', data => {
            console.log('answered: ', data);
            if (!peerConnection.currentRemoteDescription) {
                const answerDescription = new RTCSessionDescription(data);
                peerConnection.setRemoteDescription(answerDescription);
                candidatesSent = true;
                socket.emit('candidates', candidates);
            }
        });

        socket.on('candidates', data => {
            console.log('candidates: ', data);
            data.forEach(c => peerConnection.addIceCandidate(c));
            
            if (!candidatesSent) {
                candidatesSent = true;
                socket.emit('candidates', candidates);
            }
        });

        peerConnection.onicecandidate = e => {
            e.candidate && candidates.push(e.candidate);
        };
        
        peerConnection.ontrack = e => {
            console.log('ontrack', e);
            const stream = new MediaStream();
            e.streams[0].getTracks().forEach(track => stream.addTrack(track));
            setRemoteStream(stream);
        };

        () => socket.close();
    }, []);

    useEffect(() => { localVideoRef.current.srcObject = localStream }, [localStream]);
    useEffect(() => { remoteVideoRef.current.srcObject = remoteStream }, [remoteStream]);

    const startWebCam = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
        });

        setLocalStream(stream);
    }

    const createOffer = async () => {
        const offerDescription = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type
        };

        socket.emit('offer', offer);
    }

    const acceptOffer = async () => {
        if (!offer) return;
        
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        const answerDescription = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answerDescription);

        const answer = {
            sdp: answerDescription.sdp,
            type: answerDescription.type
        };

        socket.emit('answer', answer);
    }

    const hangup = () => {

    }

    return <div>
        <button onClick={startWebCam}>Start webcam</button>
        <button onClick={createOffer}>Create offer</button>
        {offer && <button onClick={acceptOffer}>Accept offer</button>}
        <button onClick={hangup}>Hang Up</button>

        <div>
            <h1>You</h1>
            <video autoPlay playsInline ref={localVideoRef}></video>
        </div>
        <div>
            <h1>Friend</h1>
            <video autoPlay playsInline ref={remoteVideoRef}></video>
        </div>
    </div>
}