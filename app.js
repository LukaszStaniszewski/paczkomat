const formValidator = new FormValidator()


const formSubmit = document.querySelector(".validation_screen__form--submit-button")

const page3ToPage1 = document.querySelector(".summary-screen__modal--to-screen-1");
const page3ToPage2 = document.querySelector(".summary-screen__modal--to-screen-2");
const page1ToPage2 = document.querySelector(".welcome-screen--button")
const load = document.querySelector(".spinner")




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
        }
})

const spinner = () => {
   
    load.classList.remove("hidden");
    load.classList.add("loading")
}

const submitButtonSpinner = () => {
    formSubmit.classList.remove("hidden")
    formSubmit.classList.add("button-loading")
}
