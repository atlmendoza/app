
  // executed right away when this page listen.hbs gets loaded on the client's browser
  let list = '{{songList}}' // list of songs contructed in index.js
  let s = "";
  // construct the list of songs to be displayed
  if (list.length > 0) {
    list = list.split(",");
    for (i=0; i<list.length; i++) {
      dValue = list[i]
      s += "<li onclick='assignValue(this.innerHTML)' style='list-style-type:square'>" + list[i] + "</li>";

    }

    // show actual list and then number of songs read
    s += `<li style="text-align:right; color: blue; font-size: 0.75em"> 
          #of Songs: ${list.length} </li>`
    dList.innerHTML = s;
  }

  // called when a user clicks on a title from the list of song
  function assignValue(dValue) {
     document.getElementById("title").value = dValue;
  }

