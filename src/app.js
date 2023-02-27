import './styles.css'
import { Question } from './question'
import { isValid } from './utils'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')



form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () =>{
    submitBtn.disabled = isValid(input.value)
})



function submitFormHandler(event){
    event.preventDefault()
   
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true
        // асинхронный запрос на сервер чтобы сохранить запрос
        Question.create(question).then( ()=>{
            input.value=''
            input.className = ''
            submitBtn.disabled = false
        })

    

     
}
