class Renderer {
    constructor() {
        this.source = $('#template').html();
        this.weatherTemplate = Handlebars.compile(this.source);
    }
    getDataMethod(data){
            let object = {cities:data}
            const newHTML = this.weatherTemplate(object);
            $('.weatherCards').html('')
            $('.weatherCards').append(newHTML)
    }
}