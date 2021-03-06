/**
Various gerneric useful functions
**/

function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}

function getRandomElement (list){
  return list[Math.floor(Math.random()*list.length)];
}

function getWord (){ //get a word for attention check from the word list
  Face.word = Face.wordList.shift();
  return Face.word;
}

/***
  loading data and arranging
  ***/
function getNextSlide () {  //use to shift instruction slides
  var currentSlide = slideList.shift();
  return currentSlide;
}


function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.5, 1 and 1.5s
  Face.fixationTime = getRandomElement([500, 1000, 1500]);
  return Face.fixationTime;
}

function loadFacePool(start,end) { //the start and ending index of the images
  var list = [];
  for(i = start; i < (end+1); i++){
     list.push( 'img/A' + i + '.jpg'); list.push( 'img/B' + i + '.jpg');
     list.push( 'img/C' + i + '.jpg'); list.push( 'img/D' + i + '.jpg');}
  return list;
}

function emotionValence(emotion){ //choose positive or negative valence
  if (emotion == 'positive'){
    Face.emotionX = 50;
    Face.path = 'stimuli/positive/';
  } else if (emotion == 'negative'){
    Face.emotionX = 100;
    Face.path = 'stimuli/negative/';
  }
  return Face.emotionX
}

function loadStimulus(type,start,end) { //the start and ending index of the images
  var list = [];
  for(i = start; i < (end+1); i++){
    if (type == 'practice'){
      list.push( 'stimuli/practice/' + '1_0' + ("0" + i).slice(-2) + '.png');
    } else if (Face.emotionX == 50){
      list.push( 'stimuli/positive/' + i + '.jpg');
    } else {
      list.push( 'stimuli/negative/' + '1_0' + ('0' + i).slice(-2) + '.png');}}
  return list;
}

function createSlideList(start,end){
  var list = [];
  for (i = start; i < (end+1); i++){
     list.push( 'img/ins_just_ensamble/Slide'+i+'.png');}
  return list;
}

/**
  functions that are related to the task at hand

*/

function getFaceStim() { //first stiumli presented to articipants
    Face.personX = getRandomElement(['A','B','C','D']);//randomally choose from ['A','B','C','D'] -- select person
    //define 16 faces in the face array
    Face.stim = getRandomInt(1,50); //randomly select 16 faces
    return 'img/'+ Face.personX +(Face.emotionX + Face.stim) + '.jpg' ;
}

function getScale (){ //generate the rating scale depending on the person and valence randomly chosen in faceArray
  //identify of the face is similar to the original ientity.
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

function getFaceSample (){  //get the array  of faces in each trial based on the stimuli seen in hte beginning. notice that we want to miminize the range to 10-40 to get a distbution.
  Face.sampleSD = getRandomElement([face5sd,face10sd]); //random select from SD=5 and SD=10,
  Face.recordSD = Face.sampleSD[0];
  //giving the conditions based on the samples we have which are 10-40
  if ( Face.stim <= 10) {  //if you rated the picture between 10-20 you can only be assigned to the same or higher condition
    Face.sampleMean = 10 + getRandomElement([0, +10]);
  } else if ( Face.stim>10 && Face.stim < 20) {  //if you rated the picture between 10-20 you can only be assigned to the same or higher condition
    Face.sampleMean = Face.stim + getRandomElement([0, +10]);
  } else if ( Face.stim>=20 && Face.stim <=30) {
    Face.sampleMean = Face.stim + getRandomElement([0, -10, +10]);
  } else if (Face.stim > 30 && Face.stim<40) {   //If you rated the picture between 30 to 40 you can only be assigned to lower or same
    Face.sampleMean = Face.stim + getRandomElement([0, -10]);
  } else {
    Face.sampleMean = 40 + getRandomElement([0, -10]);
  }
  Face.pool = (Face.sampleSD[1].responseJSON[Face.sampleMean]).slice(0, 12);//get an array of face index from JSON
  Face.pos = jsPsych.randomization.shuffle(Face.pool); //randomize the 12 faces
  return [
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[0] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[1]-100) + '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[2] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[3]-100) + '.jpg'],
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[4] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[5]-100) + '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[6] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[7]-100) + '.jpg'],
    ['img/'+ Face.personX +(Face.emotionX + Face.pos[8] -100) + '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[9]-100)+ '.jpg',
     'img/'+ Face.personX +(Face.emotionX + Face.pos[10]-100)+ '.jpg', 'img/'+ Face.personX +(Face.emotionX + Face.pos[11]-100)+ '.jpg']
    ];
}

function getButtons() { //my group or not my group button.
  var trialButtons = [
  '<button class="jspsych-btn" style="color:white; font-size: 20px; padding: 26px ;background-color:black; position: fixed; left:25%;top:36%; width: 210px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 50%">%choice%</button>',
  '<button class="jspsych-btn" style="color:white; font-size: 20px; padding: 26px ;background-color:red;position: fixed; left:62%;top:36%;width: 210px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 50%">%choice%</button>'];
  myButtons = [];
  myButtons.push(trialButtons);
  //alert (myButtons)
  return myButtons[myButtons.length -1];
}


/*
  functions that check participants attention and identity
*/

function checkID (){ //check if id is good
  var lasttrialdata = jsPsych.data.getLastTrialData().select('responses').values[0];
  var textInput = JSON.parse(lasttrialdata).Q0;
  var patt = new RegExp("^[a-zA-Z_0-9]{1,}$"); //the first and last character (this doesn't allow punctuations)
    if (!patt.test(textInput)){      //test if first/last character in response exist
      alert("Please, enter your participant id");
      return true; }
    else{ return false;}
}

function checkUser (){//check if user has been in list of
  var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
  var userID = JSON.parse(inputText).Q0;
  if(userList.responseText.includes(userID)){
    alert('It seems that you have participated in the experiment before. Thank you for your participation!');
    window.close();
    return true;
  } else { return false;}
}


function checkCitizen (){
  var choice = jsPsych.data.getLastTrialData().select('button_pressed').values[0];
  if(choice == 1){
    alert('As mentioned in the study description, this study is limited to Americian participants. Your session will be terminated and the window will be closed.');
    window.close();
    return true;
  } else { return false;}
}

function checkPhone (){
  var choice = jsPsych.data.getLastTrialData().select('button_pressed').values[0];
  if(choice == 0){
    alert('As mentioned in the study description, this study can only be done a computer and would not work on a smartphone. Your experiment will be terminated and the window will be closed.');
    window.close();
    return true;
  } else { return false;}
}

var check_consent = function(elem) {
  if ($('#consent_checkbox').is(':checked')) {
    return true;
  }else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;
  } return false;
}


function checkTyping(){  //test if type correctly
  var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
  var text = JSON.parse(inputText).Q0;
  if (Face.word !== text){
    falseAnswer += 1;
    alert("Attention! Please type the word correctly. If the alert shows up for 4 times, the experiment will be automatically terminated.");
    Face.wordList.unshift(Face.word);
    if (falseAnswer == falseAllowance){ //if participant gets alert this number of times
      alert("Hi! You've made too much errors in typing the word suggesting that you are not paying attention to the task. The task will be Terminated");
      window.close();
    }else{return true;}
  }else {falseAnswer = 0; return false} //reset falseAnswer
}

/*
unsed fucntions that may be useful
*/
/*
function getStim (){
  Face.stim =  Face.stims.pop();
  return Face.stim //get last stim of the stim list
}

function getPrompt(){ //the prompt for minimal group paradigm
  return sortPrompt.shift();
}
function getSortImage(){ //the image for minimal group paradigm
  stim = '<img src=img/sort/'+ Object.keys(sortImage)[0] +'.jpg style="margin:30px">'+
         '<img src=img/sort/'+ Object.keys(sortImage)[1]+'.jpg style="margin:30px">';
  return stim
}
function getOptions(){   //the options for minimal group paradigm
  return [Object.values(sortImage)[0], Object.values(sortImage)[1]]};

function optionButton(){
  var trialButtons = [
    '<button class="jspsych-btn" style="font-size: 24px; padding: 10px ; position: fixed; left:29%;top:80%; width: 170px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 80%">%choice%</button>',
    '<button class="jspsych-btn" style="font-size: 24px; padding: 10px ; position: fixed; left:62%;top:80%; width: 170px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 80%">%choice%</button>'
    ];
    myButtons = [];
    myButtons.push(trialButtons);
    //alert (myButtons)
    return myButtons[myButtons.length -1];
  }

function getStimList(min1,max1,min2,max2) {  //min1:first index of practice stim, min1:first index of task stim
  var stims = [];
  for(i = min2; i < (max2+1); i++){    //use loop to get a list of stimulus with sequential numbers in file names
      if (Face.emotionX == 50){
         stims.push( 'stimuli/positive/' + i + '.jpg');
      } else {
        stims.push( 'stimuli/negative/' + '1_0' + ("0" + i).slice(-2) + '.png')}};//add task stims
  var stims = jsPsych.randomization.shuffle(stims);
  for(i = min1; i < (max1+1); i++){    //use loop to get a list of stimulus with sequential numbers in file names
      stims.push( 'stimuli/practice/' + '1_0' + ("0" + i).slice(-2) + '.png')};//add practice stims
  return stims;  //attention please! in the list, 4 practice stimulus are AT TGE END (for convenience of shuffling and ordering)
}

function checkAnswer (){
  var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
  var text = JSON.parse(inputText).Q0;
  var patt = new RegExp("[A-Za-z0-9 _.,!'/$]"); // this allows punctuations
  if (!patt.test(inputText  )){      //test if first/last character in response exist
    alert("Please describe the image just showed in a few words (this will be uses for validation purposes)");
    return true; }
  else{ return false;}
}



*/
