import React, {useState} from "react";

import useSound from 'use-sound';

export interface playerProps {
    inPerson: number;
    outPerson: number;
}

export default function AudioPlayer({inPerson, outPerson}: playerProps){
    const [playWav] = useSound('/sounds/notification.wav', {
        volume: 0.50,
    });

    const [canCallFunction, setCanCallFunction] = useState(true);
    const [activeAlarmFunction, setActiveAlarmFunction] = useState(true);

    const handleDeactiveSound = () => {
        if (!activeAlarmFunction) {
            console.log('Function cannot be called yet. Please wait.');
            return;
        }

        setCanCallFunction(false);

        setTimeout(() => {
            setActiveAlarmFunction(true);  // Re-enable the function after the timeout
        }, 120000);  // 60000 ms = 1 minute
    }

    const invokeFunction = () => {
        if (!canCallFunction) {
            console.log('Function cannot be called yet. Please wait.');
            return;
        }

        // Call the function
        console.log('Function called at:', new Date().toLocaleTimeString());

        playWav();

        // Disable further calls
        setCanCallFunction(false);

        // Set timeout to re-enable the function call after 1 minute (60 seconds)
        setTimeout(() => {
            setCanCallFunction(true);  // Re-enable the function after the timeout
        }, 10000);  // 60000 ms = 1 minute
    };

    if (inPerson > 0 || outPerson > 0) {
        if (activeAlarmFunction) {
            invokeFunction();
        }
    }

    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

    const handleStartAudio = () => {
        if (!audioContext) {
            // Create the AudioContext only after user interaction (button click)
            const newAudioContext = new AudioContext();
            setAudioContext(newAudioContext);

            // You can create or resume the AudioContext here
            console.log('AudioContext created:', newAudioContext);
        }

        // Resume the AudioContext (if it's already created)
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('AudioContext resumed after user interaction');
            });
        }
        alert("Alert sound is activated.");
    };



    return (
        <div className="bg-white">
            <div className="ml-64">
                <h2 className="text-blue-600">ALARM SETTING</h2>
                {(audioContext == null) ?
                    <div>
                        <button onClick={handleStartAudio} className="px-10 py-2 bg-green-800 text-white font-bold">
                            Aktifkan Suara Alarm
                        </button>
                    </div>
                    :
                    <div>
                        <button onClick={handleDeactiveSound} className="px-10 py-2 bg-red-800 font-bold text-white">
                            Non-aktifkan Alarm 2 menit.
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
