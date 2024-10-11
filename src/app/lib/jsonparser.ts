import {faceRProps, idProps, infoProps} from "@/app/components/ListBox";

const getInfoCounting = (data : any): infoProps & faceRProps & idProps => {
    if (data != null) {
        let result: infoProps & faceRProps & idProps = {
            data: "person", totInPerson: 0, totOutPerson: 0, rawImagePeople: '', analyticsIdPeople: ''
            , status:'', confidenceDetection:'', rawImageFR: '', analyticsId: '', idReport: ''
        };
        result.data = data["primary_text"] ?? "";
        result.totInPerson = data["secondary_text"] == "in" ? 1 : 0;
        result.totOutPerson = data["secondary_text"] == "out" ? 1 : 0;
        result.rawImagePeople = data["analytic_id"] != "NFV4-FR" ? data["image_jpeg"] : "";
        result.rawImageFR = data["analytic_id"] == "NFV4-FR" ? data["image_jpeg"] : "";
        result.analyticsIdPeople = data["analytic_id"] != "NFV4-FR" ? data["analytic_id"] : ""
        result.analyticsIdFR = data["analytic_id"] == "NFV4-FR" ? data["analytic_id"] : "";
        result.confidenceDetection =  data["analytic_id"] == "NFV4-FR" ? data["pipeline_data"]["confidence_detection"] : "";
        result.analyticsId = data["analytic_id"] == "NFV4-FR" ? "NFV4-FR" : "NFV4-MPA";
        result.status = data["analytic_id"] == "NFV4-FR" ? data["primary_text"] : "";
        return result;
    }

    return {
        data: "person",
        totInPerson: 0,
        totOutPerson: 0,
        rawImagePeople: '',
        analyticsIdPeople: '',
        analyticsIdFR: '',
        status: '',
        rawImageFR: '',
        confidenceDetection: '0.0',
        analyticsId: ''
    }
}

export default  {getInfoCounting};

