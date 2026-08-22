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

async function mergeSortVisualizer() {
    const bars = document.getElementsByClassName('array-bar');
    async function mergeSort(arr, l, r) {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }
    async function merge(arr, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = [], R = [];
        for (let i = 0; i < n1; i++) L.push(arr[l + i]);
        for (let j = 0; j < n2; j++) R.push(arr[m + 1 + j]);
        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            bars[k].style.backgroundColor = 'orange';
            await sleep(speed);
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                bars[k].style.height = `${L[i]}px`;
                i++;
            } else {
                arr[k] = R[j];
                bars[k].style.height = `${R[j]}px`;
                j++;
            }
            bars[k].style.backgroundColor = '';
            k++;
        }
        while (i < n1) {
            bars[k].style.backgroundColor = 'orange';
            await sleep(speed);
            arr[k] = L[i];
            bars[k].style.height = `${L[i]}px`;
            bars[k].style.backgroundColor = '';
            i++; k++;
        }
        while (j < n2) {
            bars[k].style.backgroundColor = 'orange';
            await sleep(speed);
            arr[k] = R[j];
            bars[k].style.height = `${R[j]}px`;
            bars[k].style.backgroundColor = '';
            j++; k++;
        }
    }
    await mergeSort(array, 0, array.length - 1);
    for (let bar of bars) bar.style.backgroundColor = 'green';
}

async function quickSortVisualizer() {
     const bars = document.getElementsByClassName('array-bar');
    async function quickSort(arr, low, high) {
        if (low < high) {
            let pi = await partition(arr, low, high);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
    }
    async function partition(arr, low, high) {
        let pivot = arr[high];
        bars[high].style.backgroundColor = 'purple';
        let i = low - 1;
        for (let j = low; j < high; j++) {
            bars[j].style.backgroundColor = 'yellow';
            await sleep(speed);
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                bars[i].style.height = `${arr[i]}px`;
                bars[j].style.height = `${arr[j]}px`;
            }
            bars[j].style.backgroundColor = '';
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        bars[i + 1].style.height = `${arr[i + 1]}px`;
        bars[high].style.height = `${arr[high]}px`;
        bars[high].style.backgroundColor = '';
        return i + 1;
    }
    await quickSort(array, 0, array.length - 1);
    for (let bar of bars) bar.style.backgroundColor = 'green';
}

async function heapSortVisualizer() {
    const bars = document.getElementsByClassName('array-bar');
    let n = array.length;
    async function heapify(arr, n, i) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        if (l < n) bars[l].style.backgroundColor = 'orange';
        if (r < n) bars[r].style.backgroundColor = 'orange';
        await sleep(speed);
        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;
        if (l < n) bars[l].style.backgroundColor = '';
        if (r < n) bars[r].style.backgroundColor = '';
        if (largest != i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            bars[i].style.height = `${arr[i]}px`;
            bars[largest].style.height = `${arr[largest]}px`;
            await heapify(arr, n, largest);
        }
    }
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0]}px`;
        bars[i].style.height = `${array[i]}px`;
        bars[i].style.backgroundColor = 'green';
        await heapify(array, i, 0);
    }
    bars[0].style.backgroundColor = 'green';
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
        case 'merge':
            await mergeSortVisualizer();
            break;
        case 'quick':
            await quickSortVisualizer();
            break;
        case 'heap':
            await heapSortVisualizer();
            break;
    }
});

window.onload = generateArray;

// --- Beschreibung und Code-Snippets ---

const descriptions = {
    "bubble": "🔄 Bubble Sort vergleicht wiederholt benachbarte Elemente und vertauscht sie, wenn sie in der falschen Reihenfolge sind. Dieser Vorgang wiederholt sich, bis das gesamte Array sortiert ist.\n\nKomplexität: Best: O(n), Average: O(n²), Worst: O(n²).",
    "selection": "📌 Selection Sort sucht in jedem Durchlauf das kleinste (oder größte) Element im unsortierten Teil und setzt es an die richtige Position im sortierten Teil des Arrays. Einfach zu implementieren, aber ineffizient für große Arrays.\n\nKomplexität: Best: O(n²), Average: O(n²), Worst: O(n²).",
    "insertion": "✍️ Insertion Sort fügt jedes neue Element an der richtigen Position im bereits sortierten Teil des Arrays ein. Sehr effizient für kleine oder fast sortierte Arrays.\n\nKomplexität: Best: O(n), Average: O(n²), Worst: O(n²).",
    "merge": "🧩 Merge Sort ist ein Divide-and-Conquer-Algorithmus: Das Array wird rekursiv in kleinere Teile geteilt, sortiert und anschließend wieder zusammengefügt. Stabil und effizient, auch für große Arrays.\n\nKomplexität: Best: O(n log n), Average: O(n log n), Worst: O(n log n).",
    "quick": "⚡ Quick Sort wählt ein Pivot-Element und teilt das Array in kleinere und größere Elemente. Anschließend wird jeder Teil rekursiv sortiert. Sehr schnell im Durchschnitt, aber instabil.\n\nKomplexität: Best: O(n log n), Average: O(n log n), Worst: O(n²).",
    "heap": "⛰️ Heap Sort erstellt aus dem Array einen Heap (Max-Heap oder Min-Heap) und entfernt wiederholt das größte (oder kleinste) Element, um ein sortiertes Array zu erzeugen. Gut für große Arrays, nicht stabil.\n\nKomplexität: Best: O(n log n), Average: O(n log n), Worst: O(n log n)."
};

const codeSnippets = {
  bubble: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
  insertion: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  selection: `def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
  merge: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
    return arr`,
  quick: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[0]
        less = [x for x in arr[1:] if x < pivot]
        greater = [x for x in arr[1:] if x >= pivot]
        return quick_sort(less) + [pivot] + quick_sort(greater)`,
  heap: `def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    return arr`
};

// --- Beschreibung und Code aktualisieren ---

const title = document.getElementById("algo-title");
const desc = document.getElementById("algo-description");
const codeBlock = document.querySelector('.code-editor code');
const filenameSpan = document.querySelector('.editor-header .filename');

function updateAlgoInfo() {
  const val = algorithmSelect.value;
  if (title) title.textContent = algorithmSelect.options[algorithmSelect.selectedIndex].text;
  if (desc) desc.textContent = descriptions[val] || "Keine Beschreibung verfügbar.";
  if (codeBlock) codeBlock.textContent = (codeSnippets[val] || '').trim();
  if (filenameSpan) filenameSpan.textContent = val + '_sort.py';
  if (codeBlock) Prism.highlightElement(codeBlock);
}

algorithmSelect.addEventListener('change', updateAlgoInfo);
document.addEventListener("DOMContentLoaded", updateAlgoInfo);

// --- Theme Toggle ---

const toggleBtn = document.getElementById("theme-toggle");
const prismLight = document.getElementById("prism-light");
const prismDark = document.getElementById("prism-dark");
const editorHeader = document.querySelector('.editor-header');

function syncTheme() {
  const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  prismLight.disabled = isDark;
  prismDark.disabled = !isDark;
  if (editorHeader) {
    editorHeader.classList.toggle('dark', isDark);
    editorHeader.classList.toggle('light', !isDark);
  }
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

syncTheme();

toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  syncTheme();
});

