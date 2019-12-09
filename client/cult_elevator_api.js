/**
 * @return {string}
 */
function GetCultData() {
  var result = GetRequest(
    "https://johno.games/cult_elevator/cult_interface.php?operation=read"
  );

  if (result !== false) return result;
  return "couldn't find question for topic " + topic;
}

/**
 * @return {string}
 */
function SetCultData(value) {
  var result = GetRequest(
    "https://johno.games/cult_elevator/cult_interface.php?operation=write&value=" +
      value
  );
  if (result !== false) return result;
  return "couldn't set value for topic " + topic;
}

/**
 * @return {string}
 */
function GetCount() {
  var result = GetRequest(
    "https://johno.games/cult_elevator/cult_interface.php?operation=count"
  );
  if (result !== false) return result;
  return "couldn't get a count";
}

function GetRequest(url) {
  oldStory = "";
  var req = false;
  try {
    // Most browsers
    req = new XMLHttpRequest();
  } catch (e) {
    // IE
    req = new ActiveXObject("Msxml2.XMLHTTP");
    // Not more robust than this
  }

  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status === 200) {
      // testResult.textContent = req.responseText;
      oldStory = req.responseText;
    }
  };

  req.open("GET", url, true);
  req.send();
  return req;
}
