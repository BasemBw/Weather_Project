const model = new Model()
const render = new Renderer()

async function loadPage(){
    await model.getDataFromDB()
    getLocation()
    let cityArray = model.cityData
    render.getDataMethod(cityArray)
}

async function renderPage(){
    let cityArray = model.cityData
    render.getDataMethod(cityArray)
}

async function handleSearch(){
    let city = $("input").val()
    if(validator.isAlpha(city)&&city!="City"){
        await model.getCityData(city.toLowerCase())
        render.getDataMethod(model.cityData)
    }else{
        alert("Error City name!")
    }
}

$(".weatherCards").on("click", ".plus-button", function () {
    let cityDataObject = {
        name:$(this).closest(".weather").find(".name").text(),
        temperature:$(this).closest(".weather").find(".temperature").text(),
        condition:$(this).closest(".weather").find(".condition").text(),
        conditionPic:$(this).closest(".weather").find(".conditionPic").attr("alt"),
        exists:true
    }
    model.saveCity(cityDataObject)
    $(this).html("-")
})

$(".weatherCards").on("click", ".minus-button", function () {
    let nameToDelet = $(this).closest(".weather").find(".name").text()
    model.removeCity(nameToDelet)
    $(this).html("+")
})

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showLocation);
    } else { 
      alert = "Geolocation is not supported by this browser.";
    }
}

async function showLocation(position) {
    await model.getCityData(undefined,position.coords.latitude,position.coords.longitude)
    render.getDataMethod(model.cityData)
}

loadPage()