// txtElement = <span>, words = data-word, wait = data-wait
const typeWriter = function(txtElement, words, wait = 2000){
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// Type Method
typeWriter.prototype.type = function(){
  // current index of word
  const index = this.wordIndex % this.words.length;
  // get full text of current word
  const fullTxt = this.words[index];

  // checks to see if deleting
  if(this.isDeleting) {
    // remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // insert txt class into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type Speed
  let typeSpeed = 120;

  // Deleting Type Speed
  if(this.isDeleting) {
    // cuts the type speed in half, type speed divided by 2
    typeSpeed /= 2;
  }

  // If word is complete
  if(!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before typing
    typeSpeed = 500;
  }

  //each time a character gets typed or deleted, this is running
  setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);
// Init App
function init() {
  const txtElement = document.querySelector('#typing');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // typeWriter
  new typeWriter(txtElement, words, wait);
}

function responsiveNav() {
  const x = document.querySelector("#nav-links");
  if (x.className === "nav-links") {
    x.className += " responsive";
  } else {
    x.className = "nav-links";
  }
}

function navButton() {
  const y = document.querySelector("#nav-btn");
  if (y.className === "nav-btn") {
    y.className += " responsive";
  } else {
    y.className = "nav-btn";
  }
}
