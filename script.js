


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

const animatPath = (path, duration) => {
    const length = path.getTotalLength();
    
    // Set transition and dash array/offset using setAttribute for SVG elements
    path.setAttribute('style', 'transition: none');
    path.setAttribute('stroke-dasharray', `${length} ${length}`);
    path.setAttribute('stroke-dashoffset', length);

    // Trigger reflow / repaint
    path.getBoundingClientRect();

    // Set transition properties
    path.setAttribute('style', `transition: stroke-dashoffset ${duration}ms ease-in-out`);
    path.setAttribute('stroke-dashoffset', '0');
}


window.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animatPath(entry.target,1500)
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
            }
        });
    });

    const viewportHeight = window.innerHeight;
    const navBar = document.querySelector(".nav-background")
    const textModules = document.querySelectorAll(".text-content")

    if (navigator.userAgent.indexOf("Firefox") !== -1){
        window.alert("Firefox is not supported")
    }
    
    const paths = document.querySelectorAll("path.hidden");
    paths.forEach((item)=>observer.observe(item));

    document.addEventListener("scroll", (e) => {

        var value = window.scrollY;
        initParallaxEffect(value, viewportHeight);
        const scrollPercentage = (value / viewportHeight) > 1 ? 1 : (value / viewportHeight);
        
        //Interpolate the color between #C2D5B9 and #193F40 based on the scroll percentage
        
        const r = Math.round((25 - 194) * scrollPercentage + 194);
        const g = Math.round((63 - 213) * scrollPercentage + 213);
        const b = Math.round((64 - 185) * scrollPercentage + 185);
        navBar.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        
    })

})
