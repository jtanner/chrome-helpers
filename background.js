(function() {
  chrome.commands.onCommand.addListener(function(command) {
    if (typeof commands[command] === "function") {
      commands[command]();
    }
  });

  commands = {
    centerFocusedElement: function() {
      withTabs(function (tab) {
        chrome.tabs.sendMessage(tab.id, {command: 'centerFocusedElement'});
      });
    },
    moveTabLeft: function() {
      return moveTab('left');
    },
    moveTabRight: function() {
      return moveTab('right');
    }
  };

  function moveTab(direction) {
    withTabs(function (tab, tabs) {
      if (!(tab && tab.id)) {return}
      chrome.tabs.move(tab.id, {
        index: getPosition(tab, tabs, direction)
      });
    });
  }

  function getPosition(tab, tabs, direction) {
    var filteredTabs = tabs.filter(function (t) { return t.pinned === tab.pinned });
    if (direction === 'left') {
      var i = tab.index - 1;
      return canMove(tab, tabs, i) ? i : filteredTabs[filteredTabs.length - 1].index;
    } else {
      var i = tab.index + 1;
      return canMove(tab, tabs, i) ? i : filteredTabs[0].index;
    }
  }

  function canMove(tab, tabs, newIndex) {
    var tabAtPosition = tabs[newIndex]
    return tabAtPosition && tabAtPosition.pinned === tab.pinned
  }

  function withTabs(callback) {
    chrome.tabs.query({
      currentWindow: true
    }, function(tabs) {
      var activeTab = tabs.filter(function(t) { return t.highlighted })[0]
      callback(activeTab, tabs)
    });
  }

}).call(this);
