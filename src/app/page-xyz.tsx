"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import {
    BsFillStopFill,
    BsFillPlayFill,
    // BsSkipForward,
    // BsSkipBackward
} from "react-icons/bs";

export default function Home() {
    const waveformRef = useRef(null);
    let wavesurfer: WaveSurfer;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#34374B",
            progressColor: "#F90",
            url: "/sounds/alert-alarm-1.wav",
            dragToSeek: true,
            width: "35vw",
            hideScrollbar: true,
            normalize: true,
            barGap: 1,
            height: 60,
            barHeight: 20,
            barRadius: 20,
            barWidth: 5,
            autoplay: true,
            // audioContext: context
        });

        wavesurfer.on("finish", () => {
            console.log("song finished");
            // handlePause();
            wavesurfer.play();
        });

        wavesurfer.on("ready", () => {
            console.log("Waveform is ready");
            // wavesurfer.play();
        });

        wavesurfer.on('load', () => {
            console.log("Waveform is load")
            // wavesurfer.play();
        });


        return () => {
            console.log("Waveform is destroyed");
            wavesurfer.destroy();
        };
    }, []);

    const handleStop = () => {
        if (wavesurfer) {
            wavesurfer.stop();
        }
    };
    const handlePause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
            // wavesurfer.play();
        }
    };

    const handleSkipForward = () => {
        if (wavesurfer) {
            wavesurfer.skip(2);
        }
    };
    // const handleSkipBack = () => {
    //     if (wavesurfer) {
    //         wavesurfer.skip(-2);
    //     }
    // };

    return (
        <div className="container">
            <div className="sub-container">
                <Image
                    src="/images/alert.png"
                    width={1000}
                    height={1000}
                    className="audio-image"
                    alt={"atnlie"}
                />
                <div className={"m-4"}></div>

                <div ref={waveformRef} className="wavesurfer-container"/>
                <div className={"m-4"}></div>
                <div className="wavesurfer-controls">
                    {/*<button onClick={handleSkipBack}>*/}
                    {/*    <BsSkipBackward/>*/}
                    {/*</button>*/}
                    <button onClick={handlePause}>
                        <BsFillPlayFill height={200} width={200}/>
                    </button>
                    <button onClick={handleStop}>
                        <BsFillStopFill/>
                    </button>
                    {/*<button onClick={handleSkipForward}>*/}
                    {/*    <BsSkipForward/>*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
}
