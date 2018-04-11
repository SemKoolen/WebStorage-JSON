class TextArea {
  constructor() {
}

  initialize () {
    var observe;
    if (window.attachEvent) {
        observe = function (element, event, handler) {
            element.attachEvent('on'+event, handler);
        };
    }
    else {
        observe = function (element, event, handler) {
            element.addEventListener(event, handler, false);
        };
    }

    function init() {
      var y = 0;
      while (y < 3) {
      var text1 = document.getElementsByClassName('text');
      var text = text1[y];
      function resize () {
        var z = 0;
        while (z < 3) {
          text1[z].style.height = 'auto';
          text1[z].style.height = text1[z].scrollHeight+'px';
          z++
        }
      }
      /* 0-timeout to get the already changed text */
      function delayedResize () {
          window.setTimeout(resize, 0);
      }
      observe(text, 'change',  resize);
      observe(text, 'cut',     delayedResize);
      observe(text, 'paste',   delayedResize);
      observe(text, 'drop',    delayedResize);
      observe(text, 'keydown', delayedResize);

      text.focus();
      text.select();
      resize();
      y++;
      }
    }
    init();
  }
}
