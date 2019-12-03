$(document).ready(function(){
    const url = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=1daa1ab0a15c4605a9e5db8f21ec8adc&mapid=41300&max=1&outputType=JSON";
    $("#submit-btn").click(function(){
        let add = $("#time-section");
        console.log("click");
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            let holder = data;
            console.log(holder);
            let arrival1 = holder.ctatt.eta[0];
            let arrival1Station = arrival1.staNm;
            let arrival1Description = arrival1.destNm;
            let arrival1PredictionTime = new Date(arrival1.prdt);
            let arrival1ArrivalTime = new Date(arrival1.arrT);
            console.log(arrival1Station)
            console.log(arrival1Description);
            let arrivalTime = (arrival1ArrivalTime.getMinutes() - arrival1PredictionTime.getMinutes());
            let display = $("<div>");
            display.addClass("times");
            display.append(`<h2>${arrival1Station} Station<h2>`);
            display.append(`<p>Destination: ${arrival1Description}</p>`);
            display.append(`<p>${arrivalTime} Minute until arrival </p>`);
            add.append(display);
        })
        .catch((error) => {
            console.log(error);
        });
    });
});