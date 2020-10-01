const resultArea = document.querySelector('.result_container');
const input = document.querySelector('#ipSearch');
const submitBtn = document.querySelector('#submit');
const ipAddress = document.querySelector('.ip_address p');
const ipLocation = document.querySelector('.location p');
const timeZone = document.querySelector('.time_zone p');
const isp = document.querySelector('.isp p');

submitBtn.addEventListener('click', (e)=>{
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
        })
    }
    
})

