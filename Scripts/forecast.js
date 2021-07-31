const key = 'j5qtYdnKCN2RytrdsfgHeGx5kbu0xxiy';

//getting city Key
const getCity = async city => {
    const base  = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

}

//getting weather for city using cityKey
const getWeather = async cityID => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityID}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

}

// getCity('')
//     .then(data => getWeather(data.Key))
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

