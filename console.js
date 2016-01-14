(function() {

  // listen for commands
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (typeof commands[request.command] === "function") {
      commands[request.command]()
    }
  });

  var commands = {
    centerFocusedElement: function () { scrollIntoViewCenter(document.activeElement.parentNode) }
  };

  function scrollIntoViewCenter (e) {
    window.scrollTo(0, documentOffsetTop(e) - (window.innerHeight / 2))
  }

  function documentOffsetTop (e) {
    return e.offsetTop + (e.offsetParent ? documentOffsetTop(e.offsetParent) : 0)
  }

  /* --------------------------------------------- */

  function customConsole() {
    window.json = function(o) {
      return JSON.stringify(o, null, '  ')
    }
  }

  // inject custom console functions
  var script = document.createElement('script'),
  code   = document.createTextNode('(' + customConsole + ')();');
  script.appendChild(code);
  (document.body || document.head || document.documentElement).appendChild(script);

}).call(this);
