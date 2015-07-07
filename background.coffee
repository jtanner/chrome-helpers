chrome.commands.onCommand.addListener (command) ->
  commands[command]() if command in Object.keys commands

commands =
  moveTabLeft:  -> moveTab 'left'
  moveTabRight: -> moveTab 'right'

moveTab = (direction) ->
  chrome.tabs.query windowId: chrome.windows.WINDOW_ID_CURRENT, (tabs) ->
    tab = (t for t in tabs when t.highlighted)[0]
    return unless tab and tab.id
    chrome.tabs.move tab.id, index: getPosition tab, tabs, direction

getPosition = (tab, tabs, direction) ->
  if direction is 'left'
    tab.index - 1
  else
    i = tab.index + 1
    if i is tabs.length then 0 else i
