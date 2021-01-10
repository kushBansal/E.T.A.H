var emojiimg = document.getElementById("toggleImage");
var text1 = document.getElementById("popup-text1");
var text2 = document.getElementById("popup-text2");
document.addEventListener('DOMContentLoaded', function(){
    var input = document.getElementById('clean-option');
    var output = document.getElementById("demo");
    var slider = document.getElementById("myRange");
    // set the initial state of the checkbox
    chrome.storage.sync.get("clean_news_feed", function(data){
        if (data["clean_news_feed"]){
            input.checked = true;
            emojiimg.src= "https://cdn.shopify.com/s/files/1/1061/1924/files/Zipper-Mouth_Face_Emoji.png?6135488989279264585";
            text1.innerHTML="We're good to go";
            text2.innerHTML="Extension Enabled";
        } else {
            input.checked = false; 
            emojiimg.src= "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojipedia/132/serious-face-with-symbols-covering-mouth_1f92c.png";
            text1.innerHTML="Want some help?";
            text2.innerHTML="Extension Disabled";
             } 
      });
      chrome.storage.sync.get("slide",(data)=>{
        slider.value=data["slide"];
        output.innerHTML = slider.value;
      });
   input.addEventListener("change", function(){
        chrome.storage.sync.set({clean_news_feed: input.checked});
        location.reload();
        chrome.tabs.reload(function(){})
      });
      slider.addEventListener("change", function(){
        // var val=slider.getAttribute("value");
        
        chrome.storage.sync.set({slide:slider.value});
        output.innerHTML = slider.value;
        // location.reload();
        // chrome.tabs.reload(function(){})
      });
      
//   slider.oninput = function(){
//   var x= this.value;
//   output.innerHTML = x;
//   document.getElementById('myRange').setAttribute('value',x);
//   chrome.storage.sync.set({'slide': x});
  
// }

});
//SLIDER START
// var output = document.getElementById("demo");
// var slider = document.getElementById("myRange");
// output.innerHTML = slider.value;





$(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideToggle("slow");
    });
  });


//document.getElementById("ok").style.opacity= slider.value;
//document.getElementById("demo").innerHTML = slider.value;
//chrome.storage.sync.set({slide: x});




    //document.getElementById("ok").style.opacity= (x/100);
 
//SLIDER END
