document.addEventListener('DOMContentLoaded', () => {
    // HTML elementlarni tanlash
    const resultArea = document.querySelector('.result_container');
    const input = document.querySelector('#ipSearch');
    const submitBtn = document.querySelector('#submit');
    const ipAddress = document.querySelector('.ip_address p');
    const ipLocation = document.querySelector('.location p');
    const timeZone = document.querySelector('.time_zone p');
    const isp = document.querySelector('.isp p');
    const mapArea = document.querySelector('#mapid');

    // Default IP manzili
    const defaultIP = '185.213.229.92';

    // Boshlang'ich ma'lumotlarni olish uchun funksiya
    function getDefaultInformation() {
        fetch(`https://geo.ipify.org/api/v1?apiKey=at_3DwOjzzOTLtsDUzRYm3214uqxxzBq&ipAddress=${defaultIP}`)
            .then(data => data.json())
            .then(result => {
                // Boshlang'ich natijani ko'rsatish
                ipAddress.textContent = result.ip;
                ipLocation.textContent = `${result.location.city}, ${result.location.region}, ${result.location.country}`;
                timeZone.textContent = result.location.timezone;
                isp.textContent = result.isp;
                resultArea.style.display = "flex";

                // Kartani yangilash
                getMap(result.location.lat, result.location.lng);
            })
            .catch(error => {
                console.error("Ma'lumotlarni olishda xatolik:", error);
            });
    }

    // Boshlang'ich ma'lumotlarni olishni chaqirish
    getDefaultInformation();

    // Submit tugmasi bosilganda
    submitBtn.addEventListener('click', () => {
        // Foydalanuvchi tomonidan kiritilgan yoki boshlang'ich IP manzil
        const targetIP = input.value || defaultIP;

        // API ga so'rov yuborish
        fetch(`https://geo.ipify.org/api/v1?apiKey=at_3DwOjzzOTLtsDUzRYm3214uqxxzBq&ipAddress=${targetIP}`)
            .then(data => data.json())
            .then(result => {
                // Qaytgan natijani ko'rsatish
                ipAddress.textContent = result.ip;
                ipLocation.textContent = `${result.location.city}, ${result.location.region}, ${result.location.country}`;
                timeZone.textContent = result.location.timezone;
                isp.textContent = result.isp;
                resultArea.style.display = "flex";

                // Kartani yangilash
                getMap(result.location.lat, result.location.lng);
            })
            .catch(error => {
                console.error("Ma'lumotlarni olishda xatolik:", error);
            });
    });

    // Boshlang'ich karta obyekti
    var mymap = L.map('mapid').setView([0, 0], 1);
    var marker = L.marker([0, 0]);

    // Karta obyektini yangilash uchun funktsiya
    function getMap(lat, lng) {
        // Xaritalar va qurol
        const tileUrl ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
        const tiles = L.tileLayer(tileUrl, { attribution });
        tiles.addTo(mymap);

        // Karta markaziga o'zgartirish
        mymap.setView([lat, lng], 5);
        marker.setLatLng([lat, lng]).addTo(mymap);
    }

    // Qo'shimcha: Agar boshlang'ich manzilni ishlatmoqchi bo'lsangiz, input qiymatini bosh qo'ying
    input.value = defaultIP;
});
