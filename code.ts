// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__,);


figma.ui.postMessage({
    type : "text",
    number : figma.currentPage.selection.length
});


// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.


figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

    msg = JSON.parse(msg);

    console.log(msg.type);
  if (msg.type === 'names' || msg.type === 'phones' || msg.type === 'emails') {
    figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(()=>{

        let count = 0;
      figma.currentPage.selection.forEach((item : TextNode)=>{

          console.log(msg.data[count]);
              item.deleteCharacters(0,item.characters.length)
              item.insertCharacters(0,msg.data[count]);
              count++;
          });
      });

  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
// figma.closePlugin();


};




