/**
 * @description Projeto de estudo JavaScript
 * @author Cadu Eduardo Santos
 * @date 30/08/2020
 */

/**
 * Seletores usandos no render
 */
const buttonsChosse = document.querySelectorAll('.bt-goal')
const areaProfessional = document.querySelector('.buttons-professional')

/* variavel do json */
const url = './professionals.json'


/**
 * Adicionando class .active nos botões
 */
buttonsChosse.forEach(bt => {
    bt.addEventListener('click', function () {
        buttonsChosse.forEach(btn => btn.classList.remove('active'))
        this.classList.add('active')

    })
})

/**
 * Obtendo dados do json
 */

const getDataUser = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const users = data
    return users
}

/**
 * Função Perder Peso 
 * pega todos os profissionais selecionados no if pela especialidade
 */

const loseWeight = async () => {
    areaProfessional.innerHTML = ''
    const user = await getDataUser()
    user.forEach(({image, name, specialty, email, socialMedia }) => {

        if (specialty === 'Nutricionista') {

            const html = `
        <div class="bt-professional">
                <img src="${image}"alt="">
                <h3>${name}</h3>
                <h4>Especialidade</h4>
                <p>${specialty}</p>
                <h4>Email</h4>
                <p>${email}</p>
                <h4>Rede Social</h4>
                <ul>
                    <li><a href="${socialMedia.facebook}"><i class="fab fa-facebook-square fa-2x"></i></a></li>
                    <li><a href="${socialMedia.instagram}"><i class="fab fa-instagram fa-2x"></i></a></li>
                    <li><a href="${socialMedia.whats}"><i class="fab fa-whatsapp-square fa-2x"></i></a></li>
                    <li><a href="${socialMedia.youtube}"><i class="fab fa-youtube-square fa-2x"></i></a></li>
                </ul>
        </div>
        `
            areaProfessional.innerHTML += html
        }
    })
}

/**
 * Função ganhar massa 
 * pega todos os profissionais selecionados no if pela especialidade
 */
const earnMuscle = async () => {
    areaProfessional.innerHTML = ''
    const user = await getDataUser()
    user.forEach(({image, name, specialty, email, socialMedia }) => {
        if (specialty === 'BodyBuilder') {

            const html = `
        <div class="bt-professional">
                <img src="${image}"alt="">
                <h3>${name}</h3>
                <h4>Especialidade</h4>
                <p>${specialty}</p>
                <h4>Email</h4>
                <p>${email}</p>
                <h4>Rede Social</h4>
                <ul>
                    <li><a href="${socialMedia.facebook}"><i class="fab fa-facebook-square fa-2x"></i></a></li>
                    <li><a href="${socialMedia.instagram}"><i class="fab fa-instagram fa-2x"></i></a></li>
                    <li><a href="${socialMedia.whats}"><i class="fab fa-whatsapp-square fa-2x"></i></a></li>
                    <li><a href="${socialMedia.youtube}"><i class="fab fa-youtube-square fa-2x"></i></a></li>
                </ul>
        </div>
        `
            areaProfessional.innerHTML += html
        }
    })
}

/**
 * Função definição
 * pega todos os profissionais selecionados no if pela especialidade
 */
const burnFat = async () => {
    areaProfessional.innerHTML = ''
    const user = await getDataUser()
    user.forEach(({image, name, specialty, email, socialMedia }) => {
        if (specialty === 'Instrutor') {

            const html = `
        <div class="bt-professional">
                <img src="${image}"alt="">
                <h3>${name}</h3>
                <h4>Especialidade</h4>
                <p>${specialty}</p>
                <h4>Email</h4>
                <p>${email}</p>
                <h4>Rede Social</h4>
                <ul>
                    <li><a href="${socialMedia.facebook}"><i class="fab fa-facebook-square fa-2x"></i></a></li>
                    <li><a href="${socialMedia.instagram}"><i class="fab fa-instagram fa-2x"></i></a></li>
                    <li><a href="${socialMedia.whats}"><i class="fab fa-whatsapp-square fa-2x"></i></a></li>
                    <li><a href="${socialMedia.youtube}"><i class="fab fa-youtube-square fa-2x"></i></a></li>
                </ul>
        </div>
        `
            areaProfessional.innerHTML += html
        }
    })
}


/**
 * Função cuidados com o corpo
 * pega todos os profissionais selecionados no if pela especialidade
 */
const bodyCare = async () => {

    areaProfessional.innerHTML = ''
    const user = await getDataUser()
    user.forEach(({image, name, specialty, email, socialMedia }) => {
        if (specialty === 'Esteticista') {

            const html = `
        <div class="bt-professional">
                <img src="${image}"alt="">
                <h3>${name}</h3>
                <h4>Especialidade</h4>
                <p>${specialty}</p>
                <h4>Email</h4>
                <p>${email}</p>
                <h4>Rede Social</h4>
                <ul>
                    <li><a href="${socialMedia.facebook}"><i class="fab fa-facebook-square fa-2x"></i></a></li>
                    <li><a href="${socialMedia.instagram}"><i class="fab fa-instagram fa-2x"></i></a></li>
                    <li><a href="${socialMedia.whats}"><i class="fab fa-whatsapp-square fa-2x"></i></a></li>
                    <li><a href="${socialMedia.youtube}"><i class="fab fa-youtube-square fa-2x"></i></a></li>
                </ul>
        </div>
        `
            areaProfessional.innerHTML += html
        }
    })
}

document.querySelector('#loseWeight').addEventListener('click', loseWeight, scrollToId)
document.querySelector('#earnMuscle').addEventListener('click', earnMuscle)
document.querySelector('#burnFat').addEventListener('click', burnFat)
document.querySelector('#bodyCare').addEventListener('click', bodyCare)



