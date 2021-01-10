//var storyContainerClasses = ["_5jmm", "_5pcr","jq4qci2q"];
//var storyContainerClasses = ["jq4qci2q","qv66sw1b","oo9gr5id"];
//var storyContainerClasses = ["css-16my406","r-1qd0xha","r-a023e6","ii04i59q","l3itjdph"];
var storyContainerClasses = ["o0t2es00","r-16dba41","ii04i59q","l3itjdph","qu-fontSize--regular","_1qeIAgB0cPwnLhDF9XSiJM"];

//var storyContainerClasses = ["_5jmm", "_5pcr"];




var DEBUG = false;
var DEBUG_DOMAIN = "athletics.bowdoin.edu"; // for testing
var limit=0.5;
var lable=["identity_hate","insult","obscene", "severe_toxic","threat","toxic"];
var check=[];
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
                    check[0]=data["a"];
                });
                chrome.storage.sync.get("b",(data)=>{
                    check[1]=data["b"];
                });
                chrome.storage.sync.get("c",(data)=>{
                    check[2]=data["c"];
                });
                chrome.storage.sync.get("d",(data)=>{
                    check[3]=data["d"];
                });
                chrome.storage.sync.get("e",(data)=>{
                    check[4]=data["e"];
                });
                chrome.storage.sync.get("f",(data)=>{
                    check[5]=data["f"];
                });
                var b=0;
                for(var i=0;i<6;i++)
                {
                    if(((res[lable[i]]>limit) & (check[i]))==1)b=1;
                }
                if(b)removeItem(item);
            })
            .catch((e)=>{
                console.log(e);
            })
        });
       var paragraphs = item.getElementsByTagName("p");
        _.each(paragraphs, function(paragraph){
        var text = paragraph.textContent.toLowerCase();
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
                    check[0]=data["a"];
                });
                chrome.storage.sync.get("b",(data)=>{
                    check[1]=data["b"];
                });
                chrome.storage.sync.get("c",(data)=>{
                    check[2]=data["c"];
                });
                chrome.storage.sync.get("d",(data)=>{
                    check[3]=data["d"];
                });
                chrome.storage.sync.get("e",(data)=>{
                    check[4]=data["e"];
                });
                chrome.storage.sync.get("f",(data)=>{
                    check[5]=data["f"];
                });
                var b=0;
                for(var i=0;i<6;i++)
                {
                    if(((res[lable[i]]>limit) & (check[i]))==1)b=1;
                }
                if(b)removeItem(item);
            })
            .catch((e)=>{
                console.log(e);
            })
         });

    var links = item.getElementsByTagName("span");
    _.each(links, function(link){
        var text = link.textContent.toLowerCase();
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
                    check[0]=data["a"];
                });
                chrome.storage.sync.get("b",(data)=>{
                    check[1]=data["b"];
                });
                chrome.storage.sync.get("c",(data)=>{
                    check[2]=data["c"];
                });
                chrome.storage.sync.get("d",(data)=>{
                    check[3]=data["d"];
                });
                chrome.storage.sync.get("e",(data)=>{
                    check[4]=data["e"];
                });
                chrome.storage.sync.get("f",(data)=>{
                    check[5]=data["f"];
                });
                var b=0;
                for(var i=0;i<6;i++)
                {
                    if(((res[lable[i]]>limit) & (check[i]))==1)b=1;
                }
                if(b)removeItem(item);
            })
            .catch((e)=>{
                console.log(e);
            })
    });
} 


function removeItem(item){

    // set the story to be invisible
    var k;
    var y;
    console.log("deleted");
    chrome.storage.sync.get("slide",function(data){
       k= data["slide"];
       y=parseInt(k);
       y=y/100;
       k=""+y;
       console.log(k);
     });

    if (DEBUG){
        item.style.opacity = "0.5";

    } else {
        item.style.opacity = "0.05";
        console.log("deleted");
        //console.log(y);
         // Create text with DOM
         // Append new elements
         item.innerHTML("<h1>Hello member</h1>");
        $(document).ready(function(){
            //item.style.opacity = "1";
            if($(item).hasClass("imp")==0){
                var h = $(item).html();
                $(item).html(h+'<button type="button" style = "background-color : black" class="btn">U</button>');
                $(item).addClass("imp");
                $(item).click(function(){
                    $(this).css("background-color", "yellow");
                    }, function(){
                console.log("dfgfdd");
                //$(this).css("background-color", "pink");
                // document.getElementsByClassName("btn")[0].style.opacity="0.9";
                var op=item.style.opacity ;
                if(op == "0.9"){
                item.style.opacity = "0.05";
                //item.getElementsByTagName("button").style.opacity = "0.9";
               // i.style.opacity = "0.9"
                console.log("dfgfdd");
                }
                else{
                 item.style.opacity = "0.9";

                 }
            });
            }
        });

}
}
cleanNewsFeed(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(cleanNewsFeed, 300);
document.addEventListener("scroll", scrollBuzzkill);






