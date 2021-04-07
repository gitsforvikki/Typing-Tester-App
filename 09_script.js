/*
*/

let lessonsArray = ["Let us now look deep into what are objects. If we consider the real-world, we can find many objects around us, cars, dogs, humans, etc. All these objects have a state and a behavior.","If we consider a dog, then its state is - name, breed, color, and the behavior is - barking, wagging the tail, running.","If you compare the software object with a real-world object, they have very similar characteristics.","Software objects also have a state and a behavior. A software object's state is stored in fields and behavior is shown via methods.","So in software development, methods operate on the internal state of an object and the object-to-object communication is done via methods.","A class can have any number of methods to access the value of various kinds of methods. In the above example, barking(), hungry() and sleeping() are methods.","Following are some of the important topics that need to be discussed when looking into classes of the Java Language.","A collections framework is a unified architecture for representing and manipulating collections. All collections frameworks contain the following","In addition to collections, the framework defines several map interfaces and classes. Maps store key/value pairs. Although maps are not collections in the proper use of the term, but they are fully integrated with collections.","A constructor initializes an object when it is created. It has the same name as its class and is syntactically similar to a method. However, constructors have no explicit return type."];
let originalTextElement = $('#original-text');
 let textAreaBox = $('#text-area');
 let minuteElement =$('#minutes');
 let secondElement = $('#seconds');
 let milliSecondElement = $('#m-seconds');
 let messageCardElement = $('#message-card');
 let messageElement = $('#message');
 let minutes= 0;
 let seconds = 0;
 let milliSeconds = 0;
 let  timerRunning = false;
 let interval = 0;



 // keyup event on text-area
 textAreaBox.keyup(function () {
     let textEnteredLength = $(this).val().length;
     if (textEnteredLength === 1 && !timerRunning ){
         //start timer
         interval =setInterval(startTimer,10);
         timerRunning =true;
     }
     let textEntered  = $('#text-area').val();
     let originalText = $('#original-text').text();
     let partialText = originalText.substr(0,textEntered.length);
     evaluateText(originalText,textEntered,partialText);
 });
 
 //click on clear button 
$('#reset-button').click(function () {
    clearInterval(interval);
    clearAllFields();
});

//click on different lessons
let chnageLeson = (index)=>{
    let lesson = lessonsArray[index];
    originalTextElement.text(lesson);
};

 //start timer function
let timer = 0;
let startTimer =()=>{
    timer++;
    minutes = Math.floor((timer/100)/60);
    seconds = Math.floor((timer/100) - (minutes * 60));
    milliSeconds = Math.floor(timer- (seconds * 100) - (minutes * 6000));

    minuteElement.text(leadingZero(minutes));
    secondElement.text(leadingZero(seconds));
    milliSecondElement.text(leadingZero(milliSeconds));
};

//leading zero function
let leadingZero = (time)=>{
    if (time<= 9){
        return '0'+ time;
    }
    else {
        return time;
    }
};

//evaluate text function
let evaluateText   = (originalText,textEntered,partialText)=>{
    if (textEntered ===''){
        //light
        messageCardElement.addClass('bg-light').removeClass('bg-primary').removeClass('bg-danger').removeClass('ng-success');

    }
    else {
        if (textEntered === originalText){
            //success
            messageCardElement.addClass('bg-success').removeClass('bg-primary').removeClass('bg-danger').removeClass('ng-light');
            messageElement.text('congrats');
            clearInterval(interval);
            $('#congrats-modal').modal('show');//show modal
            $('#congrats-sound').trigger('play');//congrats sound play

        }
        else{
             if (textEntered === partialText){
                 //green
                 messageCardElement.addClass('bg-primary').removeClass('bg-light').removeClass('bg-danger').removeClass('ng-success');
                 messageElement.text('correct');

             }
             else {
                 //danger
                 messageCardElement.addClass('bg-danger').removeClass('bg-primary').removeClass('bg-light').removeClass('ng-success');
                 messageElement.text('wrong');
                 $('#clap-sound').trigger('play');//play clap-sound

             }
        }
    }
};

//clearAllFields function
let clearAllFields = ()=>{
    //clear message card and change color to bg-light
    messageCardElement.addClass('bg-light').removeClass('bg-primary').removeClass('bg-danger').removeClass('ng-success');
    messageElement.text('');

    //clear textAreaBox
    textAreaBox.val('');

    //makes all time 00
    minutes= 0;
    seconds = 0;
    milliSeconds = 0;
    minuteElement.text(leadingZero(minutes));
    secondElement.text(leadingZero(seconds));
    milliSecondElement.text(leadingZero(milliSeconds));

    //Greeting message
    originalTextElement.text('Thanks...!, Try another lesson.');
    $('#original-text-card').removeClass('bg-warning').addClass('bg-teal');



};