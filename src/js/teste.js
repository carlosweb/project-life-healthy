document.addEventListener("DOMContentLoaded", function () {

    const menuIcon = document.querySelector('.lines')
    const menu = document.querySelector('.menu')
  
    menuIcon.addEventListener("click", () => {
        menu.classList.toggle("change")
    })
  
    // how work menu scroll 
    const menuItems = document.querySelectorAll('.menu a[href^="#"')
    const allLinks = document.querySelectorAll('a[href^="#"')
    
    menuItems.forEach(item => {
      item.addEventListener('click', scrollToId)
    })
  
    allLinks.forEach(item => {
      item.addEventListener('click', scrollToId)
    })
  
    function scrollToId(e) {
      const menu = document.querySelector('.menu')
      e.preventDefault()
      const to = getScrollTopByHref(e.target) - 80
      scrollToPosition(to)
      menu.classList.remove("change")
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
  
  
    // how to show navbar with scroll
    window.addEventListener('scroll', () => {
      let navbar = document.getElementById("navbar")
      let top = navbar.offsetTop
      if( window.pageYOffset > top){
        navbar.classList.add("nav-bg")
      }else{
        navbar.classList.remove("nav-bg")
      }
    })
  
    AOS.init({
      duration: 1200,
    })
  })
  
  
  
  
  
  
  
  
  