var removedStories = [];
//var storyContainerClasses = ["_5jmm", "_5pcr","jq4qci2q"];
//var storyContainerClasses = ["jq4qci2q","qv66sw1b","oo9gr5id"];
//var storyContainerClasses = ["css-16my406","r-1qd0xha","r-a023e6","ii04i59q","l3itjdph"];
var storyContainerClasses = ["r-16dba41","ii04i59q","l3itjdph","qu-fontSize--regular","_1qeIAgB0cPwnLhDF9XSiJM"];

//var storyContainerClasses = ["_5jmm", "_5pcr"];


// customize things you want to be removed from your feed
var bannedDomains = [];
var bannedTerms = ["they", "cool", "My","am","cruz","any","really","happy","your","you","see","comes","with","this"];

var DEBUG = false;
var DEBUG_DOMAIN = "athletics.bowdoin.edu"; // for testing
var DEBUG_TERM = "trump"; // for testing

function cleanNewsFeed(){


    chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
    });


    chrome.storage.sync.get("clean_news_feed", function(data){
        if (data["clean_news_feed"]){
            // find all potential posts
            _.each(storyContainerClasses, function(storyContainerClass){
                posts = document.getElementsByClassName(storyContainerClass);
                _.each(posts, function(post){
                    console.log('it is working')
                    //removeLinks(post);
                    removeTerms(post);
                });
            });
        }
    
    });
}

//function removeLinks(item){
//   var links = item.getElementsByTagName("a");
///        var href = link.href.toLowerCase();
 //       _.each(bannedDomains, function(domain){
  //          if (href.indexOf(domain) !== -1 || (DEBUG && href.indexOf(DEBUG_DOMAIN) !== -1)){
  //              removeItem(item, "link", href);
  //          }
   //     });
   // });
//}

function removeTerms(item){
    console.log('got one');
        var para = item.getElementsByTagName("div");
       _.each(para, function(para){
        var text = para.textContent.toLowerCase();
        fetch("http://127.0.0.1:5000/pridict", { 

                // Adding method type 
                method: "POST",
                body: JSON.stringify({
                text:text, 
                }), 
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                console.log(res);
                chrome.storage.sync.get("a",(data)=>{
                    
                });
            })
            .catch((e)=>{
                console.log(e);
            })
        _.each(bannedTerms, function(term){
            if (text.indexOf(term) !== -1 || (DEBUG && text.indexOf(DEBUG_TERM) !== -1)){
                removeItem(item, "term in para", term);
            }
        });
        });
       var paragraphs = item.getElementsByTagName("p");
        _.each(paragraphs, function(paragraph){
        var text = paragraph.textContent.toLowerCase();
        _.each(bannedTerms, function(term){
            if (text.indexOf(term) !== -1 || (DEBUG && text.indexOf(DEBUG_TERM) !== -1)){
                removeItem(item, "term in paragraph", term);
            }
        });
         });

    var links = item.getElementsByTagName("span");
    _.each(links, function(link){
        var text = link.textContent.toLowerCase();
        _.each(bannedTerms, function(term){
            if (text.indexOf(term) !== -1 || (DEBUG && text.indexOf(DEBUG_TERM) !== -1)){
                removeItem(item, "term in link", term);
            }
        });
    });
} 


function removeItem(item, offenseType, offenseMaterial){

    // set the story to be invisible
    var k =5;
    var y1="";
    var y ="";
    chrome.storage.sync.get("slide",function(data){
       k= data["slide"];
       k=k/100;
       console.log(k);
       console.log(1-k);
        y=String(k);
        console.log(y);
        y1=String(1-k);
     });

    if (DEBUG){
        item.style.opacity = "0.5";

    } else {
        item.style.opacity = "0.05";
        //console.log(y);
         // Create text with DOM
         // Append new elements
         //item.innerHTML("<h1>Hello member</h1>");
        $(document).ready(function(){
            //item.style.opacity = "1";
            if($(item).hasClass("imp")==0){
                var h = $(item).html();
                $(item).html(h +'<button type="button" style = "background-color : yellow" >UNDO!</button>');
                $(item).addClass("imp");
                $(item).click(function(){
                    $(this).css("background-color", "yellow");
                    }, function(){
                console.log("dfgfdd");
                //$(this).css("background-color", "pink");
                var op=item.style.opacity ;
                if(op == "0.9"){
                item.style.opacity = "0.05";
                console.log("dfgfdd");
                }
                else{
                 item.style.opacity = "0.9";

                 }
            });
            }       
        });
        //item.style.display = "None";

    // add this story to the list of killed stories
    if (removedStories.indexOf(item) == -1){
        if (DEBUG){
            console.log("killed an item because of bad " + offenseType + ": " + offenseMaterial);
        }
        removedStories.push(item);
        console.log(item);
    }

}
}
cleanNewsFeed(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(cleanNewsFeed, 300);
document.addEventListener("scroll", scrollBuzzkill);






