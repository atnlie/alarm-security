import React, {useState} from "react";

import useSound from 'use-sound';

export interface playerProps {
    inPerson: number;
    outPerson: number;
    isFR: boolean;
    FRStatus: string;
    idReport: string;
}

export default function AudioPlayer({inPerson, outPerson, isFR, FRStatus, idReport}: playerProps){
    const [playWav, {stop}] = useSound('/sounds/notification.wav', {
        volume: 0.85,
        interrupt: true
    });
    const [playAlarm] = useSound('/sounds/alert-alarm-1.wav', {
        volume: 0.85,
        interrupt: true
    });

    const [canCallFunction, setCanCallFunction] = useState(true);
    const [activeAlarmFunction, setActiveAlarmFunction] = useState(true);

    const handleDeactiveSound = () => {
        // if (!activeAlarmFunction) {
        //     console.log('Function cannot be called yet. Please wait.');
        //     return;
        // }

        stop();
        console.log('Hold notification for 2 minutes');
        setActiveAlarmFunction(false);
        alert("Alarm ditunda selama 2 menit.");

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

        console.log("INFO CHECK isFR " + isFR + " FrSTATUS " + FRStatus + " activeAlarmFunction " + activeAlarmFunction + " idReport " + idReport + " inPerson " + inPerson + "\n\n");
        if (isFR && FRStatus == "UNKNOWN" && activeAlarmFunction && idReport == "NFV4-FR") {
            console.log('Kepanggil');
            inPerson=0;
            outPerson=0;
            isFR= false;
            FRStatus="";
            idReport="";
            playAlarm();
        } else if (activeAlarmFunction  && idReport == "NFV4-MPA" && inPerson > 0) {
            // playWav();
            console.log('Detect People counting');
        }

        // Disable further calls
        setCanCallFunction(false);

        // Set timeout to re-enable the function call after 1 minute (60 seconds)
        setTimeout(() => {
            inPerson=0;
            outPerson=0;
            isFR= false;
            FRStatus="";
            idReport="";
            setCanCallFunction(true);  // Re-enable the function after the timeout
        }, 20000);  // 60000 ms = 1 minute
    };

    // if (inPerson > 0 || outPerson > 0) {
    //     if (activeAlarmFunction) {
    //         invokeFunction();
    //     }
    //
    // }

    if (FRStatus == 'UNKNOWN' && idReport == "NFV4-FR") {
        if (activeAlarmFunction) {
            invokeFunction();
        }
    } else if (inPerson > 0 && idReport == "NFV4-MPA") {
        if (activeAlarmFunction) {
            // invokeFunction();
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
        alert("Suara Alert diaktifkan.");
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
                            Non-aktifkan Alarm 2 menit - Status: {(!activeAlarmFunction) ? "Aktif" : "Tidak aktif"}
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
