const phone = document.querySelector("#phone-number")
const formSubmit = document.querySelector(".validation_screen__form--submit-button")
const delivery = document.querySelector("#delivery-code")
const searchBar = document.querySelector(".search")
const errorMessage = document.querySelector(".validation-screen__form--error-message")
const page3ToPage1 = document.querySelector(".summary-screen__modal--to-screen-1");
const page3ToPage2 = document.querySelector(".summary-screen__modal--to-screen-2");


const phoneNumberList =[ ];
const codeNumberList = [];


const showError = (name, number, maxLenght) => {
  
    if (isNaN(number)) {
        errorMessage.innerText = `${name} musi składać się z samych liczb`
    } else if (number.length > 2){
        errorMessage.innerText = `${name} musi składać się z ${maxLenght} liczb`
    } else {
        errorMessage.innerText = " "
    }
    
}

const checkForm = (number, errorValue, list, name, maxLenght) => {
    const split2 = number.value.split('')
    split2.forEach((e) => {
        const pInt = parseInt(e)

        if (isNaN(pInt)) {
            showError(name, pInt)
        }  else {
            validNumber(number, errorValue, list, name, maxLenght)
        }
     
    })
}

const validNumber = (number, errorValue, list, name, maxLenght) => {
    const toInt = parseInt(number.value)
    console.log("toInt:", toInt)
    console.log("eerValue", errorValue)
    console.log("list:", list)
    console.log("name", name)
    console.log("maxlength", maxLenght)
    if(toInt > errorValue && list.length < 1) {
        list.push(toInt)
    } else {
        showError(name, toInt, maxLenght)
        list.pop()
    }
}
    


const formReset = () => {
    phone.value = ""
    delivery.value = ""
}


const validation = () => {

    // phoneNumberList.length >= 1 && codeNumberList.length >= 1 ? formSubmit.disabled = false : formSubmit.disabled = true 
    console.log("button disable status:", formSubmit.disabled)
    if (phoneNumberList.length >= 1 && codeNumberList.length >= 1) {
        formSubmit.disabled = false 
        formSubmit.classList.remove("disabled")
    } else {
        formSubmit.disabled = true 
        formSubmit.classList.add("disabled")
    }
    console.log("numbervalidation:", phoneNumberList)
    console.log("delivernumberValidation:", codeNumberList)
    }


phone.addEventListener("keyup", () => {
    const name = "numer telefonu"
    const listName = "phoneNumberList"
    checkForm(phone, 99999999, listName, name, 9)
    
        validation()


     
    
})

delivery.addEventListener("keyup", () => {
    const name = "kod odbioru"
    const listName = "codeNumberList"
    checkForm(delivery, 999, codeNumberList, name, 4)

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

})



const spinner = () => {
   
    load.classList.remove("hidden");
    load.classList.add("loading")
}

const spinner2 = () => {
    formSubmit.classList.remove("hidden")
    formSubmit.classList.add("button-loading")
}