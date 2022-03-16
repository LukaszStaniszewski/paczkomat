import { errorMessage } from "./selectors.js"

export default class FormInput {

    constructor({formInputSelector, requiredLength, name, languagePack}) {
        this.formInput = document.querySelector(formInputSelector)
        this.length = requiredLength
        this.name = name      
        this.languagePack = languagePack 
    }

    validation() {
        if(!this.checkInputData()) return false
            return true 
    }
    
    checkInputData() {
        if(!this.formInput.value.length) return false
        const regex = /^\d+$/;
        if(regex.test(this.formInput.value.trim()) && this.length == this.formInput.value.length) {
            this.showSuccess()
            return true
        } else if (!regex.test(this.formInput.value.trim())) {
            this.showError(`${this.name} ${this.languagePack.errorMessage}`)
            return false
        } else {
            this.reset
            return false
        }
        
    }

    reset()  {
        errorMessage.innerText = ""
        this.formInput.classList.remove("error")
        this.formInput.classList.remove("success")
    }

    showSuccess() {
        this.formInput.classList.remove("error")
        this.formInput.classList.add("success")
    }

    showError(message) {
        errorMessage.innerText = message
        this.formInput.classList.remove("success")
        this.formInput.classList.add("error")
        
    }

    inputValueReset() {
        this.formInput.value = "";
        this.formInput.classList.remove("success");
        errorMessage.innerText = ""
    }

}