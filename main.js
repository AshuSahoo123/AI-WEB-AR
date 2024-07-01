song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;
status1 = "";
status2 = "";

function preload() {
    song1 = loadSound("Avicii - Levels.mp3");
    song2 = loadSound("Eternxlkz - SLAY! (Official Audio).mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();;

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized!");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('FFD700');
    stroke('#C0C0C0');

    status1 = song1.isPlaying();
    status2 = song2.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        song2.stop();

        if(status1 == false) {
            song1.play();
            document.getElementById('song').innerHTML = "Song playing is Levels by Avicii";
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        song1.stop();

        if(status2 == false) {
            song2.play();
            document.getElementById('song').innerHTML = "Song playing is Slay by Eternxlkz";
        }
    }

}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + ", and LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + ", and RightWristY = " + rightWristY);
    }
}