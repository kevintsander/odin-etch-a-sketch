let sketchType = "random";

function resetSketch() {
    const easDrawContainer = document.getElementById('eas-draw-container');
    while (easDrawContainer.firstChild) {
        easDrawContainer.removeChild(easDrawContainer.lastChild);
    }
    let countPerSide = document.getElementById('eas-picker-side-count').value;
    setSketchBoxCount(countPerSide);
}

function createSketchBoxes(countPerSide) {
    const easDrawContainer = document.getElementById('eas-draw-container');

    for (let i = 0; i < (countPerSide * countPerSide); i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('eas-block');
        newDiv.addEventListener('mouseover', e => {
            setSketchBoxColor(e.target);
        });
        newDiv.addEventListener('touchmove', e => {
            e.preventDefault();
            let touchLocation = e.touches[0];
            let target = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);
            if (target.classList.contains('eas-block')) {
                setSketchBoxColor(target);
            }
        });

        easDrawContainer.appendChild(newDiv);
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

/* set handlers for sketch type buttons */
const sketchTypeButtons = document.querySelectorAll('.sketch-type-button');
sketchTypeButtons.forEach(button => button.addEventListener('click', e => {
    setSketchType(e.target.getAttribute('data-sketch-type'));
}));

/* set handler to change displayed value when slider changed */
const easPickerSideCount = document.getElementById('eas-picker-side-count');
easPickerSideCount.addEventListener('input', e=> {
    const easPickerValue = document.getElementById('eas-picker-value');
    easPickerValue.textContent = easPickerSideCount.value;
})

/* set handler for reset button */
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', e => {
    const easContainer = document.getElementById('eas-container');
    easContainer.classList.toggle("shake");
    setTimeout(() => easContainer.classList.toggle("shake"), 750);
    resetSketch();
})

/* initialize page */
setSketchType('black');
resetSketch();