


const initParallaxEffect = (scroll_value, viewportHeight) => {
    const start_sensitivity = 2;
    const drop_sensitivity = 0.25;
    const parallax = [
        document.getElementById("sky"),
        document.getElementById("clouds"),
        document.getElementById("birds"),
        document.getElementById("hill_house"),
        document.getElementById("hill_small"),
        document.getElementById("hill_trees"),
        document.getElementById("village"),
    ]
    parallax.forEach((layer, index)=>{
        layer.style.top = scroll_value * (start_sensitivity - (drop_sensitivity * index)) + "px"; //adjust
    })

    document.addEventListener("mousemove", (e)=>{
        const offsetX = (e.clientX - window.innerWidth / 2) / 15;
        const offsetY = (e.clientY - viewportHeight / 1.4) / 15;
        parallax.forEach((layer, index)=>{
            layer.style.transform = `translate(${-offsetX / (index * 1.1)}px, ${-offsetY /(index * 0.5)}px)`;
        })
    })
}

const initCardSlide = (viewportHeight) => {
    const cards = document.querySelectorAll(".texture-card")

    cards.forEach((card)=>{
        if(card.getBoundingClientRect().top -viewportHeight <= 0)
        setTimeout(()=>card.classList.add("card-slide"), 500)
    })
}
window.addEventListener("DOMContentLoaded", () => {

    const viewportHeight = window.innerHeight;
    const navBar = document.querySelector(".nav-background")
    const textModules = document.querySelectorAll(".text-content")

    if (navigator.userAgent.indexOf("Firefox") !== -1){
        window.alert("Firefox is not supported")
    }
    document.addEventListener("scroll", (e) => {
        var value = window.scrollY;

        initParallaxEffect(value, viewportHeight);
        initCardSlide(viewportHeight);
    

        const scrollPercentage = (value / viewportHeight) > 1 ? 1 : (value / viewportHeight);
      
        // Interpolate the color between #C2D5B9 and #193F40 based on the scroll percentage
        const r = Math.round((25 - 194) * scrollPercentage + 194);
        const g = Math.round((63 - 213) * scrollPercentage + 213);
        const b = Math.round((64 - 185) * scrollPercentage + 185);
        navBar.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        const tr = Math.round((194 - 25) * scrollPercentage + 25);
        const tg = Math.round((213 - 63) * scrollPercentage + 63);
        const tb = Math.round((185 - 64) * scrollPercentage + 64);
        navBar.style.color= `rgb(${tr}, ${tg}, ${tb}) !important`


    })

    document.querySelectorAll(".nav-link").forEach((navButton) => {
        navButton.addEventListener("click", (e)=>{
            const visibleTextModule = Array.from(textModules).filter((textModule) => {
                return `#${textModule.id}`===navButton.id
            })[0];
            visibleTextModule.style.display = "block";
        })
    })
    
    
})
