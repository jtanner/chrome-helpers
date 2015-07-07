// Generated by CoffeeScript 1.9.3
(function() {
  var commands, getPosition, moveTab,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  chrome.commands.onCommand.addListener(function(command) {
    if (indexOf.call(Object.keys(commands), command) >= 0) {
      return commands[command]();
    }
  });

  commands = {
    moveTabLeft: function() {
      return moveTab('left');
    },
    moveTabRight: function() {
      return moveTab('right');
    }
  };

  moveTab = function(direction) {
    return chrome.tabs.query({
      windowId: chrome.windows.WINDOW_ID_CURRENT
    }, function(tabs) {
      var t, tab;
      tab = ((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = tabs.length; j < len; j++) {
          t = tabs[j];
          if (t.highlighted) {
            results.push(t);
          }
        }
        return results;
      })())[0];
      if (!(tab && tab.id)) {
        return;
      }
      return chrome.tabs.move(tab.id, {
        index: getPosition(tab, tabs, direction)
      });
    });
  };

  getPosition = function(tab, tabs, direction) {
    var i;
    if (direction === 'left') {
      return tab.index - 1;
    } else {
      i = tab.index + 1;
      if (i === tabs.length) {
        return 0;
      } else {
        return i;
      }
    }
  };

}).call(this);