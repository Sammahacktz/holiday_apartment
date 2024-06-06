
const parallax = [
    document.getElementById("sky"),
    document.getElementById("clouds"),
    document.getElementById("birds"),
    document.getElementById("hill_house"),
    document.getElementById("hill_small"),
    document.getElementById("hill_trees"),
    document.getElementById("village"),
]

const initParallaxEffect = (scroll_value) => {
    const start_sensitivity = 2;
    const drop_sensitivity = 0.25;
    parallax.forEach((layer, index)=>{
        layer.style.top = scroll_value * (start_sensitivity - (drop_sensitivity * index)) + "px"; //adjust
    })
}

const initPrallaxOnMouseMove = (viewportHeight) =>{
    document.addEventListener("mousemove", (e)=>{
        const offsetX = (e.clientX - window.innerWidth / 2) / 15;
        const offsetY = (e.clientY - viewportHeight / 1.4) / 15;
        parallax.forEach((layer, index)=>{
            layer.style.transform = `translate(${-offsetX / (index * 1.1)}px, ${-offsetY /(index * 0.5)}px)`;
        })
    })
}
const initBootstrapComponents = () => {
    const CarouselElements = document.querySelectorAll('.ImageCarousel')

    CarouselElements.forEach((carousel) => {
        new bootstrap.Carousel(carousel, {
            interval: 20000,
            touch: true
            })
    })
}

const lerpColor = (color1, color2, t) => {
    const r = Math.round((color1[0] - color2[0]) * t + color2[0]);
    const g = Math.round((color1[1] - color2[1]) * t + color2[1]);
    const b = Math.round((color1[2] - color2[2]) * t + color2[2]);
    return `rgb(${r}, ${g}, ${b})`;
}

const animatPath = (path, duration) => {
    if(!path.classList.contains('hidden')) return;
    const length = path.getTotalLength();
    path.setAttribute('style', 'transition: none');
    path.setAttribute('stroke-dasharray', `${length} ${length}`);
    path.setAttribute('stroke-dashoffset', length);
    path.getBoundingClientRect();
    path.setAttribute('style', `transition: stroke-dashoffset ${duration}ms ease-in-out`);
    path.setAttribute('stroke-dashoffset', '0');
}
const initMailConnection = () => {
    const alertContainer = document.getElementById("alert-container")
    alertContainer.style.visibility = "hidden";

    const toastS = document.getElementById('alert-success');
    const toastF = document.getElementById('alert-error');

    const toastSuccess = bootstrap.Toast.getOrCreateInstance(toastS);
    const toastFailed = bootstrap.Toast.getOrCreateInstance(toastF);

    const hideContainer = () => {
        setTimeout(()=>{
            alertContainer.style.visibility = "hidden";
        }, 6000)
    }

    document.getElementById("submit").addEventListener("click", ()=>{
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        emailjs.send("service_cr6ggjr","template_0kmmqzp",{
            c_name: name,
            c_message: email,
            c_email: message,
        },"017i8UscqUysCUzsQ").then(function(response) {
            alertContainer.style.visibility = "visible";
            toastSuccess.show()
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            hideContainer()
        }, function(error) {
            alertContainer.style.visibility = "visible";
            toastFailed.show()
            hideContainer()
        });
    });
}
var bottom = false;
var animationInProcess = false;

window.addEventListener("DOMContentLoaded", () => {
    initMailConnection()
    const liftCable = document.getElementById("lift");
    const liftImg = document.getElementById("lift-image");
    const viewportHeight = window.innerHeight;
    const navBar = document.querySelector(".nav-background");
    const navBarButtons = document.querySelectorAll(".fewo-nav-links")
    const paths = document.querySelectorAll("path.hidden");
    const textboxes = document.querySelectorAll(".speach");
    const images = document.querySelectorAll(".carousel-item img");
    const modalImage = document.getElementById("modal-image")
    const ImageModalLabel = document.getElementById("ImageModalLabel")
    const navButton = navBar.querySelector("button.navbar-toggler")


    images.forEach((img)=>{
        img.addEventListener("click",()=>{
            modalImage.src=img.src
            ImageModalLabel.innerText=img.alt
        })
    })
    initBootstrapComponents();
    initPrallaxOnMouseMove(viewportHeight);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animatPath(entry.target,1500)
                entry.target.classList.remove("hidden");
                entry.target.classList.add("path-shadow");
            }else{
                entry.target.classList.remove("path-shadow");
            }
        });
    });


    const speachObserver = new IntersectionObserver((tbs) => {
        tbs.forEach((tb) => {
            if (tb.isIntersecting) {
                tb.target.classList.add("show")
                tb.target.parentNode.classList.add("shadow")
            }else{
                tb.target.classList.remove("show")
                tb.target.parentNode.classList.remove("shadow")
            }
        });
    });
    textboxes.forEach((speachCone)=>speachObserver.observe(speachCone));
    paths.forEach((item)=>observer.observe(item));

    document.addEventListener("scroll", (e) => {
        var value = window.scrollY;
        middleScreenPos = Math.floor(value-window.innerHeight/2);
        if(middleScreenPos-100 > 0){
            liftCable.style.height = middleScreenPos-98+"px";
            liftImg.style.marginTop = middleScreenPos - 100+"px";
        }
        initParallaxEffect(value);
        const scrollPercentage = (value / viewportHeight) > 1 ? 1 : (value / viewportHeight);

        
        const color1 = [25, 63, 64];
        const color2 = [194, 213, 185];
        const buttonColor = [69, 124, 101]

        const r = Math.round((25 - 194) * scrollPercentage + 194);
        const g = Math.round((63 - 213) * scrollPercentage + 213);
        const b = Math.round((64 - 185) * scrollPercentage + 185);
        navBar.style.backgroundColor = lerpColor(color1, color2, scrollPercentage);
        if(navButton)navButton.style.backgroundColor = lerpColor(buttonColor, color2, scrollPercentage);
        navBarButtons.forEach((navLink)=>{
            const r = Math.round((25 - 194) * scrollPercentage + 194);
            const g = Math.round((63 - 213) * scrollPercentage + 213);
            const b = Math.round((64 - 185) * scrollPercentage + 185);
            navLink.setAttribute('style', `color: ${lerpColor(color2, color1, scrollPercentage)}`)
            navLink.addEventListener("click", (e)=>{
                if(navButton){
                    navButton.click()
                }
            })
        })
    })
})
