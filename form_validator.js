class FormValidator {
    constructor() {
        this.formInputs = []
        this.form = document.querySelector("#form")
        this.newFormInput({formInputSelector: "#phone-number", requiredLength: 3, name: "numer telefonu"})
        this.newFormInput({formInputSelector: "#phone-number2", requiredLength: 3, name: "numer telefonu"})
        this.newFormInput({formInputSelector: "#phone-number3", requiredLength: 3, name: "numer telefonu"})
        this.newFormInput({formInputSelector: "#pickup-code", requiredLength: 4, name: "kod odbioru"})
        this.init()

    }

    newFormInput(props) {
        const formInput = new FormInput(props)
        this.formInputs.push(formInput)
    }

    init() {
        this.form.addEventListener("keyup", e => {
            this.inputValidation()
        })
    }

    inputValidation() {
        const formSubmit = document.querySelector(".validation_screen__form--submit-button")
        const formResults = this.formInputs.map(input => input.validation())

        if(formResults.includes(false)) {
            console.log("Błąd w formularzu")
            formSubmit.disabled = true 
            formSubmit.classList.add("disabled")
        } else {
            console.log("Formularz jest ok");
            formSubmit.disabled = false 
            formSubmit.classList.remove("disabled")
            
        }
    }
}

