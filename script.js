let navLinks = document.querySelectorAll(".nav-links a")
let cards = document.querySelectorAll(".product-card")
let cats = document.querySelectorAll(".category-card")
let icons = document.querySelectorAll(".nav-icons .icon")
let btns = document.querySelectorAll(".btn-primary, .btn-secondary")

for(let i=0;i<navLinks.length;i++){
    navLinks[i].addEventListener("click",function(){
        for(let j=0;j<navLinks.length;j++){
            navLinks[j].style.color=""
        }
        navLinks[i].style.color="red"
    })
}

for(let i=0;i<cards.length;i++){
    cards[i].addEventListener("mouseover",function(){
        cards[i].style.transform="scale(1.05)"
    })
    cards[i].addEventListener("mouseout",function(){
        cards[i].style.transform=""
    })
    cards[i].addEventListener("mousedown",function(){
        cards[i].style.opacity="0.6"
    })
    cards[i].addEventListener("mouseup",function(){
        cards[i].style.opacity="1"
    })
}

for(let i=0;i<cats.length;i++){
    cats[i].addEventListener("mouseover",function(){
        cats[i].style.border="2px solid pink"
    })
    cats[i].addEventListener("mouseout",function(){
        cats[i].style.border=""
    })
    cats[i].addEventListener("mousedown",function(){
        cats[i].style.background="rgba(255,192,203,0.4)"
    })
    cats[i].addEventListener("mouseup",function(){
        cats[i].style.background=""
    })
}

for(let i=0;i<icons.length;i++){
    icons[i].addEventListener("click",function(){
        icons[i].style.background="lightgray"
    })
    icons[i].addEventListener("mouseover",function(){
        icons[i].style.transform="scale(1.2)"
    })
    icons[i].addEventListener("mouseout",function(){
        icons[i].style.transform=""
    })
}

for(let i=0;i<btns.length;i++){
    btns[i].addEventListener("mousedown",function(){
        btns[i].style.transform="scale(0.9)"
    })
    btns[i].addEventListener("mouseup",function(){
        btns[i].style.transform="scale(1)"
    })
    btns[i].addEventListener("mouseover",function(){
        btns[i].style.opacity="0.7"
    })
    btns[i].addEventListener("mouseout",function(){
        btns[i].style.opacity="1"
    })
}
