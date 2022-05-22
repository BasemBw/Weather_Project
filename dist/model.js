class Model {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        this.cityData = []
        const response = await axios.get('/cities');
        this.cityData.push(...response.data.slice())
    }
    async getCityData(city,long,lat) {
        const response = await axios.get(`/city/?city=${city}&long=${long}&lat=${lat}`);
        this.cityData.push(response.data)
    }
    saveCity(cityData) {
        axios.post('/city', { cityData }).then(function (response) {
            console.log("Save succeed!")
        }).catch(function (error) {
            console.log("Error while saving city!")
        })
    }
    removeCity(nameToDelet) {
        axios.delete(`/city/${nameToDelet}`, { nameToDelet }).then(function (response) {
            console.log("delete succeed!")
        }).catch(function (error) {
            console.log("Error while delete city!")
        })
    }
}