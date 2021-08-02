const input = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

let previousCity = null;

const updateCity = async city => {
    
    const cityDetails = await getCity(city);
    const currWeather = await getWeather(cityDetails.Key);

    //objekt sa da zapisat aj kratsie, ak su rovnake nazvy aj pre parameter aj hodnotu
    // return {
    //     cityDetails: cityDetails,
    //     currWeather: currWeather
    // };

    return {
        cityDetails,
        currWeather
    };
};

const UpdateUI = data => {

    const cityDetails = data.cityDetails;
    const currWeather = data.currWeather;

    // update infographic

    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${currWeather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${currWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    // update background card

    let timeSrc = null;

    if(currWeather.IsDayTime) timeSrc = 'img/day.svg';
    else timeSrc = 'img/night.svg';

    time.setAttribute('src', timeSrc);

    // update icon
    const iconSrc = `img/icons/${currWeather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // show card for the first time

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

input.addEventListener('submit', e => {
    e.preventDefault();

    // get requested city form input field and reseting it
    const requestedCity = input.city.value.trim();
    localStorage.setItem('city', requestedCity);
    input.reset();


    // updating page with new data
    updateCity(requestedCity)
    .then(data => UpdateUI(data))
    .catch(err => console.log(err));
});


//chceck if there is a stored location
if(localStorage.city){

    previousCity = localStorage.getItem('city');

    updateCity(previousCity)
    .then(data => UpdateUI(data))
    .catch(err => console.log(err));
}