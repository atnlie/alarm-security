import Image from "next/image";
import ImageBoxBase64 from "@/app/components/ImageBox";
import React from "react";

const CctvCameras = [
    {
        id: 1,
        name: 'CCTV Lobby',
        href: '#',
        imageSrc: '/images/cctv-sisi.png',
        imageAlt: "CCTV SISI - Lobby",
        location: 'Lobby Depan',
        status: 'Active',
    },
    {
        id: 2,
        name: 'CCTV Asset\'s Room',
        href: '#',
        imageSrc: '/images/cctv-sisi.png',
        imageAlt: "CCTV SISI - Asset Room",
        location: 'HC Asset',
        status: 'Inactive',
    },
    {
        id: 3,
        name: 'CCTV HC\'s Room',
        href: '#',
        imageSrc: '/images/cctv-sisi.png',
        imageAlt: "CCTV SISI - Asset Room",
        location: 'Human Capital',
        status: 'Inactive',
    },
    {
        id: 4,
        name: 'CCTV Director\'s Room',
        href: '#',
        imageSrc: '/images/cctv-sisi.png',
        imageAlt: "CCTV SISI - Asset Room",
        location: 'Dirut',
        status: 'Inactive',
    },
]

export interface infoProps {
    data: string | null;
    totInPerson: number;
    totOutPerson: number;
    rawImage: string;
}

export default function ListBox({data, totInPerson, totOutPerson, rawImage}: infoProps) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-6">
                <h2 className="text-2xl font-bold tracking-tight text-blue-600">CCTV Cameras</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {CctvCameras.map((cctv) => (
                        <div key={cctv.id} className="group relative">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-82"
                            >
                                {(cctv.id == 1 && rawImage != null) ?
                                    <ImageBoxBase64 raw={rawImage} />
                                    :
                                    <Image
                                        key={cctv.id}
                                        alt={cctv.imageAlt}
                                        src={cctv.imageSrc}
                                        className="h-60 w-full object-cover object-center lg:h-full lg:w-full"
                                        width={500}
                                        height={300}
                                    />
                                }
                            </div>
                            <div key={"atn1" + cctv.id} className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={cctv.href}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {cctv.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{cctv.status}</p>
                                </div>
                                <p className="font-bold text-blue-800">{cctv.location}</p>
                            </div>
                            {cctv.id == 1 ?
                                <div>
                                    <div>
                                        <hr/>
                                        <p className="font-bold text-gray-500">
                                            Info : <span className="text-xl font-bold text-green-800 ml-12"> {data} </span>
                                        </p>
                                        <p className="font-bold text-gray-500">Masuk : <span
                                            className="text-xl font-bold text-red-800 ml-6">{totInPerson}</span></p>
                                        <p className="font-bold text-gray-500">Keluar : <span
                                            className="text-xl font-bold text-purple-800 ml-6">{totOutPerson}</span></p>
                                        <hr/>
                                    </div>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
