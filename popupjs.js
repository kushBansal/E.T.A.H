var emojiimg = document.getElementById("toggleImage");
var text1 = document.getElementById("popup-text1");
var text2 = document.getElementById("popup-text2");
document.addEventListener('DOMContentLoaded', function(){
    var input = document.getElementById('clean-option');
    var inputa = document.getElementById('a');
    var inputb = document.getElementById('b');
    var inputc = document.getElementById('c');
    var inputd = document.getElementById('d');
    var inpute = document.getElementById('e');
    var inputf = document.getElementById('f');
    // set the initial state of the checkbox
    chrome.storage.sync.get("clean_news_feed", function(data){
        if (data["clean_news_feed"]){
            input.checked = true;
            emojiimg.src= "https://cdn.shopify.com/s/files/1/1061/1924/files/Zipper-Mouth_Face_Emoji.png?6135488989279264585";
            text1.innerHTML="We're good to go";
            text2.innerHTML="Extension Enabled";

         } 
        else {
            input.checked = false; 
            emojiimg.src= "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojipedia/132/serious-face-with-symbols-covering-mouth_1f92c.png";
            text1.innerHTML="Want some help?";
            text2.innerHTML="Extension Disabled";
             } 
    });
    chrome.storage.sync.get("f", function(data){
        if(data["f"]){
             inputf.checked = true;
        }
        else{
             inputf.checked = false;
        } 
    });

        
        chrome.storage.sync.get("a", function(data){
        if(data["a"]){
             inputa.checked = true;
        }
        else{
             inputa.checked = false;
        } 
    });     
         chrome.storage.sync.get("b", function(data){
        if(data["b"]){
             inputb.checked = true;
        }
        else{
             inputb.checked = false;
        } 
    });
         chrome.storage.sync.get("c", function(data){
        if(data["c"]){
             inputc.checked = true;
        }
        else{
             inputc.checked = false;
        } 
    }); 
         chrome.storage.sync.get("d", function(data){
        if(data["d"]){
             inputd.checked = true;
        }
        else{
             inputd.checked = false;
        } 
    });
        chrome.storage.sync.get("e", function(data){
        if(data["e"]){
             inpute.checked = true;
        }
        else{
             inpute.checked = false;
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
     inputa.addEventListener("change", function(){
        chrome.storage.sync.set({"a" : inputa.checked});
       // location.reload();
        //chrome.tabs.reload(function(){})
      });
     inputb.addEventListener("change", function(){
        chrome.storage.sync.set({"b": inputb.checked});
        //location.reload();
        //chrome.tabs.reload(function(){})
      });
      inputc.addEventListener("change", function(){
        chrome.storage.sync.set({"c": inputc.checked});
        //location.reload();
       // chrome.tabs.reload(function(){})
      });
       inputd.addEventListener("change", function(){
        chrome.storage.sync.set({"d": inputd.checked});
        //location.reload();
       // chrome.tabs.reload(function(){})
      });
        inpute.addEventListener("change", function(){
        chrome.storage.sync.set({"e": inpute.checked});
       // location.reload();
        //chrome.tabs.reload(function(){})
      });
         inputf.addEventListener("change", function(){
        chrome.storage.sync.set({"f": inputf.checked});
        // location.reload();
        //chrome.tabs.reload(function(){})
      });
         slider.addEventListener("change", function(){
        // var val=slider.getAttribute("value");
        
        chrome.storage.sync.set({slide:slider.value});
        output.innerHTML = slider.value;
        // location.reload();
        // chrome.tabs.reload(function(){})
      });
  slider.oninput = function(){
  var x= this.value;
  output.innerHTML = x;
  document.getElementById('myRange').setAttribute('value',x);
  chrome.storage.sync.set({'slide': x});
  
}

});


$(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideToggle("slow");
    });
  });

//SLIDER START
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
//document.getElementById("ok").style.opacity= slider.value;
//document.getElementById("demo").innerHTML = slider.value;
//chrome.storage.sync.set({slide: x});




    //document.getElementById("ok").style.opacity= (x/100);
 
//SLIDER END
