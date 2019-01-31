/**
Various useful functions
**/


//function to get the first stimuli
var getFirstStim = function() {
  var curr_stim = stims [0]
  var stim = base_path + curr_stim //add the path the stim
  return stim;
}



function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}

function getRandomElement (list){
  return list[Math.floor(Math.random()*list.length)];
}

function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.5, 1 and 1.5s
  Face.fixationTime = getRandomElement([500, 1000, 1500]);
  return Face.fixationTime;
}

function getFaceSample (){  //get the sample of faces in each trial
  //choose positive or negative valence
  Face.emotionX = getRandomElement([50, 100]); //randomly choose from negative and postive emotion
  //choose the identity of the face
  Face.personX = getRandomElement(['A','B','C','D']);//randomally choose from ['A','B','C','D'] -- select person
  //define 16 faces in the face array
  for (i = 1; i < 17; i++) {
    Face.pos[i] = getRandomInt(1,50)};
  return [
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[1]) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[2]) + '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[3]) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[4]) + '.jpg'],
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[5]) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[6]) + '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[7]) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[8]) + '.jpg'],
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[9]) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[10])+ '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[11])+ '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[12])+ '.jpg']
    ];
}


function getScale (){ //generate the rating scale depending on the person and valence randomly chosen in faceArray

  return ['img/'+
      Face.personX+(Face.emotionX + 3*0) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*1) + '.jpg', 'img/'+
      Face.personX+(Face.emotionX + 3*2) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*3) + '.jpg', 'img/'+
      Face.personX+(Face.emotionX + 3*4) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*5) + '.jpg', 'img/'+
      Face.personX+(Face.emotionX + 3*6) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*7) + '.jpg', 'img/'+
      Face.personX+(Face.emotionX + 3*8) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*9) + '.jpg', 'img/'+
      Face.personX+(Face.emotionX + 3*10)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*11)+ '.jpg', 'img/'+
      Face.personX+(Face.emotionX + 3*12)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*13)+ '.jpg', 'img/'+
      Face.personX+(Face.emotionX + 3*14)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*15)+ '.jpg', 'img/'+
      Face.personX+(Face.emotionX + 3*16)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 1*50)+ '.jpg']
}


function getNextSlide () {  //use to shift instruction slides
  var currentSlide = slideList.shift();
  return currentSlide
}

//data/server communication
function saveData(filename, filedata, callback, error_callback){
   $.ajax({
      type: 'post',
      cache: false,
      url: 'https://web.stanford.edu/~amitgold/cgi-bin/save_data.php',
      data: {filename: filename, filedata: filedata},
      success: callback,
      error: error_callback
   });
}
