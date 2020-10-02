const resultArea = document.querySelector('.result_container');
const input = document.querySelector('#ipSearch');
const submitBtn = document.querySelector('#submit');
const ipAddress = document.querySelector('.ip_address p');
const ipLocation = document.querySelector('.location p');
const timeZone = document.querySelector('.time_zone p');
const isp = document.querySelector('.isp p');

submitBtn.addEventListener('click', (e) =>{
    if(input.value){
        e.preventDefault();
        fetch(`https://geo.ipify.org/api/v1?apiKey=at_3DwOjzzOTLtsDUzRYm3214uqxxzBq&ipAddress=${input.value}`)
        .then(data => {
            return data.json();
        }).then(result => {
            ipAddress.textContent = result.ip;
            ipLocation.textContent = `${result.location.city}, ${result.location.region}, ${result.location.country}`;
            timeZone.textContent = result.location.timezone;
            isp.textContent = result.isp;
            resultArea.style.display = "flex";
            getMap(result.location.lat, result.location.lng);
        })
    }
    
})

function getMap(lat, lng) {
    var mymap = L.map('mapid').setView([lat, lng], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 256,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYXl5YXphaG1lZCIsImEiOiJja2ZydThwemIwajZiMnFsNzU0Zjk1Z3hiIn0.7boUgiEA8oQdDIbw3t66Fg'
    }).addTo(mymap);
    L.marker([lat, lng]).addTo(mymap);
}

