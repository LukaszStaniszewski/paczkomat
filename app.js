const phone = document.querySelector("#phone-number")
const formSubmit = document.querySelector(".validation_screen__form--submit-button")
const delivery = document.querySelector("#delivery-code")
const searchBar = document.querySelector(".search")
const errorMessage = document.querySelector(".validation-screen__form--error-message")
const page3ToPage1 = document.querySelector(".summary-screen__modal--to-screen-1");
const page3ToPage2 = document.querySelector(".summary-screen__modal--to-screen-2");


class Numbers {
    constructor() {
      this.phoneNumber = [];
      this.codeNumber = [];
      console.log("phoneNumber:",this.phoneNumber)
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
console.log("validData:", validData)

const showError = (name, number, maxLenght) => {
    if (!!number === false) {
        errorMessage.innerText = `${name} musi składać się z samych liczb`
    } else if (number.length > 2){
        errorMessage.innerText = `${name} musi składać się z ${maxLenght} liczb`
    } else {
        errorMessage.innerText = " "
    }
}


const checkForm2 = (number, name) => {
    const inputValue = number.value;
    const regex = /[0123456789]/g
    const validation = inputValue.match(regex)
    console.log("validation:",validation)
    
    if( name === "numer telefonu") {
       const stringToInt = validation.map(e => {
           return parseInt(e)
       })
       validData.setPhoneNumber(stringToInt)      
    } else if ( name === "kod odbioru") {
        const stringToInt = validation.map(e => {
            return parseInt(e)
        })
        validData.setCodeNumber(stringToInt)
    }   
}

const formReset = () => {
    phone.value = ""
    delivery.value = ""
    validData.setPhoneNumber()
    validData.setCodeNumber()
}


const validation = () => {
const validPhoneNumber = validData.getPhoneNumber()
console.log("validPhoneNumber:",validPhoneNumber)
const validCodeNumber = validData.getCodeNumber()
console.log("validCodeNumber:", validCodeNumber)
if (validPhoneNumber.length == 9 && validCodeNumber.length == 4) {
    formSubmit.disabled = false 
    formSubmit.classList.remove("disabled")
} else {
    formSubmit.disabled = true 
    formSubmit.classList.add("disabled")
}
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