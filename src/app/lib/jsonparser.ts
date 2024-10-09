import {infoProps} from "@/app/components/ListBox";

const getInfoCounting = (data : any): infoProps => {
    if (data != null) {
        let result: infoProps = {data: "person", totInPerson: 0, totOutPerson: 0};
        result.data = data["primary_text"] ?? "";
        result.totInPerson = data["secondary_text"] == "in" ? 1 : 0;
        result.totOutPerson = data["secondary_text"] == "out" ? 1 : 0;
        return result;
    }

    return {
        data: "person",
        totInPerson: 0,
        totOutPerson: 0
    }
}

const getInfo = (data : any): string | null => {
    if (data != null) {
        return data["primary_text"] ?? "-";
    }

    return "-atnlie-";
}


export default  {getInfoCounting, getInfo};

