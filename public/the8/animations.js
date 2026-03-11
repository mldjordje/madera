function initMenuColorState() {
    const menu = document.querySelector("#menuholder");
    if (!menu) return;
    const targetSections = document.querySelectorAll(".lefko");

    window.addEventListener("scroll", function () {
        let isTouching = false;

        targetSections.forEach(targetSection => {
            const menuRect = menu.getBoundingClientRect();
            const targetRect = targetSection.getBoundingClientRect();

            if (menuRect.bottom >= targetRect.top && menuRect.top <= targetRect.bottom) {
                isTouching = true;
            }
        });

        menu.style.backgroundColor = isTouching ? "black" : "";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenuColorState);
} else {
    initMenuColorState();
}


$(document).ready(function() {

    $('.faq-inside').click(function() {

        if ($(this).parent().is('.open')) {
            $(this).closest('.faq').find('.faq-answer').slideUp();
            $(this).closest('.faq').removeClass('open');
        } else {
            $('.faq-answer').slideUp();
            $('.faq').removeClass('open');
            $(this).closest('.faq').find('.faq-answer').slideDown();
            $(this).closest('.faq').addClass('open');
        }
    });
});


jQuery('.toggle').click(function() {
    jQuery('.toggle').toggleClass('active');
    jQuery('#overlay').toggleClass('open');
    jQuery('body').toggleClass('noscroll');
});

jQuery('#overlay a').click(function() {
    jQuery('.toggle').removeClass('active');
    jQuery('#overlay').removeClass('open');
    jQuery('body').removeClass('noscroll');
});


/* page gallery tabs */
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

//Parallax code for images starts
gsap.registerPlugin(ScrollTrigger);  
gsap.utils.toArray(".parallax").forEach(function(container) {
    let image = container.querySelector("img");


    let tr = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true,
            pin: false,
        }
    });

    tr.from(image, {
        yPercent: -20,
        ease: "none",
    }).to(image, {
        yPercent: 20,
        ease: "none",
    });
});
//Parallax code for images ends

//Spit text for Hero title
document.querySelectorAll(".titlos-element h1").forEach((element) => {
    let splitText = new SplitText(element, { type: "words" });
    let words = splitText.words;

    gsap.from(words, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 30%",
            scrub: false,
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
    });

    gsap.to(element, { opacity: 1, duration: 0.2 });
});

//Spit text for Hero title Villaspage
document.querySelectorAll(".villaspage-top-element h1").forEach((element) => {
    let splitText = new SplitText(element, { type: "words" });
    let words = splitText.words;

    gsap.from(words, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 30%",
            scrub: false,
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
    });

    gsap.to(element, { opacity: 1, duration: 0.2 });
});

//Spit text for Hero title VillasInsidepage
document.querySelectorAll(".hero-section-element-left h1").forEach((element) => {
    let splitText = new SplitText(element, { type: "words" });
    let words = splitText.words;

    gsap.from(words, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 30%",
            scrub: false,
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
    });

    gsap.to(element, { opacity: 1, duration: 0.2 });
});

//Spit text for Hero title Gallery
document.querySelectorAll(".gallery-top-element h1").forEach((element) => {
    let splitText = new SplitText(element, { type: "words" });
    let words = splitText.words;

    gsap.from(words, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 30%",
            scrub: false,
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
    });

    gsap.to(element, { opacity: 1, duration: 0.2 });
});

//GSAP CODE FOR #homepage .about-section
gsap.utils.toArray("#homepage .about-section").forEach(function (container) {

    let title = container.querySelector(".section-title");
    let splitText = new SplitText('#homepage .about-section .section-bigtitle h2', { type: "words" });
    let words = splitText.words;
    let subTitle = container.querySelector(".section-subtitle");

    // Δημιουργία του Timeline
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για το τίτλο
    tl.fromTo(
        title,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }
    );

    // Animation για τις λέξεις
    tl.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            stagger: 0.02,
        },
        "-=0.5" // Αυτό σημαίνει ότι το animation για τις λέξεις θα αρχίσει 0.5 δευτερόλεπτα νωρίτερα από το τέλος του τίτλου
    );

    tl.from(
        subTitle,
        {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
        }
    )

});

//GSAP CODE FOR #homepage .villas-section
gsap.utils.toArray("#homepage .villas-section").forEach(function (container) {

    let splitText = new SplitText('#homepage .villas-section .section-bigtitle h1', { type: "words" });
    let words = splitText.words;

    // Δημιουργία του Timeline
    let tv = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για τις λέξεις
    tv.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1,
        },
    );

});

//GSAP CODE FOR #homepage .faq-section
gsap.utils.toArray("#homepage .faq-section").forEach(function (container) {

    let faqTop = container.querySelector(".faq-section .section-top");
    let faq = container.querySelectorAll(".faq-section .faq");

    let tfaq = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    tfaq.from(faqTop,
        {
            opacity: 0,
            y: 50,
            duration: 0.7,
            ease: "ease3.out"
        }
    )

    tfaq.from(faq,
        {opacity: 0, y: 100, duration: 1,ease: "power2.out", stagger: 0.15}
    )

});

//GSAP CODE FOR .opportunity-section
gsap.utils.toArray(".opportunity-section").forEach(function (container) {

    let title = container.querySelector(".section-title");
    let splitText = new SplitText('.opportunity-section .section-bigtitle h1', { type: "words" });
    let words = splitText.words;
    let sectionContent = container.querySelector(".section-content");
    let sectionLink = container.querySelector(".opportunity-content .button");

    // Δημιουργία του Timeline
    let to = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για το τίτλο
    to.fromTo(
        title,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    // Animation για τις λέξεις
    to.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
        },
         // Αυτό σημαίνει ότι το animation για τις λέξεις θα αρχίσει 0.5 δευτερόλεπτα νωρίτερα από το τέλος του τίτλου
    );

    to.fromTo(
        sectionContent,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    to.fromTo(
        sectionLink,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

});

//GSAP CODE FOR .pogonia-palairos
gsap.utils.toArray(".pogonia-palairos").forEach(function (container) {

    let title = container.querySelector(".section-title");
    let splitText = new SplitText('.pogonia-palairos .section-bigtitle h3', { type: "words" });
    let words = splitText.words;
    let sectionContent = container.querySelector(".section-content");
    let sectionLink = container.querySelector(".pogonia-palairos .button");

    // Δημιουργία του Timeline
    let to = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για το τίτλο
    to.fromTo(
        title,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    // Animation για τις λέξεις
    to.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
        },
         // Αυτό σημαίνει ότι το animation για τις λέξεις θα αρχίσει 0.5 δευτερόλεπτα νωρίτερα από το τέλος του τίτλου
    );

    to.fromTo(
        sectionContent,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    to.fromTo(
        sectionLink,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

});

//GSAP CODE FOR #homepage .location-section
gsap.utils.toArray("#homepage .location-section").forEach(function (container) {

    let splitText = new SplitText('#homepage .location-section .section-bigtitle h1', { type: "words" });
    let words = splitText.words;
    let sectionContent = container.querySelector(".section-content");
    let sectionLink = container.querySelector(".location-content .button");

    // Δημιουργία του Timeline
    let to = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για τις λέξεις
    to.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
        },
         // Αυτό σημαίνει ότι το animation για τις λέξεις θα αρχίσει 0.5 δευτερόλεπτα νωρίτερα από το τέλος του τίτλου
    );

    to.fromTo(
        sectionContent,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    to.fromTo(
        sectionLink,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

});

//GSAP CODE FOR .form-section
gsap.utils.toArray(".form-section").forEach(function (container) {

    let title = container.querySelector(".section-title");
    let splitText = new SplitText('.form-section .section-bigtitle h1', { type: "words" });
    let words = splitText.words;
    let sectionContent = container.querySelector(".section-content");
    let sectionIcon = container.querySelector(".form-icon");

    // Δημιουργία του Timeline
    let to = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για το τίτλο
    to.fromTo(
        title,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    // Animation για τις λέξεις
    to.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
        },
         // Αυτό σημαίνει ότι το animation για τις λέξεις θα αρχίσει 0.5 δευτερόλεπτα νωρίτερα από το τέλος του τίτλου
    );

    to.fromTo(
        sectionContent,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }
    );

    to.fromTo(
        sectionIcon,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }
    );

});

//GSAP CODE FOR #storypage .about-section
gsap.utils.toArray("#storypage .about-section").forEach(function (container) {

    let title = container.querySelector(".section-title");
    let splitText = new SplitText('.about-section .section-bigtitle h2', { type: "words" });
    let words = splitText.words;

    // Δημιουργία του Timeline
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για το τίτλο
    tl.fromTo(
        title,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }
    );

    // Animation για τις λέξεις
    tl.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            stagger: 0.02,
        },
        "-=0.5" // Αυτό σημαίνει ότι το animation για τις λέξεις θα αρχίσει 0.5 δευτερόλεπτα νωρίτερα από το τέλος του τίτλου
    );

});

//GSAP CODE FOR #opportunitypage .about-section
gsap.utils.toArray("#opportunitypage .about-section").forEach(function (container) {

    let title = container.querySelector(".section-title");
    let splitText = new SplitText('.about-section .section-bigtitle h2', { type: "words" });
    let words = splitText.words;

    // Δημιουργία του Timeline
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για το τίτλο
    tl.fromTo(
        title,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }
    );

    // Animation για τις λέξεις
    tl.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            stagger: 0.02,
        },
        "-=0.5" // Αυτό σημαίνει ότι το animation για τις λέξεις θα αρχίσει 0.5 δευτερόλεπτα νωρίτερα από το τέλος του τίτλου
    );

});
//GSAP CODE FOR #locationpage .about-section
gsap.utils.toArray("#locationpage .about-section").forEach(function (container) {

    let title = container.querySelector(".section-title");
    let splitText = new SplitText('.about-section .section-bigtitle h2', { type: "words" });
    let words = splitText.words;

    // Δημιουργία του Timeline
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    // Animation για το τίτλο
    tl.fromTo(
        title,
        {
            opacity: 0,
            y: 100
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        }
    );

    // Animation για τις λέξεις
    tl.from(
        words,
        {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            stagger: 0.02,
        },
        "-=0.5" // Αυτό σημαίνει ότι το animation για τις λέξεις θα αρχίσει 0.5 δευτερόλεπτα νωρίτερα από το τέλος του τίτλου
    );

});

//GSAP CODE FOR Overlay Enquiry
// Δημιουργία του GSAP Timeline (αρχικά paused)
let tl = gsap.timeline({ paused: true });

tl.to("#overlay-enquiry", { right: 0, duration: 0.7, ease: "power1.out" })
  .to("#overlay-enquiry .enquiry-element", { right: 0, duration: 0.7, ease: "power1.out" }, "-=0.1");

// Toggle λειτουργία με jQuery
jQuery('.toggle-enquiry').click(function() {
    jQuery(this).toggleClass('active');
    jQuery('#overlay-enquiry').toggleClass('open');
    jQuery('body').toggleClass('noscroll');

    if (jQuery('#overlay-enquiry').hasClass('open')) {
        tl.play(); // Παίζει το animation (ανοίγει)
    } else {
        tl.reverse(); // Παίζει το animation ανάποδα (κλείνει)
    }
});


//GSAP CODE FOR Footer
gsap.utils.toArray("#footer").forEach(function (container) {

    let footerTop = container.querySelector(".footer-top");
    let footerMiddleElement = gsap.utils.toArray(".footer-middle .flex-elements");
    let footerMiddleLink = container.querySelector(".footer-middle .footer-middle-bottom");
    let footerBottom = gsap.utils.toArray(".footer-bottom");

    // Δημιουργία του Timeline
    let tf = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 70%",
            end: "bottom top",
            toggleActions: "play none none none",
        }
    });

    tf.from(footerTop, { opacity: 0, y: 100, duration: 1, ease: "power3.out" });

    tf.from(footerMiddleElement, { opacity: 0, y: 100, duration: 1, ease: "power2.out", stagger: 0.15 });

    tf.from(footerMiddleLink, { opacity: 0, y: 0, duration: 1, ease: "power3.out" });

    tf.from(footerBottom, { opacity: 0, y: 30, duration: 1, ease: "power2.out", stagger: 0.15 });

});


