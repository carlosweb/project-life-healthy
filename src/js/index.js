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

// --------------------------------------------------------------------


const getImc = event => {
    validationForm()
    total = Number(weigthValue.value) / Number(heightValue.value.replace(',', '.')) ** 2
    localStorage.setItem('IMC', total.toFixed(2))
    if (heightValue.value === '' && weigthValue.value === '' ) {
        heightValue.classList.add('wrong')
        weigthValue.classList.add('wrong')
        alert.style.display = 'block'
        alert.innerHTML = '<i class="fas fa-exclamation-circle"></i> Preencha os campos do peso e altura'
        closeAlertMessage()
    }else{
        render()
    }
}

const validationForm = () => {
    const regex = /[0-9]/
    const regexHeight = regex.test(heightValue.value)
    const regexWeight = regex.test(weigthValue.value)


    if(age.value > 105){
        age.classList.add('wrong')
        alert.style.display = 'block'
        alert.innerHTML = '<i class="fas fa-exclamation-circle"></i> Insira uma idade válida'
        closeAlertMessage()
    }

    if(weigthValue.value > 400  || regexWeight === false){
        weigthValue.classList.add('wrong')
        alert.style.display = 'block'
        alert.innerHTML = '<i class="fas fa-exclamation-circle"></i> Insira um peso válido'
        closeAlertMessage()
    }
    if(heightValue.value.replace(',', '.') > 3.00 || regexHeight === false){
        heightValue.classList.add('wrong')
        alert.style.display = 'block'
        alert.innerHTML = ' <i class="fas fa-exclamation-circle"></i> Insira uma altura válida'
        closeAlertMessage()
    }
}

const closeAlertMessage = () => {
    setTimeout(() => {
        alert.style.display = 'none'
    }, 5000)
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

const resetFields = () => {
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


// how work menu scroll 
// const menuItems = document.querySelectorAll('.menu a[href^="#"')
const allLinks = document.querySelectorAll('a[href^="#"')

// menuItems.forEach(item => {
//   item.addEventListener('click', scrollToId)
// })

allLinks.forEach(item => {
  item.addEventListener('click', scrollToId)
})

function scrollToId(e) {
  e.preventDefault()
  const to = getScrollTopByHref(e.target) - 80
  scrollToPosition(to)
}

// get position
function scrollToPosition(to) {
  // window.scroll( {
  //   top: to,
  //   behavior: "smooth",
  // })
  smoothScrollTo(0, to)
}

// get href
function getScrollTopByHref(element) {
  const id = element.getAttribute('href')
  return document.querySelector(id).offsetTop
}

// support all old browsers 
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

const form = document.querySelector('.form')

form.addEventListener('submit', event => {
    event.preventDefault()
    if(event.target === true){
        console.log(event.target)
    }else{
        // console.log(box.offsetTop)
        scrollTo({
            top: 1050,
            behavior: 'smooth'
            })
        getImc()
    }
})


document.querySelector('#reset').addEventListener('click', resetFields)
