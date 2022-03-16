import {formSubmit, message} from "./selectors.js"

import FormInput from "./form_input.js"

export default class FormValidator {
    constructor(languagePack) {
        this.languagePack = languagePack
        this.formInputs = []
        this.form = document.querySelector("#form")
        this.formButton = document.querySelector(".validation_screen__form--submit-button")
        this.newFormInput({formInputSelector: "#phone-number", requiredLength: 3, name: languagePack.phoneNumber, languagePack})
        this.newFormInput({formInputSelector: "#phone-number2", requiredLength: 3, name: languagePack.phoneNumber, languagePack} )
        this.newFormInput({formInputSelector: "#phone-number3", requiredLength: 3, name: languagePack.phoneNumber, languagePack})
        this.newFormInput({formInputSelector: "#pickup-code", requiredLength: 4, name: languagePack.pickupCode, languagePack})
        this.formButton.innerText = this.languagePack.submitButton
        this.changeLabelLanguage()
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

    changeLabelLanguage() {
        const phoneNumber = document.querySelectorAll("label")[0]
        const pickupCode = document.querySelectorAll("label")[1]

        phoneNumber.innerText = `${this.languagePack.phoneNumber}:`
        pickupCode.innerText = `${this.languagePack.pickupCode}:`
    }

    inputValidation() {
        const message = document.querySelector(".validation-screen--error-message")

        const formResults = this.formInputs.map(input => input.validation())

        if(formResults.includes(false)) {
            this.formButton.disabled = true 
            this.formButton.classList.add("disabled")
        } else {
            this.formButton.disabled = false 
            this.formButton.classList.remove("disabled")
            message.innerText = this.languagePack.successMessage
            
        }
    }

    submitForm() {
        this.formButton.addEventListener("click", (e) => {
            e.preventDefault()
            const randomNumber = Math.random() * (2000 - 1200) + 1200;

            const goToSummaryPage = () => {
                document.querySelector(".page3").classList.remove("hidden")
                this.formButton.classList.remove("button-loading")
                this.formInputs.map(input => input.inputValueReset())
                this.inputValidation()
           
            }
            submitButtonSpinner(this.languagePack.loadingMessage)
            new Promise((resolve, reject) => {
                document.querySelector(".page1").classList.add("hidden")
                setTimeout(() => {
                    resolve(goToSummaryPage());
                }, randomNumber);
            });
        })
    }
    
    
}

const submitButtonSpinner = (msg) => {
    formSubmit.classList.remove("hidden")
    formSubmit.classList.add("button-loading")
    message.innerText = msg
}
