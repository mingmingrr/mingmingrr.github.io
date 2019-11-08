importScripts('expander.js', 'parser.js');
onmessage = function(event) { postMessage(expand(parse(event.data))); };
