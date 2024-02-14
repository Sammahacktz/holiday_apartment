
var parallax = [
    document.getElementById("sky"),
    document.getElementById("clouds"),
    document.getElementById("birds"),
    document.getElementById("hill_house"),
    document.getElementById("hill_small"),
    document.getElementById("hill_trees"),
    document.getElementById("village"),
]

const cardTiming = 500

window.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".texture-card")


    if (navigator.userAgent.indexOf("Firefox") !== -1){
        window.alert("Firefox is not supported")
    }
    window.addEventListener("scroll", (e) => {
        var value = window.scrollY;
        var start_sensitivity = 2;
        var drop_sensitivity = 0.25;
        parallax.forEach((layer, index)=>{
            layer.style.top = value * (start_sensitivity - (drop_sensitivity * index)) + "px"; //adjust
        })
        

        cards.forEach((card)=>{
            console.log(value + " test " + card.getBoundingClientRect().top)
            if(value >= card.getBoundingClientRect().top)
            setTimeout(()=>{
                card.classList.add("card-slide")
            },0)
        })

    })
    
    window.addEventListener("mousemove", (e)=>{
        const offsetX = (e.clientX - window.innerWidth / 2) / 15;
        const offsetY = (e.clientY - window.innerHeight / 1.4) / 15;
        parallax.forEach((layer, index)=>{
            layer.style.transform = `translate(${-offsetX / (index * 1.1)}px, ${-offsetY /(index * 0.5)}px)`;
        })
    })
})
