

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
            : '<div class="mui--text-headline">Вы пока ничего не спрашивали </div>'
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
    
}