let sketchType = "random";

function resetSketch() {
    const easContainer = document.getElementById('eas-draw-container');
    while (easContainer.firstChild) {
        easContainer.removeChild(easContainer.lastChild);
    }
    let countPerSide = document.getElementById('eas-picker-side-count').value;
    setSketchBoxCount(countPerSide);
}

function createSketchBoxes(countPerSide) {
    const easContainer = document.getElementById('eas-draw-container');

    for (let i = 0; i < (countPerSide * countPerSide); i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('eas-block');
        newDiv.addEventListener('mouseover', e => {
            setSketchBoxColor(e.target);
        });

        easContainer.appendChild(newDiv);
    }
}

function setSketchBoxCount(countPerSide) {
    const root = document.documentElement;
    root.style.setProperty('--eas-box-per-side', countPerSide);
    createSketchBoxes(countPerSide);
}

let _lastColor;
function setSketchBoxColor(box) {
    let newColor = 0;
    let newLight = "50%";

    if (sketchType === "black") {
        newColor = 0;
        newLight = "0%";
    }
    if (sketchType === "rainbow") {
        let colorIncrement = 10;

        if (typeof (_lastColor) === "undefined" || _lastColor + colorIncrement > 255) {
            newColor = 0;
        }
        else {
            newColor = _lastColor + colorIncrement;
        }
    }
    if (sketchType === "random") {
        newColor = Math.floor(Math.random() * 256);
    }

    box.style.backgroundColor = `hsla(${newColor}, 100%, ${newLight}, 100%)`;

    // save last color so we can access it next time
    _lastColor = newColor;
}

function setSketchType(newSketchType) {
    if (newSketchType != sketchType) {
        sketchTypeButtons.forEach(button => {
            if (button.getAttribute('data-sketch-type') == newSketchType) {
                button.classList.add('active-sketch-type-button');
            }
            else {
                button.classList.remove('active-sketch-type-button');
            }
        })
        sketchType = newSketchType;
    }
    console.log(`Sketch type: ${sketchType}`);
}

const sketchTypeButtons = document.querySelectorAll('.sketch-type-button');
sketchTypeButtons.forEach(button => button.addEventListener('click', e => {
    setSketchType(e.target.getAttribute('data-sketch-type'));
}));

const easPickerSideCount = document.getElementById('eas-picker-side-count');
easPickerSideCount.addEventListener('mouseup', e=> {
    const easPickerValue = document.getElementById('eas-picker-value');
    easPickerValue.textContent = easPickerSideCount.value;
})

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', e => {
    resetSketch();
})

setSketchType('black');
resetSketch();