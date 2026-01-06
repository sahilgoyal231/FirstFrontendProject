function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadingAnimation() {
    var tl = gsap.timeline();

    tl.set("#crsr", {
        opacity: 0
    })

    tl.from(".line h1", {
        y: 150,
        stagger: 0.3,
        duration: 0.6,
        delay: 0.5,
    })

    tl.from("#line1-part1, .line h2", {
        opacity: 0,
        onStart: function() {
            var h5timer = document.querySelector("#line1-part1 h5");
            var grow = 0;
            setInterval(function(){
                if(grow < 100){
                    h5timer.innerHTML = grow++;
                } else {
                    h5timer.innerHTML = grow;
                }
            }, 28)
        }
    })

    tl.to(".line h2", {
        animationName: "anime",
        opacity: 1,
    })

    tl.to("#loader", {
        opacity: 0,
        duration: 0.35,
        delay: 2.8,
    })

    tl.from("#page1", {
        delay: 0.2,
        y: 1600,
        duration: 0.5,
        ease: Power4,
    })

    tl.to("#loader", {
        display: "none",
    })

    tl.to("#crsr", {
        opacity: 1
    }, "-=0.5")

    tl.from("#nav, #fixed-nav", {
        opacity: 0,
    })

    tl.from(".hero", {
        y: 140,
        stagger: 0.2,
        opacity: 0,
    })

    tl.from("#hero1, #page2", {
        opacity: 0,
    }, "-=1.2")
}

function cursorAnimation(){
    document.addEventListener("mousemove", function(dets){
        gsap.to("#crsr", {
            left:dets.x,
            top:dets.y
        })
    })

    Shery.makeMagnet("#nav-part2 h4, #menu-dots");

    var allNavH4 = document.querySelectorAll("#nav-part2 h4, #menu-dots");

    allNavH4.forEach(function(elem) {
        elem.addEventListener("mouseenter", function() {
            gsap.to("#crsr", {
                scale: 1.8,
            })
        })

        elem.addEventListener("mouseleave", function() {
            gsap.to("#crsr", {
                scale: 1,
            })
        })
    })

    var logo = document.querySelector(".brand__svg");
    logo.addEventListener("click", function(){
        window.location.reload();
    })

    var videoContainer = document.querySelector("#video-container");
    var video = document.querySelector("#video-container video");
    var image = document.querySelector("#video-container img");

    // 1. Create the function ONCE (outside the event listener)
    // This allows us to add it and remove it cleanly.
    function moveVideoCursor(dets) {
        gsap.to("#crsr", {
            opacity: 0,
        });
        gsap.to("#video-crsr", {
            left: dets.x - 570,
            top: dets.y - 300,
        });
    }

    // 2. Add listener on Enter
    videoContainer.addEventListener("mouseenter", function () {
        videoContainer.addEventListener("mousemove", moveVideoCursor);
    });

    // 3. REMOVE listener on Leave (Crucial for performance)
    videoContainer.addEventListener("mouseleave", function () {
        videoContainer.removeEventListener("mousemove", moveVideoCursor);
        
        gsap.to("#crsr", {
            opacity: 1,
        });
        gsap.to("#video-crsr", {
            left: "70%",
            top: "-15%",
        });
    });

    // 4. Click Logic (unchanged but cleaned up)
    var flag = 0;
    videoContainer.addEventListener("click", function () {
        if (flag === 0) {
            video.play();
            video.style.opacity = 1;
            image.style.opacity = 0;
            document.querySelector("#video-crsr").innerHTML = `<i class="ri-pause-fill"></i>`;
            gsap.to("#video-crsr", { scale: 0.5 });
            flag = 1;
        } else {
            video.pause();
            video.style.opacity = 0;
            image.style.opacity = 1;
            document.querySelector("#video-crsr").innerHTML = `<i class="ri-play-fill"></i>`;
            gsap.to("#video-crsr", { scale: 1 });
            flag = 0;
        }
    });
}

let animationInterval;

function initItalicAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
    }

    const rows = document.querySelectorAll(".elem, .elem2");

    rows.forEach(function(row) {
        const h1s = row.querySelectorAll("h1");
        const spansInFirst = h1s[0].querySelectorAll("span");
        let index = 0;

        function updateClasses(idx) {
            h1s.forEach(h1 => {
                h1.querySelectorAll("span").forEach(span => {
                    span.classList.remove("italic-active");
                });
            });

            h1s.forEach(h1 => {
                const spans = h1.querySelectorAll("span");
                if (spans[idx]) {
                    spans[idx].classList.add("italic-active");
                }
            });
        }

        function cycle() {
            updateClasses(index);
            index++;
            if (index >= spansInFirst.length) {
                index = 0;
            }
        }

        setTimeout(() => {
            cycle();
            animationInterval = setInterval(cycle, 12000);
        }, 1000);
    });
}

function sheryAnimation(){
    Shery.imageEffect(".image-div",{
        style: 5,
        config: {
            "a":{"value":2,"range":[0,30]},
            "b":{"value":0.92,"range":[-1,1]},
            "z-index":{"value":-9996999,"range":[-9999999,9999999]},
            "aspect":{"value":0.7272688586910266},
            "ignoreShapeAspect":{"value":true},
            "shapePosition":{"value":{"x":0,"y":0}},
            "shapeScale":{"value":{"x":0.5,"y":0.5}},
            "shapeEdgeSoftness":{"value":0,"range":[0,0.5]},
            "shapeRadius":{"value":0,"range":[0,2]},
            "currentScroll":{"value":0},
            "scrollLerp":{"value":0.07},
            "gooey":{"value":true},
            "infiniteGooey":{"value":false},
            "growSize":{"value":4,"range":[1,15]},
            "durationOut":{"value":1,"range":[0.1,5]},
            "durationIn":{"value":1.5,"range":[0.1,5]},
            "displaceAmount":{"value":0.5},
            "masker":{"value":false},
            "maskVal":{"value":1,"range":[1,5]},
            "scrollType":{"value":0},
            "geoVertex":{"range":[1,64],"value":1},
            "noEffectGooey":{"value":true}, // Keeps gooey effect disabled until mouse interaction
            "onMouse":{"value":1},          // CHANGE THIS FROM 0 TO 1
            "noise_speed":{"value":0.76,"range":[0,10]},
            "metaball":{"value":0.47,"range":[0,2]},
            "discard_threshold":{"value":0.68,"range":[0,1]},
            "antialias_threshold":{"value":0,"range":[0,0.1]},
            "noise_height":{"value":0.34,"range":[0,2]},
            "noise_scale":{"value":17.56,"range":[0,100]}
        },
        gooey: true,
    })
}

function page2Animation(){
    document.addEventListener("mousemove", function(dets){
        gsap.to("#flag", {
            left: dets.x,
            top: dets.y,
        })
    })

    document.querySelector("#hero3").addEventListener("mouseenter", function(){
        gsap.to("#flag", {
            opacity: 1,
        })
    })

    document.querySelector("#hero3").addEventListener("mouseleave", function(){
        gsap.to("#flag", {
            opacity: 0,
        })
    })
}

loadingAnimation();
cursorAnimation();
initItalicAnimation();
locomotiveAnimation();
sheryAnimation();
page2Animation();