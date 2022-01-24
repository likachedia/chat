import data from "./data.json" assert { type: "json" };


export const getData = () => {
    let  dataString = localStorage.getItem("data");
    if(dataString) {
        return JSON.parse(dataString);
    }   
    localStorage.setItem("data", JSON.stringify(data));
    return data;
}