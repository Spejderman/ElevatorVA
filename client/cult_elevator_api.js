/**
 * @return {string}
 */
function GetCultData(topic, column) {
    var result = GetRequest(
        'https://johno.games/cult_elevator/cult_interface.php?topic=' + topic + '&column=' + column
    );
    if(result !== false) return result;
    return "couldn't find question for topic " + topic;
}

/**
 * @return {string}
 */
function SetCultData(topic, value) {
    var result = GetRequest(
        'https://johno.games/cult_elevator/cult_interface.php?topic=' + topic + '&column=value' + '&value=' + value
    );
    if(result !== false) return result;
    return "couldn't set value for topic " + topic;
}

function GetRequest(url, success, error) {
    var req = false;
    try {
        // Most browsers
        req = new XMLHttpRequest();
    } catch (e) {
        // IE
        req = new ActiveXObject("Msxml2.XMLHTTP");
        // Not more robust than this
    }

    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
        if(req.readyState == 4) {
            return req.status === 200 ?
                success(req.responseText) : error(req.status);
        }
    };
    req.open("GET", url, true);
    req.send(null);
    return req;
}