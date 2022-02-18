const phone = document.querySelector("#phone-number")
const formSubmit = document.querySelector(".validation_screen__form--submit-button")
const delivery = document.querySelector("#delivery-code")
const searchBar = document.querySelector(".search")
const errorMessage = document.querySelector(".validation-screen--error-message")
const page3ToPage1 = document.querySelector(".summary-screen__modal--to-screen-1");
const page3ToPage2 = document.querySelector(".summary-screen__modal--to-screen-2");
const touchPanel = document.querySelector(".validation-screen__touch-panel")

class Numbers {

    constructor() {
      this.phoneNumber = [];
      this.codeNumber = [];

      console.log("phoneNumber:", this.phoneNumber)
    }
  
    setPhoneNumber(number) {
      this.phoneNumber = number;
    }
  
    getPhoneNumber() {
      return this.phoneNumber;
    }

    setCodeNumber(number) {
        this.codeNumber = number;
      }
    
    getCodeNumber() {
        return this.codeNumber;
    }



}
const validData = new Numbers()  


const checkForErrors = (validation, input, name) => {
    if (validation === null || input.length > validation.length) {
        errorMessage.innerText = `${name} musi składać się z samych liczb`
    } else {
        errorMessage.innerText = ""
    }
}


const checkForm2 = (number, name) => {
    const inputValue = number.value;
    const regex = /[0123456789]/g
    const validation = inputValue.match(regex)
    console.log("validation:", validation)
    if( name === "numer telefonu" && validation !== null) {
       const stringToInt = validation.map(e => {
           return parseInt(e)
       })
       validData.setPhoneNumber(stringToInt)      
    } else if ( name === "kod odbioru" && validation !== null) {
        const stringToInt = validation.map(e => {
            return parseInt(e)
        })
        validData.setCodeNumber(stringToInt)
    }  

    checkForErrors(validation, inputValue, name)
    
}

const formReset = () => {
    phone.value = ""
    delivery.value = ""
    validData.setPhoneNumber()
    validData.setCodeNumber()
}


const validation = () => {
    const validPhoneNumber = validData.getPhoneNumber()
    const validCodeNumber = validData.getCodeNumber()
    if (validCodeNumber == undefined || validPhoneNumber == undefined) return;
    console.log(validData.getPhoneNumber())
    if (validPhoneNumber.length == 9 && validCodeNumber.length == 4) {
        formSubmit.disabled = false 
        formSubmit.classList.remove("disabled")
    } else {
        formSubmit.disabled = true 
        formSubmit.classList.add("disabled")
    }
}

const createTouchPanel = () => {

    const buttonNumbers = [0,1,2,3,4,5,6,7,8,9]
    let phoneInputValue = [];
    let codeInputValue = [];
    buttonNumbers.map(numberValue => {
        const panelButton = document.createElement("button")
        panelButton.innerText = `${numberValue}`
        touchPanel.append(panelButton)
        panelButton.addEventListener("click", () => {
            console.log(numberValue)   
            if(phone.value.length < 9) {
                 phone.value += numberValue
                 phoneInputValue.push(numberValue)
                validData.setPhoneNumber(phoneInputValue)
                console.log("getPhoneNumber:", validData.getPhoneNumber())
                console.log(typeof(phoneInputValue))
                console.log("phoneInputValue:", phoneInputValue)
            }
            if (delivery.value.length < 4 && phone.value.length === 9) {
                delivery.value += numberValue 
                codeInputValue.push(numberValue)
                    validData.setCodeNumber(codeInputValue)
            }
            validation()
        })
        
    })
}


phone.addEventListener("keyup", () => {
    const name = "numer telefonu"
    checkForm2(phone, name)
     validation()
})

delivery.addEventListener("keyup", () => {
    const name = "kod odbioru"
    checkForm2(delivery, name)
    validation()   
})


formSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("i can click the button")
    validation() 
    
    const changePageToSummary = () => {
        document.querySelector(".page3").classList.remove("hidden")
        formSubmit.classList.remove("button-loading")
        formReset()
   
    }
    spinner2()
    const promise2 = new Promise((resolve, reject) => {
        document.querySelector(".page1").classList.add("hidden")
        setTimeout(() => {
          resolve(changePageToSummary());
        }, 1500);
      });

      formReset()
      formSubmit.disabled = true 
      formSubmit.classList.add("disabled")
})

page3ToPage1.addEventListener("click", () => {
   
    const goToWelcomeScreen = () => {
        document.querySelector(".page2").classList.add("hidden")
        document.querySelector(".page3").classList.add("hidden")
        document.querySelector(".page1").classList.remove("hidden")
    }
    goToWelcomeScreen()
})

page3ToPage2.addEventListener("click", () => {

    const goToValidationScreen = () => {
        document.querySelector(".page3").classList.add("hidden")
    }
  
    goToValidationScreen()
})


const load = document.querySelector(".spinner")
const page1ToPage2 = document.querySelector(".welcome-screen--button")

page1ToPage2.addEventListener("click", () => {
    
 
        spinner()
        const promise = new Promise((resolve, reject) => {
            document.querySelector(".page1").classList.add("hidden")
            setTimeout(() => {
              resolve(changePage());
            }, 1500);
          });

        const changePage = () => {
            load.classList.add("hidden")
            load.classList.remove("loading")
            document.querySelector(".page2").classList.remove("hidden")
            formReset()
        }
        createTouchPanel()
        validation()
})



const spinner = () => {
   
    load.classList.remove("hidden");
    load.classList.add("loading")
}

const spinner2 = () => {
    formSubmit.classList.remove("hidden")
    formSubmit.classList.add("button-loading")
}
