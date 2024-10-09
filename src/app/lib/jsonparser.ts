import {infoProps} from "@/app/components/ListBox";

const getInfoCounting = (data : any): infoProps => {
    if (data != null) {
        let result: infoProps = {data: "person", totInPerson: 0, totOutPerson: 0, rawImage: ''};
        result.data = data["primary_text"] ?? "";
        result.totInPerson = data["secondary_text"] == "in" ? 1 : 0;
        result.totOutPerson = data["secondary_text"] == "out" ? 1 : 0;
        result.rawImage = data["image_jpeg"] ?? "";
        return result;
    }

    return {
        data: "person",
        totInPerson: 0,
        totOutPerson: 0,
        rawImage: ''
    }
}

export default  {getInfoCounting};

