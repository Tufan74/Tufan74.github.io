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

