
const soccerBall = document.querySelector('#soccerBallButton');
const bluePlayer = document.querySelector('#bluePlayerButton');
const redPlayer = document.querySelector('#redPlayerButton');
const trash = document.querySelector('#trashButton');
const clear = document.querySelector('#clearButton');

const elementArea = document.querySelector(".area");
const fieldContainer = document.querySelector('.field-container');

// local storage of field elements
let tempFieldImages = {
    fieldElements: [],
};

// global variable of currently chosen object
let currentObject;


// function for when soccer ball button is clicked
soccerBall.addEventListener('click', function(){
    console.log('clicked ball');
    elementArea.setAttribute('style', 'cursor: url("assets/images/soccerBall.svg"), auto');
    currentObject = 'soccerBall';
})

// function for when blue player button is clicked
bluePlayer.addEventListener('click', function(){
    console.log('clicked blue player');
    elementArea.setAttribute('style', 'cursor: url("assets/images/bluePlayer.svg"), auto');
    currentObject = 'bluePlayer';
})

// function for when red player button is clicked
redPlayer.addEventListener('click', function(){
    elementArea.setAttribute('style', 'cursor: url("assets/images/redPlayer.svg"), auto');
    currentObject = 'redPlayer';
})

// function for when trash button is clicked
trash.addEventListener('click', function(){
    elementArea.setAttribute('style', 'cursor: url("assets/images/trash.svg"), auto');
    currentObject = 'trash';
})
// function for when clear button is clicked
clear.addEventListener('click', function(){
    console.log("Clear button pressed.");
    let placedElements = document.querySelectorAll('.field-container img');
    currentObject = '';
    
    // remove all placed buttons (images) on the field
    for (let i=1; i<placedElements.length; i++){
        placedElements[i].remove();
    }

    // delete from local storage
    tempFieldImages.fieldElements = [];
    updateLocalStorage();
})




// function to add chosen image to the field using the correct position of click 
fieldContainer.addEventListener('click', function(e){
    var fieldContainerPosition = fieldContainer.getBoundingClientRect();
    // Get the cursor's X and Y (e.page), subtract field container's position relative to the viewport using
    var cursorX = e.pageX - fieldContainerPosition.left;
    var cursorY = e.pageY - fieldContainerPosition.top;

    // Calculate the percentage values relative to fieldContainer's width and height
    var percentageX = (cursorX / fieldContainerPosition.width) * 100;
    var percentageY = (cursorY / fieldContainerPosition.height) * 100;
    console.log('Mouse position in percentage: ', percentageX + '%', percentageY + '%');

    // create button and assign styles
    const currentImage = document.createElement('img');
    currentImage.style.position = 'absolute';
    currentImage.style.left = percentageX + '%';
    currentImage.style.top = percentageY + '%';
    currentImage.style.backgroundColor = 'transparent';
    currentImage.style.border = "none";
    currentImage.style.width = '32px';
    currentImage.style.height = '32px';

    // check what the current chosen object is
    if (currentObject === 'soccerBall'){
        currentImage.src = "assets/images/soccerBall.svg";
    } else if (currentObject === 'bluePlayer'){
        currentImage.src = "assets/images/bluePlayer.svg";
    } else if (currentObject === 'redPlayer'){
        currentImage.src = "assets/images/redPlayer.svg";
    } else {
        return;
    }

    // add to object tempFieldImages's fieldImages array 
    tempFieldImages.fieldElements.push({
        url: currentImage.src,
        position: 'absolute',
        left: percentageX + '%',
        top: percentageY + '%',
        backgroundColor: 'transparent',
        border: "none",
        width: '32px',
        height:'32px',
    });
    updateLocalStorage();

    // add current image to the field
    fieldContainer.append(currentImage);

    // if button is clicked using trash icon, delete
    currentImage.addEventListener('click', function(){
        if (currentObject === 'trash'){
            currentImage.remove();
            console.log("removed")
        } else {
            return;
        }
    })
})

function updateLocalStorage(){
    // add to local storage;
    localStorage.setItem('storedObjects', JSON.stringify(tempFieldImages))
}

// get field elements from local storage
function loadFromLocalStorage(){
    const storedElements = JSON.parse(localStorage.getItem('storedObjects'));

    if (storedElements){
        tempFieldImages = storedElements;

        for(let i = 0; i<tempFieldImages.fieldElements.length; i++){
            const imageData = tempFieldImages.fieldElements[i];
            const img = document.createElement("img");
            img.style.position = 'absolute';
            img.style.left = imageData.left;
            img.style.top = imageData.top;
            img.style.backgroundColor = imageData.backgroundColor;
            img.style.border = imageData.border;
            img.style.width = imageData.width;
            img.style.height = imageData.height;
            img.src = imageData.url;
            fieldContainer.appendChild(img);
        }
    }
}

function getFromLocalStorage(){
    localStorage.getItem()
}


// load data from local storage on page load
window.onload = loadFromLocalStorage;