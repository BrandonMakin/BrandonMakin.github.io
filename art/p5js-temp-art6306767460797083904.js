var images;
var maxPicturesPerLine = 4;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  images = [
    "art/cliffs.jpg",
    "art/trees.jpg",
    "art/bear.jpg",
    "art/dj.jpg",
    "art/laramie.jpg",
    "art/bison.jpg",
    "art/bill_gates.jpg"
  ];
  for (var i = 0; i < images.length; i++) {
    images[i] = loadImage(images[i]);
  }
//  noLoop();
}

function draw() {
  
  //clear()
  //background(110,180,255);
  var startingXPos = 0;
  var startingYPos = 0;
  var formattedWidth = 0; //the formatted width of the picture
  var formattedHeight = 0; //the formatted height of the picture
  for (var i = 0; i < images.length; i++) { 
    img = images[i];
    aspectRatio = img.width/img.height;
    startingXPos += formattedWidth;
    startingYPos += ((int)(startingXPos/window.innerWidth)*(window.innerWidth/maxPicturesPerLine));
    startingXPos %= window.innerWidth;
      
    if (aspectRatio > 1 ) { // width is greater than height
      // set fixed width with variable height
      formattedWidth = window.innerWidth/maxPicturesPerLine
      formattedHeight = window.innerWidth/img.width*img.height/maxPicturesPerLine
      //formattedHeight = window.innerWidth/maxPicturesPerLine
      //formattedWidth = window.innerWidth/img.height*img.width/maxPicturesPerLine
    } else { // height is greater than width
      // set fixed height with variable width
      formattedWidth = window.innerWidth/maxPicturesPerLine
      formattedHeight = window.innerWidth/img.width*img.height/maxPicturesPerLine
    } 
    
    image(img,startingXPos, startingYPos, formattedWidth, formattedHeight);
    textSize(32);
    //text(round(aspectRatio), (i+currentXPos-1)*window.innerWidth/maxPicturesPerLine, 0);
  }
}  

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function getAspectRatio(img) {
  return 
}