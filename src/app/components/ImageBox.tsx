import Image from 'next/image';

export interface rawProps {
    raw: string;
    id: string;
}

export default function ImageBoxBase64({raw, id}: rawProps) {
    const base64Image = 'data:image/png;base64,' + raw;
    return (raw == null || raw == "") ?
        <div />
        :
        <div>
            {/*<h1 className="text-gray-500 font-bold">Evidence Image</h1>*/}
            <Image
                key={id}
                src={base64Image}
                alt="Evidence"
                width={300}
                height={200}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
        </div>;
}
