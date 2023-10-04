
function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    scrollToElement('.header');
});

link2.addEventListener('click', () => {
    // Scroll to the second element with "header" class
    scrollToElement('.header', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.column');
});






var klickbareElemente = document.querySelectorAll('.klickbaresElement');

klickbareElemente.forEach(function(element) {
    element.addEventListener('click', function() {
        // Code, der bei einem Klick ausgeführt wird
        element.style.transition = 'transform 1s';
        element.style.transform = 'translate(330px, 100px)'; // Neue Position

        // Nach einer kurzen Verzögerung die Position zurücksetzen
        setTimeout(function() {
            element.style.transform = 'translate(0, 0)';
        }, 1000); // Hier 1000 Millisekunden (1 Sekunde)
    });
});

