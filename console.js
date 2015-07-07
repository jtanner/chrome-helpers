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
