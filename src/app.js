import './styles.css'
import { Question } from './question'
import { createModal, isValid } from './utils'
import { getAuthForm } from './auth'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.getElementById('modal-btn')

window.addEventListener('load', Question.renderList)//слушатель на объект виндов (загрузка)

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () =>{
    submitBtn.disabled = isValid(input.value)
})


modalBtn.addEventListener('click', openModal)


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


function openModal(){
    createModal('Авторизация',  getAuthForm())
}