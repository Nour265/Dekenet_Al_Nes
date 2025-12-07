document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider-img');
    let currentIndex = 0;
    const intervalTime = 1000; 

    
    if (slides.length > 0) {
        setInterval(() => {
            
            slides[currentIndex].classList.remove('active');

            
            currentIndex = (currentIndex + 1) % slides.length;

            
            slides[currentIndex].classList.add('active');
        }, intervalTime);
    }
});

