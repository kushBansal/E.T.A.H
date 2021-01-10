var emojiimg = document.getElementById("toggleImage");
var text1= document.getElementById("popup-text1");
var text2= document.getElementById("popup-text2");
var value=true;

function enable()
{
    emojiimg.src= "https://cdn.shopify.com/s/files/1/1061/1924/files/Zipper-Mouth_Face_Emoji.png?6135488989279264585";
    text1.innerHTML="We're good to go";
    text2.innerHTML="Extension Enabled";
    value=true;
};

function disable()
{
    emojiimg.src= "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojipedia/132/serious-face-with-symbols-covering-mouth_1f92c.png";
    text1.innerHTML="Want some help?";
    text2.innerHTML="Extension Disabled";
    value=false;
};

document.addEventListener('DOMContentLoaded', function()
{
    chrome.storage.sync.get("clean_news_feed", function(data)
    {
        if (data["clean_news_feed"])
        {
           enable();
        } else 
        {
            disable();
        }
      });

emojiimg.addEventListener("change", function()
    {
        chrome.storage.sync.set({clean_news_feed: value},function()
        {
        if (emojiimg.src==="https://cdn.shopify.com/s/files/1/1061/1924/files/Zipper-Mouth_Face_Emoji.png?6135488989279264585")
    {
        enable();
    }
  else
  {
      disable();
  };
    });
    });


})


