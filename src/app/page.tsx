"use client"

import React, {useState, useMemo} from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import ListBox, {faceRProps, infoProps, personProps} from "@/app/components/ListBox";
import {io} from "socket.io-client";
import jsonparser from "@/app/lib/jsonparser";
import AudioPlayer from "@/app/components/AudioPlayer";
//import ImageBoxBase64 from "@/app/components/ImageBox";

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'CCTV Cameras', href: '#', current: false },
    { name: 'History Report', href: '#', current: false },
    { name: 'Settings', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Page() {
    const [info, setInfo] = useState<infoProps>({
        data: "-",
        totInPerson: 0,
        totOutPerson: 0,
        rawImagePeople: "",
        analyticsIdPeople: "",
        idReport: ""
    });
    const [infoFR, setInfoFR] = useState<faceRProps>({
        analyticsIdFR: "",
        confidenceDetection: "",
        rawImageFR: "",
        status: "",
        idReport: ""
    });
    const [person, setPerson] = useState<personProps>({
        inPerson: 0,
        outPerson: 0,
    });

    const WebSocket = useMemo(() => io("ws://localhost:8900"), []);
    WebSocket.on("connect", () => {
        console.log("Connected!")
    })

    WebSocket.on("message", (message) => {
        const result = jsonparser.getInfoCounting(message);
        if (result.analyticsId == "NFV4-MPA") {
            setPerson({
                inPerson: person.inPerson + result?.totInPerson,
                outPerson: person.outPerson + result?.totOutPerson,
            });
            setInfo({
                data: ("data" in result && result?.data || ""),
                totInPerson:  result?.totInPerson,
                totOutPerson: result?.totOutPerson,
                rawImagePeople: result?.rawImagePeople ?? "",
                analyticsIdPeople: result.analyticsIdPeople,
                idReport: "NFV4-MPA"
            });
        } else if (result.analyticsId == "NFV4-FR") {
            setInfoFR({
                analyticsIdFR: result.analyticsIdFR,
                rawImageFR: result?.rawImageFR ?? "",
                confidenceDetection: result.confidenceDetection,
                status: result.status,
                idReport: "NFV4-FR"
            })
        }


    })

    WebSocket.on("disconnect", () => {
        console.log("disconnected!")
    })


    return (
        <div>
        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton
                            className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden"/>
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block"/>
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-stretch h-500">
                        <div className="flex flex-shrink-0 items-center">
                            <Image
                                alt="PT SISI"
                                src="/atnlie/logo.jpg"
                                className="h-20 w-auto"
                                height={100}
                                width={100}
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4 mt-8">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5"/>
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6"/>
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"/>
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Your Profile
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Sign out
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">


                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>


        </Disclosure>
            <ListBox data={info.data}
                     totInPerson={person.inPerson}
                     totOutPerson={person.outPerson}
                     rawImagePeople={info.rawImagePeople}
                     analyticsIdPeople={info.analyticsIdPeople}
                     analyticsIdFR={infoFR.analyticsIdFR}
                     status={infoFR.status}
                     confidenceDetection={infoFR.confidenceDetection}
                     rawImageFR={infoFR.rawImageFR}
                     analyticsId={info.idReport}
            />
            {/*<ImageBoxBase64 raw={info.rawImage} />*/}
            <div className="pb-"></div>
            <AudioPlayer inPerson={info.totInPerson} outPerson={info.totOutPerson}
                         isFR={infoFR.analyticsIdFR !== undefined} FRStatus={infoFR.status}
                         idReport={infoFR.idReport || info.idReport || ""} />
        </div>
    )
}
