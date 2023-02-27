

//пост запрос на firebase
export class Question { 
    static create(question){
        return fetch('https://autoriz-js-app-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
            .then(response => response.json())
            .then(response=> {
                question.id = response.name
                return question
            })
            .then(addToLocalStarage(question))
            .then(Question.renderList)
    }

    static renderList(){
        const questions = getQuestionFromLocalStorage()

        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">Вы пока ничего не спрашивали </div>`

        const list = document.getElementById('list')
        list.innerHTML = html
    }

    static fetch(token){
        if (!token){
            return Promise.resolve(`<p class="error">У вас нет токена<p>`)
        }
        return fetch(`https://autoriz-js-app-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
        .then(response => response.json())
        .then(response=>{
            if(response.error){
                return `<p class="error">${response.error}<p>`
            }

            return response ? Object.keys(response).map(key => ({
                ...response[key],
                id: key
            })) : []
        })
    }
}



//запихиваем в локал сторедж не объкт отдельно а массив который постоянно обновляем
    function addToLocalStarage(question){
        const all = getQuestionFromLocalStorage()
        all.push(question)
        localStorage.setItem('questions' , JSON.stringify(all))
    }

    function getQuestionFromLocalStorage(){
        return JSON.parse(localStorage.getItem('questions')|| '[]')
    }



function toCard(question){
    return  ` 
    <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div> 
    <br>
    `
}