$(document).ready(function(){
    const url = "http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=1daa1ab0a15c4605a9e5db8f21ec8adc&mapid=41420&max=2&outputType=JSON";
    $("#submit-btn").click(function(){
        let add = $("#time-section");
        console.log("click");
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
    });
});