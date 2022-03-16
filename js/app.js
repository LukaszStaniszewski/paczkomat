import {page1ToPage2, page3ToPage1, page3ToPage2, load, changeToEnglish, changeToPolish} from "./selectors.js"
import FormValidator from "./form_validator.js";
import LANGUAGE_PACK from "./language-mock-data.js";

const formValidator1 = (props = LANGUAGE_PACK.polish.pageTwo) => {
    const formValidator = new FormValidator(props)
}

formValidator1()


page3ToPage1.addEventListener("click", () => {
    document.querySelector(".page2").classList.add("hidden")
    document.querySelector(".page3").classList.add("hidden")
    document.querySelector(".page1").classList.remove("hidden")
})

page3ToPage2.addEventListener("click", () => {
    document.querySelector(".page3").classList.add("hidden")
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


const changeLanguage = (language) => {
    formValidator1(LANGUAGE_PACK[language].pageTwo)
    page1ToPage2.innerHTML = LANGUAGE_PACK[language].pageOne.welcome
    page3ToPage1.innerText = LANGUAGE_PACK[language].pageThree.buttonToPageOne
    page3ToPage2.innerText = LANGUAGE_PACK[language].pageThree.buttonToPageTwo
}

changeToEnglish.addEventListener("click", () => {
    changeToPolish.classList.remove("clicked")
    changeToEnglish.classList.add("clicked")
    changeLanguage("english")
})

changeToPolish.addEventListener("click", () => {
    changeToEnglish.classList.remove("clicked")
    changeToPolish.classList.add("clicked")
    changeLanguage("polish")
})