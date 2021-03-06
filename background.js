
var connectSrcAddition = 'wss://gtg.steem.house:8090';

var onHeadersReceived = function(details) {
  for (var i = 0; i < details.responseHeaders.length; i++) {
    if ('content-security-policy' === details.responseHeaders[i].name.toLowerCase() ||
      'x-content-security-policy' === details.responseHeaders[i].name.toLowerCase()) {
      details.responseHeaders[i].value = (details.responseHeaders[i].value || '')
        .replace('connect-src ', 'connect-src ' + connectSrcAddition + ' ');
    }
  }

  return {
    responseHeaders: details.responseHeaders
  };
};

var filter = {
  urls: ['https://steemit.com/*'],
  types: ["main_frame"]
};

chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, filter, [
  "blocking", 
  "responseHeaders"
]);



var onMessage = function(request, sender, sendResponse) {
  console.log('Received request: ', request);
  if (request.type == 'ajax'){
    var ajax = request.ajax;
    $.ajax({
      url: ajax.url,
      type: ajax.method,
      error: function(err){
        sendResponse({error: err});
      },
      success: function(data) {
        sendResponse({data: data});
      }
    });
    return true;
  }else if (request.type == 'manifest'){
    var manifestData = chrome.runtime.getManifest();
    var currentVersion = manifestData.version;

    $.get('https://raw.githubusercontent.com/bitcoiners/steemit-more-info/master/manifest.json?t=' + new Date().getTime())
    .done(function(data) {
      sendResponse({
        currentVersion: currentVersion,
        newManifest: data
      });
    });
    return true;
  }else{
    sendResponse({});
  }
};

chrome.runtime.onMessage.addListener(onMessage);
chrome.runtime.onMessageExternal.addListener(onMessage);

