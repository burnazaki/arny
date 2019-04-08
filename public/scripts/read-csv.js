let myLengthOfSearchPattern = 1;
let fileUploaded = false;


function changeLengthOfSearchPattern(value) {
    let taskButtons = document.getElementsByClassName('task');
    //assign onclick listener to switch "active class of the button"
    for (var i = 0; i < taskButtons.length; i++) {
        taskButtons[i].addEventListener("click", function () {
            taskButtons[0].classList.remove("active");
            taskButtons[1].classList.remove("active");
            taskButtons[2].classList.remove("active");
            this.classList.add("active");
        });
    }
    //assign length of search pattern
    myLengthOfSearchPattern = value;
}

function handleFiles(file) {
    //reset result field
    document.getElementById("result").innerHTML = "";
    //check if browser support FileReader
    if(window.FileReader) {
        getAsText(file[0]);
        fileUploaded = true;
    } else {
        alert("FileReader not supported in your browser.")
    }
};

function getAsText(fileToRead) {
    let reader = new FileReader();
    // read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    reader.onload = loadHandler;
    // handle errors
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    let csv = event.target.result;
    processData(csv);
}

function processData(csv) {
    //formatting the file to get only values
    csv = csv.replace(/\d+\,|\D|\s+/g, "");

    let targetList = generateSearchPatternsList(myLengthOfSearchPattern);

    //counting each target occurance in the file
    for (let i = 0; i < targetList.length; i++) {
        count(csv, targetList[i]);
    }
}

function generateSearchPatternsList(targetLength) {
        //getting the required combinations of digits by enumerating through binary numbers
        let enumerateLimit = Math.pow(2, targetLength) - 1;
        let targetList = [];
        for (let i = 0; i <= enumerateLimit; i++) {
            let target = i.toString(2);
            //formatting the results with preceding "0" "padding"
            let formattedTarget = zeroPadding(target, targetLength);
            targetList.push(formattedTarget);
        }
        return targetList;
}

//formatting a number with preceding "0"
function zeroPadding(number, targetLength) {
    let output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function toPercentage(total, part, title) {
    let converted = (part / total) * 100;
    let formatted = "'" + title + "'" + " occurance: " + converted.toFixed(2) + " %";
    return formatted;
}

function count(data, target) {
    //creating new RegExp to be able to use a variable for a matching pattern
    let re = new RegExp(target, "g");
    let count = (data.match(re)).length;
    //appending existing unordered list with li that contains results
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.innerHTML = li.innerHTML + toPercentage(data.length, count, target);
    document.getElementById('result').appendChild(li);
}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError"){
        alert('Cannot read file!');
    }
}