const sizePicker = document.getElementById("sizePicker");
// Select size input
let inputHeight = document.getElementById("inputHeight");
let inputWidth = document.getElementById("inputWidth");

// Select color input
let color = document.getElementById("colorPicker");

const pixelCanvas = document.getElementById("pixelCanvas");

function clearGrid() {
  const allRows = document.querySelectorAll("tr");
  allRows.forEach((row) => {
    row.remove();
  });
}

function makeGrid(e) {
  e.preventDefault();

  // Clear the grid everytime
  clearGrid();

  const height = inputHeight.value;
  const width = inputWidth.value;
  // nested loop
  for (let i = 1; i <= height; i++) {
    //row element is created
    const row = document.createElement("tr");
    for (let j = 1; j <= width; j++) {
      // create column element
      const column = document.createElement("td");
      column.id = "column-i-j";
      // append it to row element
      row.appendChild(column);
    }
    // append row element to table(i.e pixelCanvas) element
    pixelCanvas.appendChild(row);
  }
}

// When size is submitted by the user, call makeGrid()
sizePicker.addEventListener("submit", makeGrid);

pixelCanvas.addEventListener("click", function (e) {
  e.target.style.backgroundColor = color.value;
});


// download canvas

const canvasDownload = document.getElementById("canvasDownload");

canvasDownload.addEventListener("click", downloadCanvas);


function downloadCanvas() {
  const canvas = document.createElement("canvas");
  const rows = document.querySelectorAll("tr");
  const height = rows.length;
  const width = rows[0].querySelectorAll("td").length;

  const canvasWidth = width * 20; // Multiplizieren Sie mit der gewünschten Skalierung
  const canvasHeight = height * 20; // Multiplizieren Sie mit der gewünschten Skalierung

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = false; // Schalten Sie die Bildglättung aus

  rows.forEach((row, i) => {
      const cols = row.querySelectorAll("td");
      cols.forEach((col, j) => {
          const color = window.getComputedStyle(col).backgroundColor;
          ctx.fillStyle = color;
          ctx.fillRect(j * 20, i * 20, 20, 20); // Multiplizieren Sie mit der gewünschten Skalierung
      });
  });

  const pngDataUrl = canvas.toDataURL("image/png");

  const a = document.createElement("a");
  a.href = pngDataUrl;
  a.download = "pixel_art.png";
  a.click();
}


