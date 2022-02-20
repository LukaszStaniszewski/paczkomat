const formSubmit = document.querySelector(".validation_screen__form--submit-button")

const page3ToPage1 = document.querySelector(".summary-screen__modal--to-screen-1");
const page3ToPage2 = document.querySelector(".summary-screen__modal--to-screen-2");
const page1ToPage2 = document.querySelector(".welcome-screen--button")
const changeToEnglish = document.querySelector(".welcome-screen--switch-to-english")
const changeToPolish = document.querySelector(".welcome-screen--switch-to-polish")
const load = document.querySelector(".spinner")
const message = document.querySelector(".validation-screen--error-message")

const formValidator1 = (props = languagePack.polish.pageTwo) => {
    const formValidator = new FormValidator(props)
}

formValidator1()
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
    const randomNumber = Math.random() * (2000 - 1200) + 1200;
        spinner()
        const promise = new Promise((resolve, reject) => {
            document.querySelector(".page1").classList.add("hidden")
            setTimeout(() => {
              resolve(changePage());
            }, randomNumber);
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

const submitButtonSpinner = (msg) => {
    formSubmit.classList.remove("hidden")
    formSubmit.classList.add("button-loading")
    message.innerText = msg
}

changeToEnglish.addEventListener("click", () => {
    changeToPolish.classList.remove("clicked")
    changeToEnglish.classList.add("clicked")
    page1ToPage2.innerHTML = languagePack.english.pageOne.welcome
    formValidator1(languagePack.english.pageTwo)
    page3ToPage1.innerText = languagePack.english.pageThree.buttonToPageOne
    page3ToPage2.innerText = languagePack.english.pageThree.buttonToPageTwo
})

changeToPolish.addEventListener("click", () => {
    changeToEnglish.classList.remove("clicked")
    changeToPolish.classList.add("clicked")
    page1ToPage2.innerHTML = languagePack.polish.pageOne.welcome
    formValidator1(languagePack.polish.pageTwo)
    page3ToPage1.innerText = languagePack.polish.pageThree.buttonToPageOne
    page3ToPage2.innerText = languagePack.polish.pageThree.buttonToPageTwo
})