// Initialize first run
const termBody = document.querySelector('.conBody');
const moveNum = 0;
let commandHistory = [];
let callBackMode;
const commands = {
  '': {content: '', callback: ''},
  'about': {
    content: '<p class="conBodyOutput">Hi! My name is Phillip Clapham. I am a creative and deeply passionate software developer, full stack web developer, and designer with a penchant for bringing the web to life with unique, one of a kind experiences.</p><br><p class="conBodyOutput">My Skills:</p><p class="conBodyOutput">* Full stack web development - HTML, CSS/SCSS, JS, PHP, Node, React</p><p class="conBodyOutput">* WordPress development - custom site, theme, and plugin expert</p><p class="conBodyOutput">* SEO expert</p><p class="conBodyOutput">* Experienced content creator and designer</p><p class="conBodyOutput">* Experienced business solutions architect</p><br><p class="conBodyOutput">See my full resume <a href="https://docs.google.com/document/d/1ojiGf6SOuuga02A8VHizKmpC7C3wT5oVoycqTey_eeo/edit?usp=sharing" target="_blank">here</a> or type the command \"resume\".</p>',
    callback: '',
    callbackContent: '',
  },
  'contact': {
    content: '<p class="conBodyOutput">Contact Phill:</p><br><p class="conBodyOutput">1. <a class="conBodyOutputA1" href="mailto:pclapham42@gmail.com?subject=Hello!">Email</a></p><p class="conBodyOutput">2. <a class="conBodyOutputA2" href="https://github.com/phillipclapham" target="_blank">Phill\'s Github</a></p><p class="conBodyOutput">3. <a class="conBodyOutputA3" href="https://linkedin.com/in/phillipclapham" target="_blank">Phill\'s LinkedIn</a></p>',
    callback: 'contact',
    callbackContent: '<br><br><strong><p class="conBodyOutput">Make a selection (1, 2, 3, or any other key  to exit):</p></strong>',
  },
  'help': {
    content: '<p class="conBodyOutput">List of Available Commands:</p><br><p class="conBodyOutput"><span class="cboText">&nbsp;&nbsp;about:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About Phill</p><p class="conBodyOutput"><span class="cboText">&nbsp;&nbsp;clear:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clear screen</p><p class="conBodyOutput"><span class="cboText">&nbsp;&nbsp;contact:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact Phill</p><p class="conBodyOutput"><span class="cboText">&nbsp;&nbsp;resume:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View Phill\'s resume</p><p class="conBodyOutput"><span class="cboText">&nbsp;&nbsp;history:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View command history</p><p class="conBodyOutput"><span class="cboText">&nbsp;&nbsp;quote:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Return a random quote</p>',
    callback: '',
    callbackContent: '',
  },
  'quote': {
    content: '<p class="conBodyOutput">A Quote For Your Brain:</p>',
    callback: 'quote',
    callbackContent: ['<p class="conBodyOutput">\“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\” – Martin Fowler</p>', '<p class="conBodyOutput">\“First, solve the problem. Then, write the code.\” – John Johnson</p>', '<p class="conBodyOutput">\“Experience is the name everyone gives to their mistakes.\” – Oscar Wilde</p>', '<p class="conBodyOutput">\“Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.\” – Dan Salomon</p>', '<p class="conBodyOutput">\“In order to be irreplaceable, one must always be different\” – Coco Chanel</p>', '<p class="conBodyOutput">\“Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.\” – Antoine de Saint-Exupery</p>'],
  },
};

/**
 *
 * @param {Number} moveNum - Move Number
 * @param {String} moveText - String of last command typed
 *
 */
function runTerm(moveNum, moveText) {
  let consoleCustom = false;
  if (moveText in commands) {
    termBody.innerHTML = termBody.innerHTML + `<div class="conBodyOutput">${commands[moveText].content}</div>`;
    if (commands[moveText].callback !== '') {
      consoleCustom = true;
      callBackMode = commands[moveText].callback;
    }
  } else {
    termBody.innerHTML = termBody.innerHTML + `<p class="conBodyOutput">Command \'${moveText}\' not found. Type \'help\' for available commands.</p>`;
  }
  if (!consoleCustom) {
    termBody.innerHTML = termBody.innerHTML + `<br><p class='conBodyText'>~$</p><input type='text' id='conInput${moveNum}' class='conBodyInput' autocomplete="off">`;
    termBody.querySelector(`#conInput${moveNum}`).focus();
  } else {
    if (callBackMode === 'quote') {
      let r = Math.floor(Math.random() * commands[moveText].callbackContent.length);
      termBody.innerHTML = termBody.innerHTML + commands[moveText].callbackContent[r];
      termBody.innerHTML = termBody.innerHTML + `<br><p class='conBodyText'>~$</p><input type='text' id='conInput${moveNum}' class='conBodyInput' autocomplete="off">`;
      termBody.querySelector(`#conInput${moveNum}`).focus();
    } else {
      termBody.innerHTML = termBody.innerHTML + commands[moveText].callbackContent;
      termBody.innerHTML = termBody.innerHTML + `<br><p class='conBodyText'>~~</p><input type='text' id='conInput${moveNum}' class='conBodyInput' autocomplete="off">`;
      termBody.querySelector(`#conInput${moveNum}`).focus();
    }
  }

  const inputGrab = document.querySelectorAll('.conBodyInput');
  for (let i = 0; i < inputGrab.length - 1; i++) {
    inputGrab[i].value = commandHistory[i];
  }
  let keyCount = 0;
  const thisInput = termBody.querySelector(`#conInput${moveNum}`);
  thisInput.addEventListener('keyup', (event) => {
    if (callBackMode === 'quote') consoleCustom = false;
    if (consoleCustom) {
      if (event.keyCode === 13) {
        event.preventDefault();
        keyCount = 0;
        let enteredVal = thisInput.value;
        commandHistory.push(enteredVal);
        if (callBackMode === 'contact') {
          switch (enteredVal) {
            case '1':
              document.querySelector('.conBodyOutputA1').click();
              termBody.innerHTML = termBody.innerHTML + 'Email Sent';
              enteredVal = '';
              break;
            case '2':
              document.querySelector('.conBodyOutputA2').click();
              termBody.innerHTML = termBody.innerHTML + '<br>Github opened in new tab.';
              enteredVal = '';
              break;
            case '3':
              document.querySelector('.conBodyOutputA3').click();
              termBody.innerHTML = termBody.innerHTML + '<br>LinkedIn opened in new tab.';
              enteredVal = '';
              break;
            default:
              enteredVal = '';
              break;
          }
        }
        runTerm(moveNum + 1, enteredVal);
      }
    } else {
      // Enter key
      if (event.keyCode === 13) {
        event.preventDefault();
        keyCount = 0;
        let enteredVal = thisInput.value;
        commandHistory.push(enteredVal);
        if (enteredVal === 'clear') {
          termBody.innerHTML = '';
          moveNum = -1;
          enteredVal = '';
          commandHistory = [];
        }
        if (enteredVal === 'resume') {
          termBody.innerHTML = termBody.innerHTML + '<br>Resume opened in new window';
          window.open('https://docs.google.com/document/d/1ojiGf6SOuuga02A8VHizKmpC7C3wT5oVoycqTey_eeo/edit?usp=sharing', '_blank');
          enteredVal = '';
        }
        if (enteredVal === 'history') {
          termBody.innerHTML = termBody.innerHTML + `<br>${commandHistory}`;
          enteredVal = '';
        }
        runTerm(moveNum + 1, enteredVal);
      }
      // Up key - scroll back through command history
      if (event.keyCode === 38) {
        event.preventDefault();
        keyCount++;
        if (moveNum > 0) {
          if (keyCount > commandHistory.length) {
            keyCount = commandHistory.length;
          }
          console.log(keyCount);
          thisInput.value = commandHistory[commandHistory.length - keyCount];
        }
      }
      // Down key - scroll up through history
      if (event.keyCode === 40) {
        event.preventDefault();
        keyCount--;
        if (moveNum > 0) {
          if (keyCount < 0) {
            keyCount = 0;
          }
          if (keyCount > 0) {
            thisInput.value = commandHistory[commandHistory.length - keyCount];
          } else {
            thisInput.value = '';
          }
        }
      }
    }
  });
}

// Setup initial help text
setTimeout(() => {
  document.querySelector('.conTitleTextSubSmall').classList.add('active');
}, 1000);

setTimeout(() => {
  document.querySelector('.conTitleTextSubSmall').classList.add('active2');
}, 10000);

setTimeout(() => {
  document.querySelector('.conBody').classList.add('active3');
}, 11000);

// Run Term
runTerm(moveNum, '');
