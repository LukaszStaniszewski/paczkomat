class FormInput {
    constructor({formInputSelector, requiredLength, name}) {
        this.formInput = document.querySelector(formInputSelector)
        this.id = this.formInput.id
        this.length = requiredLength
        this.name = name       
    }

    validation() {
        if(!this.checkInputData()) return false
            return true 
    }
    
    checkInputData() {
        if(!this.formInput.value.length) return false
        const regex = /^\d+$/;
        console.log(regex.test(this.formInput.value.trim()))
        if(regex.test(this.formInput.value.trim()) && this.length == this.formInput.value.length) {
            this.showSuccess()
            return true
        } else if (!regex.test(this.formInput.value.trim())) {
            this.showError(`${this.name} musi się składać z samych liczb`)
            return false
        } else {
            this.reset("")
            return false
        }
        
    }

    reset(message)  {
        const errorMessage = document.querySelector(".validation-screen--error-message")
        errorMessage.innerText = message
        this.formInput.classList.remove("error")
        this.formInput.classList.remove("success")
    }

    showSuccess() {
        this.formInput.classList.remove("error")
        this.formInput.classList.add("success")
    }

    showError(message) {
        const errorMessage = document.querySelector(".validation-screen--error-message")
        errorMessage.innerText = message
        this.formInput.classList.remove("success")
        this.formInput.classList.add("error")
        
    }

}