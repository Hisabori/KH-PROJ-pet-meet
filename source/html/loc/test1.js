const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
const base_url = "./data.json";



const getData = async () => {
    const res = await fetch(base_url);
    return res.text();
};

let xhttp = new XMLHttpRequest();
console.log('STEP1');
xhttp.onreadystatechange = function () {
    if(xhttp.readyState == 4 && xhttp.status == 200){
        console.log('STEP2');
        jsonfunc(this.responseText); //this = xhttp
//		jsonfunc(xhttp.responseText); // 둘다 가능
    }
    console.log('STEP4');
}
xhttp.open("GET","./data1.json", true);
xhttp.send();

function jsonfunc( jsonText ) {
    console.log('STEP3');
    let json = JSON.parse(jsonText); // String -> json으로 변환
    console.log('STEP3-1:'+json);
    let txt = "";
    // 접근법 1
    for(i=0; i<json.length; i++){
        console.log('STEP3-2:'+json);
        for(key in json[i]){ // key값 가져오기
            txt += key + ":" + json[i][key];
            console.log('STEP3-3:'+json);
        }
        txt += "<br>";
    }
    //document.getElementById('demo').innerHTML = txt;
    console.log('VALUE:'+txt);
}
