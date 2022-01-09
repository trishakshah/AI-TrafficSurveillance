statusVar = "";
resultsArray = [];

function preload() {
    videoVar = createVideo("trafficVideo.mp4");
}

function setup() {
    canvas = createCanvas(800, 500);
    canvas.center();
    videoVar.hide();
}

function startSurveillance() {
    modelVar = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting...";
}

function modelLoaded() {
    console.log("Model loaded.");
    statusVar = true;
    videoVar.loop();
    videoVar.speed(1);
    videoVar.volume(0);
}


function getResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        resultsArray = results;
    }
}

function draw() {
    image(videoVar, 0, 0, 800, 500);
    if (statusVar != "") {
        modelVar.detect(videoVar, getResults);
        for (i = 0; i < resultsArray.length; i++) {
            document.getElementById("status").style.visibility = "hidden";
            percentage = ", " + floor(resultsArray[i].confidence * 100) + "% sure";
            objects = resultsArray[i].label;
            stroke("red");
            text(objects + percentage, resultsArray[i].x + 20, resultsArray[i].y + 20);
            noFill();
            rect(resultsArray[i].x, resultsArray[i].y, resultsArray[i].width, resultsArray[i].height);
        }
    }
}