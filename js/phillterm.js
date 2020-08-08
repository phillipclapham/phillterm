/* To Do:

Implement - Totally mouse free mode, History command, game, screensaver, projects / experience, quotes, pics, see Phill, search, apps?

Need to implment callbacks for mouse free mode, meed to add resume command

*/

// Initialize first run
let termBody = document.querySelector(".conBody");
let moveNum = 0;
const commands = {
  "": {content: "", callback: ""},
  about: {
    content: "<p class='conBodyOutput'>Hi! My name is Phillip Clapham. I am a creative and deeply passionate software developer, full stack web developer, and designer with a penchant for bringing the web to life with unique, one of a kind experiences.</p><br><p class='conBodyOutput'>My Skills:</p><p class='conBodyOutput'>* Full stack web development - HTML, CSS, JS, PHP, Node, React</p><p class='conBodyOutput'>* WordPress development - custom site, theme, and plugin expert</p><p class='conBodyOutput'>* SEO expert</p><p class='conBodyOutput'>* Experienced content creator and designer</p><p class='conBodyOutput'>* Experienced business solutions architect</p><br><p class='conBodyOutput'>See my full resume <a href='https://docs.google.com/document/d/1ojiGf6SOuuga02A8VHizKmpC7C3wT5oVoycqTey_eeo/edit?usp=sharing' target='_blank'>here</a> or type the command \"resume\".</p>",
    callback: ""
  },
  contact: {
    content: "<p class='conBodyOutput'>Contact Phill:</p><br><p class='conBodyOutput'>1. <a href='mailto:pclapham42@gmail.com?subject=Hello!'>Email</a></p><p class='conBodyOutput'>2. <a href='https://github.com/phillipclapham' target='_blank'>Phill's Github</a></p><p class='conBodyOutput'>3. <a href='https://linkedin.com/in/phillipclapham' target='_blank'>Phill's LinkedIn</a></p>",
    callback: ""
  },
  help: {
    content: "<p class='conBodyOutput'>List of Available Commands:</p><br><p class='conBodyOutput'><span class='cboText'>&nbsp;&nbsp;about:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About Phill</p><p class='conBodyOutput'><span class='cboText'>&nbsp;&nbsp;clear:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clear screen</p><p class='conBodyOutput'><span class='cboText'>&nbsp;&nbsp;contact:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact Phill</p>",
    callback: ""
  }
};
let commandHistory = [];

//Main term function
function runTerm(moveNum, moveText) {
  if (moveText in commands) {
    termBody.innerHTML = termBody.innerHTML + `<div class="conBodyOutput">${commands[moveText].content}</div>`;
  } else {
    termBody.innerHTML = termBody.innerHTML + `<p class="conBodyOutput">Command \"${moveText}\" not found. Type \"help\" for available commands.</p>`;
  }
  termBody.innerHTML = termBody.innerHTML + `<br><p class="conBodyText">~$</p><input type="text" id="conInput${moveNum}" class="conBodyInput">`;
  termBody.querySelector(`#conInput${moveNum}`).focus();

  let inputGrab = document.querySelectorAll(".conBodyInput");
  for (let i = 0; i < inputGrab.length - 1; i++) {
    inputGrab[i].value = commandHistory[i];
  }

  let keyCount = 0;
  let thisInput = termBody.querySelector(`#conInput${moveNum}`);
  thisInput.addEventListener("keyup", (event) => {
    
    // Enter key
    if (event.keyCode === 13) {
      event.preventDefault();
      keyCount = 0;
      let enteredVal = thisInput.value;
      commandHistory.push(enteredVal);
      if (enteredVal === "clear") {
        termBody.innerHTML = "";
        moveNum = -1;
        enteredVal = "";
        commandHistory = [];
      }
      runTerm(moveNum + 1, enteredVal);
    }
    
    // Up key - scroll back through command history
    if (event.keyCode === 38) {
      event.preventDefault();
      keyCount++;
      if (keyCount > commandHistory.length) {
        keyCount = commandHistory.length;
      }
      thisInput.value = commandHistory[commandHistory.length - keyCount];
    }

    // Down key - scroll up through history
    if (event.keyCode === 40) {
      event.preventDefault();
      keyCount--;
      if (keyCount < 1) {
        keyCount = 1;
      }
      thisInput.value = commandHistory[commandHistory.length - keyCount];
    }
  });
}

// Run Term
runTerm(moveNum, "");