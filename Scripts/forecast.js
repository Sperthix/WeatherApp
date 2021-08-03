class Forecast{
    constructor(){
        this.key = 'j5qtYdnKCN2RytrdsfgHeGx5kbu0xxiy';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city){

        const cityDetails = await this.getCity(city);
        const currWeather = await this.getWeather(cityDetails.Key);

        return {cityDetails, currWeather};
    }

    async getCity(city){

        //getting city Key

        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURI + query);
        const data = await response.json();
    
        return data[0];
    }

    async getWeather(cityID){

        //getting weather for city using cityKey

        const query = `${cityID}?apikey=${this.key}`;

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }
}