const arrayContainer = document.getElementById('arrayContainer');
const generateBtn = document.getElementById('generateArray');
const startBtn = document.getElementById('startSort');
const algorithmSelect = document.getElementById('algorithm');
const arraySizeInput = document.getElementById('arraySize');
const speedInput = document.getElementById('speed');

let array = [];
let speed = 200;

function generateArray() {
    arrayContainer.innerHTML = '';
    array = [];
    const size = parseInt(arraySizeInput.value);
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 200) + 10;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}px`;
        arrayContainer.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i -1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j+1].style.backgroundColor = 'red';
            await sleep(speed);
            if (array[j] > array[j+1]) {
                [array[j], array[j+1]] = [array[j+1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j+1].style.height = `${array[j+1]}px`;
            }
            bars[j].style.backgroundColor = '';
            bars[j+1].style.backgroundColor = '';
        }
        bars[array.length-i-1].style.backgroundColor = 'green';
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';
        await sleep(speed);
        while (j >= 0 && array[j] > key) {
            array[j+1] = array[j];
            bars[j+1].style.height = `${array[j+1]}px`;
            bars[j].style.backgroundColor = 'red';
            await sleep(speed);
            bars[j].style.backgroundColor = '';
            j--;
        }
        array[j+1] = key;
        bars[j+1].style.height = `${key}px`;
        bars[i].style.backgroundColor = '';
    }
    for (let bar of bars) bar.style.backgroundColor = 'green';
}

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = 'red';
        for (let j = i+1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
            await sleep(speed);
            if (array[j] < array[minIdx]) {
                bars[minIdx].style.backgroundColor = '';
                minIdx = j;
                bars[minIdx].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = '';
            }
        }
        if (minIdx != i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[minIdx].style.height = `${array[minIdx]}px`;
        }
        bars[i].style.backgroundColor = 'green';
    }
}

generateBtn.addEventListener('click', generateArray);

startBtn.addEventListener('click', async () => {
    speed = parseInt(speedInput.value);
    const algo = algorithmSelect.value;
    switch(algo) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'selection':
            await selectionSort();
            break;
    }
});

window.onload = generateArray;

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


document.addEventListener("DOMContentLoaded", () => {
   const descriptions = {
    "bubble": "🔄 Bubble Sort vergleicht wiederholt benachbarte Elemente und vertauscht sie, wenn sie in der falschen Reihenfolge sind. Dieser Vorgang wiederholt sich, bis das gesamte Array sortiert ist.\n\nKomplexität: Best: O(n), Average: O(n²), Worst: O(n²).",
    
    "selection": "📌 Selection Sort sucht in jedem Durchlauf das kleinste (oder größte) Element im unsortierten Teil und setzt es an die richtige Position im sortierten Teil des Arrays. Einfach zu implementieren, aber ineffizient für große Arrays.\n\nKomplexität: Best: O(n²), Average: O(n²), Worst: O(n²).",
    
    "insertion": "✍️ Insertion Sort fügt jedes neue Element an der richtigen Position im bereits sortierten Teil des Arrays ein. Sehr effizient für kleine oder fast sortierte Arrays.\n\nKomplexität: Best: O(n), Average: O(n²), Worst: O(n²).",
    
    "merge": "🧩 Merge Sort ist ein Divide-and-Conquer-Algorithmus: Das Array wird rekursiv in kleinere Teile geteilt, sortiert und anschließend wieder zusammengefügt. Stabil und effizient, auch für große Arrays.\n\nKomplexität: Best: O(n log n), Average: O(n log n), Worst: O(n log n).",
    
    "quick": "⚡ Quick Sort wählt ein Pivot-Element und teilt das Array in kleinere und größere Elemente. Anschließend wird jeder Teil rekursiv sortiert. Sehr schnell im Durchschnitt, aber instabil.\n\nKomplexität: Best: O(n log n), Average: O(n log n), Worst: O(n²).",
    
    "heap": "⛰️ Heap Sort erstellt aus dem Array einen Heap (Max-Heap oder Min-Heap) und entfernt wiederholt das größte (oder kleinste) Element, um ein sortiertes Array zu erzeugen. Gut für große Arrays, nicht stabil.\n\nKomplexität: Best: O(n log n), Average: O(n log n), Worst: O(n log n)."
};


    const algoSelectDesc = document.getElementById("algorithm-desc");
    const title = document.getElementById("algo-title");
    const desc = document.getElementById("algo-description");

    function updateDescription() {
        const selected = algoSelectDesc.value;
        title.textContent = algoSelectDesc.options[algoSelectDesc.selectedIndex].text;
        desc.textContent = descriptions[selected] || "Keine Beschreibung verfügbar.";
    }

    // Direkt setzen beim Laden
    updateDescription();

    // Bei Auswahl ändern
    algoSelectDesc.addEventListener("change", updateDescription);
});


