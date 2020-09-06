/**
 * @description Projeto de estudo JavaScript
 * @author Cadu Eduardo Santos
 * @date 30/08/2020
 */

 /**
 * Seletores
 */
let age = document.querySelector('#age')
let weigthValue = document.querySelector('#weigthValue')
let heightValue = document.querySelector('#heightValue')
const box = document.querySelector('.box-result')
const alert = document.querySelector('.alert')
let total = 0

const tasks = document.querySelectorAll('.tasks [name=product]')
const result = document.querySelector('.result')
const boxImage = document.querySelector('.box-image')


/**
 * Função mostrar nav bar 
 * Quando houver evento de scroll
 */
const navBg = () => {
    const nav = document.querySelector('nav')
    window.scrollY === 0 ? nav.classList.remove('active') : nav.classList.add('active')
}
window.addEventListener('scroll', navBg)


/**
 * Função animeScroll
 * Quando houver evento de scroll animar eventos adicionando a a class animate
 */
const target = document.querySelectorAll('[data-anime]')
const animationClass= 'animate'

const animeScroll = () => {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4)
    target.forEach(element => {
        if(windowTop > element.offsetTop){
            element.classList.add(animationClass)
        }else{
            element.classList.remove(animationClass)
        }
    })
}
animeScroll()

if(target.length){
    window.addEventListener('scroll', animeScroll)
}

const getImc = event => {
    event.preventDefault()
    validationForm()
    total = Number(weigthValue.value) / Number(heightValue.value.replace(',', '.')) ** 2
    localStorage.setItem('IMC', total.toFixed(2))
    if (heightValue.value === '' || weigthValue.value === '' ) {
        heightValue.classList.add('wrong')
        weigthValue.classList.add('wrong')
        alert.style.display = 'block'
        alert.innerHTML = 'Preencha os campos do peso e altura'
        closeAlertMessage()
    }else{
        render()
    }
}

const closeAlertMessage = () => {
    setTimeout(() => {
        alert.style.display = 'none'
    }, 4000)
}

const validationForm = () => {
    const regex = /[0-9]/
    const regexHeight = regex.test(heightValue.value)
    const regexWeight = regex.test(weigthValue.value)

    age.value > 102 ? age.classList.add('wrong') : age.value
    // regexHeight === false ? alert('Digite uma altura valida') : regexHeight

    if(weigthValue.value > 400  || regexWeight === false){
        weigthValue.classList.add('wrong')
        alert.style.display = 'block'
        alert.innerHTML = 'Insira um peso válido'
        closeAlertMessage()
    }
    if(heightValue.value.replace(',', '.') > 3.00 || regexHeight === false){
        heightValue.classList.add('wrong')
        alert.style.display = 'block'
        alert.innerHTML = 'Insira uma altura válida'
        closeAlertMessage()
    }
}

const limites = [
    {
        descricao: 'Magreza',
        min_value: 0,
        max_value: 18.5,
        function() {
            box.innerHTML = `

                <h1 class="color-text-title">${this.descricao}</h1>
                <h2> IMC < 18.5 | PESO < 47.4 Kg </h2>
                <h3>O seu IMC é <span class="imc-result">${Math.trunc(localStorage.getItem('IMC')) } kg/m2!</span> </h3>
                <h3>Você está abaixo do indice normal, precisa ganhar mais massa.</h3>
                <h3>De acordo com a sua altura de ${heightValue.value} e idade ${age.value} anos, o seu peso deveria ser no mínimo 60 kg.</h3>
            `
        }
    },
    {
        descricao: 'Normal',
        min_value: 18.5,
        max_value: 24.9,
        function(){
            
            box.innerHTML = `
                <h1 class="color-text-title">${this.descricao}</h1>
                <h2> IMC 18.5 a 24.9 | PESO 47.4 a 63.7 Kg </h2>
                <h3>O seu IMC é <span class="imc-result">${localStorage.getItem('IMC')} kg/m2</span>!</h3> 
                <h3>você está dentro do peso adequado</h3>
                <h3>De acordo com a sua altura: ${heightValue.value} e idade ${age.value}, 
                o seu peso pode variar entre 57 kg e 76 kg, por isso continue tendo cuidado com a 
                alimentação e praticando atividade física regularmente para manter o peso e prevenir doenças.</h3>
            `
        }
    },
    {
        descricao: 'SobrePeso',
        min_value: 24.9,
        max_value: 30,
        function() {
            box.innerHTML = `
                <h1 class="color-text-title">${this.descricao}</h1>
                <h2> IMC 24.9 a 30 | PESO 63.7 a 76.8 Kg </h2>
                <h3>O seu IMC é <span class="imc-result">${localStorage.getItem('IMC')} kg/m2 </span> </h3>
                <h3>Você está acima do peso, talvez seja interessante perder 6kg</h3> 
                <h3>De acordo com a sua altura: ${heightValue.value} e idade ${age.value}, 
                o seu peso pode variar entre 47 kg e 64 kg, por isso continue tendo cuidado com 
                a alimentação e praticando atividade física regularmente para manter o peso e prevenir doenças.</h3>
            `
        }
    },
    {
        descricao: 'Obesidade',
        min_value: 30,
        max_value: 80,
        function(){
            
            box.innerHTML = `
            <h1 class="color-text-title">${this.descricao}</h1>
            <h2> IMC > 30 | PESO > 76.8 Kg </h2>
                <h3>O seu IMC é <span class="imc-result">${localStorage.getItem('IMC')} kg/m2 </span> </h3>
                <h3>Você está acima do peso, talvez seja interessante perder 6kg</h3> 
                <h3>De acordo com a sua altura: ${heightValue.value} e idade ${age.value}, 
                o seu peso pode variar entre 60 kg e 81 kg, por isso continue tendo cuidado com a alimentação e 
                praticando atividade física regularmente para manter o peso e prevenir doenças.</h3>
            `
        }
    }
]

const message = () => {
    limites.filter(limit => {
        if(total > limit.min_value && total < limit.max_value){
            return limit.function()
        }
    })
}

const resetFields = e => {
    e.preventDefault()
    boxImage.style.display= 'block'
    box.style.display= 'none'
    age.value = ''
    weigthValue.value = ''
    heightValue.value = ''
    heightValue.classList.remove('wrong')
    weigthValue.classList.remove('wrong')
}

const render = () => {
    boxImage.style.display= 'none'
    box.style.display= 'block'
    message()
}

document.querySelector('#reset').addEventListener('click', resetFields)
document.querySelector('#result').addEventListener('click', getImc)


