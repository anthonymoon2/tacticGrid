
const soccerBall = document.querySelector('#soccerBallButton');
const bluePlayer = document.querySelector('#bluePlayerButton');
const redPlayer = document.querySelector('#redPlayerButton');
const trash = document.querySelector('#trashButton');
const clear = document.querySelector('#clearButton');

const elementArea = document.querySelector(".area");
const fieldContainer = document.querySelector('.field-container');

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
    let placedButtons = document.querySelectorAll('.field-container button');
    currentObject = '';
    
    // remove all placed buttons (images) on the field
    for (let i=0; i<placedButtons.length; i++){
        placedButtons[i].remove();
    }
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
    const currentButton = document.createElement('button');
    currentButton.style.position = 'absolute';
    currentButton.style.left = percentageX + '%';
    currentButton.style.top = percentageY + '%';
    currentButton.style.backgroundColor = 'transparent';
    currentButton.style.border = "none";
    currentButton.style.cursor = "default";

    // change the cursor to trash icon for created icons only if trash is selected
    if(currentObject === 'trash'){
        currentButton.style.cursor = 'url("assets/images/trash.svg"), auto';
    }
    
    // create current image to add to button
    const currentImage = document.createElement('img');
    currentImage.style.width = '32px';
    currentImage.style.height = '32px';


    // check what the current chosen object is
    if (currentObject === 'soccerBall'){
        currentImage.src = "assets/images/soccerBall.svg";
        currentButton.appendChild(currentImage);
    } else if (currentObject === 'bluePlayer'){
        currentImage.src = "assets/images/bluePlayer.svg";
        currentButton.appendChild(currentImage);
    } else if (currentObject === 'redPlayer'){
        currentImage.src = "assets/images/redPlayer.svg";
        currentButton.appendChild(currentImage);
    } else {
        return;
    }

    // add current image to the field
    fieldContainer.append(currentButton);


    // if button is clicked using trash icon, delete
    currentButton.addEventListener('click', function(){
        if (currentObject === 'trash'){
            currentButton.remove();
            console.log("removed")
        } else {
            return;
        }
    })
})

//const clickedButton