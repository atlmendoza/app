const dForm = document.querySelector('form');
dForm.addEventListener('submit', dispData); // onsubmit calls dispData function below

// to display the entered values on submit
function dispData(event) {
  // prevent default action of submit which to either to reload the page or call another page
  event.preventDefault(); 
  if (confirm('Sure to Submit?')) {  
    // to actually submit the form
    dForm.submit()
  }
}

// to remove entered and displayed information by the user 
function delData() {
  returnValue = false
  if (confirm('Sure to Reset?')) {   
    returnValue = true;
  }
  return returnValue;
}

// functions below will handle onfocus and onblur events
function toFocus(anoThis) {
    anoThis.style.backgroundColor="pink"
}

function toBlur(anoThis) {
    anoThis.style.backgroundColor="lightgreen";
}

