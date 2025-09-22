/* Your JS here. */
// --- Smooth Scrolling ---
const navLinks = document.querySelectorAll('#navbar a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Prevent the default jump-to-anchor behavior
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- Position Indicator on Scroll ---
const sections = document.querySelectorAll('main section, footer'); // Include footer
const navbarLinks = document.querySelectorAll('#navbar ul a');

function updateActiveLink() {
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // 150px offset to trigger the highlight a bit before the section top hits the viewport top
        if (pageYOffset >= sectionTop - 150) { 
            currentSectionId = section.getAttribute('id');
        }
    });

    // Special case for the bottom of the page
    // If the user has scrolled to the bottom, force the last link to be active.
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
        const lastSection = sections[sections.length - 2]; // This is #contact
        currentSectionId = lastSection.getAttribute('id');
    }

    navbarLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link's href matches the current section's ID
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Update active link on page load
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Add the position indicator logic to the existing scroll event listener
window.addEventListener('scroll', () => {
    // This part is from the previous step
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // This is the new part for the position indicator
    updateActiveLink();
});

// --- Carousel Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.querySelector('.carousel-slides');
    // Check if the carousel exists on the page
    if (slidesContainer) {
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        let currentIndex = 0;
        const totalSlides = slides.length;

        function goToSlide(index) {
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            goToSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            // The modulo operator in JS can be tricky with negative numbers
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(currentIndex);
        });
    }
});

// --- Modal Logic ---
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalOverlay = document.getElementById('modal-overlay');

if (openModalBtn && closeModalBtn && modalOverlay) {
    // Open the modal
    openModalBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    // Close the modal with the close button
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // Close the modal by clicking on the overlay
    modalOverlay.addEventListener('click', (event) => {
        // Check if the clicked element is the overlay itself, not the modal content
        if (event.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Close the modal with the "Escape" key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });
}