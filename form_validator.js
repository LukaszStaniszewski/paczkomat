class FormValidator {
    constructor() {
        this.formInputs = []
        this.form = document.querySelector("#form")
        this.formButton = document.querySelector(".validation_screen__form--submit-button")
        this.newFormInput({formInputSelector: "#phone-number", requiredLength: 3, name: "numer telefonu"})
        this.newFormInput({formInputSelector: "#phone-number2", requiredLength: 3, name: "numer telefonu"})
        this.newFormInput({formInputSelector: "#phone-number3", requiredLength: 3, name: "numer telefonu"})
        this.newFormInput({formInputSelector: "#pickup-code", requiredLength: 4, name: "kod odbioru"})

        this.init()
        this.submitForm()
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
        const formResults = this.formInputs.map(input => input.validation())

        if(formResults.includes(false)) {
            this.formButton.disabled = true 
            this.formButton.classList.add("disabled")
        } else {
            this.formButton.disabled = false 
            this.formButton.classList.remove("disabled")
            
        }
    }

    submitForm() {
        this.formButton.addEventListener("click", (e) => {
            e.preventDefault()
              
            const goToSummaryPage = () => {
                document.querySelector(".page3").classList.remove("hidden")
                this.formButton.classList.remove("button-loading")
                this.formInputs.map(input => input.inputValueReset())
                this.inputValidation()
           
            }
            submitButtonSpinner()
            new Promise((resolve, reject) => {
                document.querySelector(".page1").classList.add("hidden")
                setTimeout(() => {
                    resolve(goToSummaryPage());
                }, 1500);
            });
        })
    }
    
    
}