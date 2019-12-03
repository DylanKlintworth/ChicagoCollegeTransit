$(document).ready(function(){
    $("#submit-btn").click(function(){ 
        let url = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=1daa1ab0a15c4605a9e5db8f21ec8adc&max=4&outputType=JSON&mapid=";
        let stationNum = getStation();
        console.log(stationNum)
        url += stationNum;
        let add = $("#time-section");
        let stationColors = getStationColors(stationNum);
        console.log("click");
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            let holder = data;
            let arrivals = holder.ctatt.eta;
            for (let i = 0; i < arrivals.length; i++) {
                let arrival = arrivals[i];
                let arrivalStation = arrival.staNm;
                let arrivalDescription = arrival.destNm;
                let arrivalGeneration = new Date(arrival.prdt);
                let arrivalArrival = new Date(arrival.arrT);
                let arrivalTime = Math.abs(arrivalArrival - arrivalGeneration) / 60000;
                let display = $("<div>");
                display.addClass("times");
                display.addClass(stationColors);
                display.append(`<h2>${arrivalStation} Station<h2>`);
                display.append(`<p>Destination: ${arrivalDescription}</p>`);
                display.append(`<p>${arrivalTime} minute(s) until arrival.</p>`);
                add.append(display);
            }
            /*
            let arrival1 = holder.ctatt.eta[0];
            let arrival1Station = arrival1.staNm;
            let arrival1Description = arrival1.destNm;
            let arrival1PredictionTime = new Date(arrival1.prdt);
            let arrival1ArrivalTime = new Date(arrival1.arrT);
            console.log(arrival1Station)
            console.log(arrival1Description);
            let arrivalTime = (arrival1ArrivalTime.getMinutes() - arrival1PredictionTime.getMinutes());
            */
        })
        .catch((error) => {
            console.log(error);
        });
    });
});

function getStation() {
    let station = $("#station-selection").val();
    switch(station) {
        case "loyola":
            return "41300";
            break;
        case "depaul":
            return "41220";
            break;
        case "uic":
            return "40350";
            break;
        default:
            return "41300";
            break;
    }
}

function getStationColors(stationNum){
    switch (stationNum){
        case "41300":
            return "loyola-colors"
            break;
        case "41220":
            return "depaul-colors";
            break;
        case "40350":
            return "uic-colors";
            break;
        default:
            return "times";
            break; 
    }
}