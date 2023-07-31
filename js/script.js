// is function active menu mobile

function initOpenMenuMobile() {
    const toggle = document.querySelector('.toggle')
    
    function activeToggle(event) {
        if (event.type === 'touchstart') {
            event.preventDefault()
        }
        const menu = document.querySelector('.nav-menu')
        menu.classList.toggle('open')
    }

    toggle.addEventListener('click', activeToggle)
    toggle.addEventListener('touchstart', activeToggle)
}

initOpenMenuMobile()

// is function for slide touch

function initslideTouch() {
    const slider = document.querySelector('.slider-container')
    const slides = Array.from(document.querySelectorAll('.slide'))
    const btns = document.querySelectorAll('.slide a')
    
    btns.forEach((btn)=> btn.addEventListener('click', nextSlides))
    

    let isDragging = true 
    let startPos = 0
    let currentTranslate = 0
    let prevTranslate = 0
    let animationID = 0
    let currentIndex = 0

    slides.forEach((slide,index) => {
        slide.addEventListener('touchstart', touchStart(index))
        slide.addEventListener('touchend', touchEnd)
        slide.addEventListener('touchmove', touchMove)
        
        slide.addEventListener('mousedown', touchStart(index))
        slide.addEventListener('mouseup', touchEnd)
        slide.addEventListener('mouseleave', touchEnd)
        slide.addEventListener('mousemove', touchMove)
    })
    
    window.oncontextmenu = function (event) {
        event.preventDefault()
        event.stopPropagation()
        return false
    }

    function touchStart(index) {
        return function (event) {
            currentIndex = index 
            startPos = getPositionX(event)
            isDragging = true 
            
            animationID = requestAnimationFrame(animation)
            slider.classList.add('grabbing')
        }
    }

    function touchEnd() {
        isDragging = false 
        cancelAnimationFrame(animationID)

        const movedBy = currentTranslate - prevTranslate
        if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

        if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

        setSliderPositionByIndex()

        slider.classList.remove('grabbing')
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event)
            currentTranslate= prevTranslate + currentPosition - startPos
        }
    }

    function nextSlides() {
        currentIndex = (currentIndex + 1) % slides.length
        setSliderPositionByIndex()
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }
    function setSliderPosition() {
        slider.style.transform=`translateX(${currentTranslate}px)`
    }
    function animation() {
        setSliderPosition()
        if (isDragging) requestAnimationFrame(animation)
    }

    function setSliderPositionByIndex() {
        currentTranslate = currentIndex * -window.innerWidth
        prevTranslate = currentTranslate
        setSliderPosition()
    }
    
}

initslideTouch()

// is function scroll naimation

function initScrollAnimation() {
    function showScroll() {
        const elementScroll = document.querySelectorAll('.js-scroll')
        const hatfHeight = window.innerHeight * 0.5
        for (let i = 0; i < elementScroll.length; i++) {
            const elementTop = elementScroll[i].getBoundingClientRect().top
            
            const isElementVisible = (elementTop - hatfHeight) < 0
            if (isElementVisible) {
                elementScroll[i].classList.add('visible')
            } else if (elementScroll[i].classList.contains('visible')){
                elementScroll[i].classList.remove('visible')
            }
        }
    }
    window.addEventListener('scroll', showScroll)
    
}

initScrollAnimation()


// is function number show

function initnumberShow() {
    function animaNumero() {
        const numeros = document.querySelectorAll('[data-numero]')
        numeros.forEach((numero) => {
            const total = +numero.innerText
            const incremento = Math.floor(total / 100)
            let start = 0
            const timer = setInterval(() => {
                start = start + incremento
                numero.innerText = start
                if (start >  total) {
                    numero.innerText = total
                    clearInterval(timer)
                }
            },40 * Math.random())
        })
    }
    
    function handleMutation(mutation) {
        if (mutation[0].target.classList.contains('visible')) {
            observer.disconnect()
            animaNumero()
        }
    }

    const observerTarget = document.querySelector('.numeros')
    const observer = new MutationObserver(handleMutation)
    observer.observe(observerTarget,{attributes:true})
}

initnumberShow()

