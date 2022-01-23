import data from "./data.json" assert { type: "json" };

// console.log(typeof data);

// export let {currentUser, comments} = data;
// console.log(comments);


export const getData = () => {
    let  dataString = localStorage.getItem("data");
    if(dataString) {
        return JSON.parse(dataString);
    }   
    localStorage.setItem("data", JSON.stringify(data));
    return data;
}