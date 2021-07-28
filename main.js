video = "";
objects = [];
object = document.getElementById("object");

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);

    if(status!=""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i <objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
        

        r = random(255);
        g = random(255);
        b = random(255);

        if(objects[i].label == object.value){
        document.getElementById("number_of_objects").innerHTML = object.value + " Has Been Detected!";
        if(objects.length==2){document.getElementById("other").innerHTML = objects.length + " other object has been detected";}
        else if(objects.length==1){document.getElementById("other").innerHTML ="no other objects have been detected";}
        else{
            document.getElementById("other").innerHTML = objects.length + " other objects have been detected";
        }
        percent = floor(objects[i].confidence * 100);
        fill(r, g, b);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        //else
        else{
        document.getElementById("number_of_objects").innerHTML = object.value + " Has NOT Been Detected!";
        if(objects.length==1){document.getElementById("other").innerHTML = objects.length + " other object has been detected";}
        else if(objects.length==0){document.getElementById("other").innerHTML ="no other objects have been detected";}
        else{
            document.getElementById("other").innerHTML = objects.length + " other objects have been detected";
        }
        percent = floor(objects[i].confidence * 100);
        fill("#FF0000");
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
}

function start(){
    if(document.getElementById("object").value == ""){
        //document.getElementById("object").innerHTML = "<input type='text' placeholder='Put The Name Of An Object Into The Bar (eg. person)' id='object'>";
        document.getElementById("object").placeholder = "Put The Name Of An Object Into The Bar (eg. person)";
    }
    else{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    }
}

function modelLoaded(){
    console.log("Model Loaded :)");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
