const resultArea = document.querySelector('.result_container');
const input = document.querySelector('#ipSearch');
const submitBtn = document.querySelector('#submit');
const ipAddress = document.querySelector('.ip_address p');
const ipLocation = document.querySelector('.location p');
const timeZone = document.querySelector('.time_zone p');
const isp = document.querySelector('.isp p');
const mapArea = document.querySelector('#mapid');

submitBtn.addEventListener('click', () =>{
    if(input.value){
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

var mymap = L.map('mapid').setView([0, 0], 1);
var marker = L.marker([0, 0]);

function getMap(lat, lng) {
    //making a map and tiles
    const tileUrl ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const tiles = L.tileLayer(tileUrl, {attribution})
    tiles.addTo(mymap)

    mymap.setView([lat, lng], 5)
    marker.setLatLng([lat, lng]).addTo(mymap)
}
