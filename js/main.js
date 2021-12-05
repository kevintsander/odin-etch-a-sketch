function createSketchDivs(countPerSide) {
    const easContainer = document.querySelector("#eas-draw-container");

    for(let i = 0; i < (countPerSide * countPerSide); i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('eas-block');
        //newDiv.addEventListener('hover', );

        easContainer.appendChild(newDiv);
    }
}

function setSketchBoxCount(countPerSide) {
    const root = document.documentElement;
    root.style.setProperty('--eas-box-per-side', countPerSide);
    createSketchDivs(countPerSide);    
}

setSketchBoxCount(16);