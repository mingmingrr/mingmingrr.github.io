document.querySelector('#input').value = `\
All prime numbers under 1000, and the parity of their digit sums:
{{exec #
	primes = function* (limit=Infinity) {
		yield 2;
		let n = 3;
		let c = {};
		while(n < limit) {
			if(!(n in c)) {
				yield n;
				c[n*n] = [2*n];
			} else {
				for(let i of c[n])
					if(n + i in c) c[n+i].push(i);
					else c[n+i] = [i];
					delete c[n];
			}
			n += 2;
		}
	}
	digitsum = function(n) { return n == 0 ? 0 : n % 10 + digitsum(Math.floor(n / 10)); };
#/}}\\
{{for n #primes(1000)# }}\\
{{eval #this.n# /}}\\
{{if #digitsum(this.n) % 2 == 1#}}\\
 odd
{{/if}}{{else}}\\
 even
{{/else}}\\
{{/for}}
`;

let timer = null;
function withText(elem, text) {
	while(elem.lastChild) elem.removeChild(elem.lastChild);
	for(let line of ('' + text).split('\n')) {
		elem.appendChild(document.createTextNode(line));
		elem.appendChild(document.createElement('br'));
	}
	if(elem.lastChild) elem.removeChild(elem.lastChild);
}

window.pause = 250;
window.timeout = 1000;
class TimeoutError {}

function evaluate() {
	let worker = null;
	return Promise.race([
		new Promise((resolve, reject) =>
			setTimeout(() => reject(new TimeoutError()), window.timeout)
		),
		new Promise((resolve, reject) => {
			worker = new Worker('worker.js');
			worker.onmessage = resolve;
			worker.onerror = reject;
			worker.postMessage(document.querySelector('#input').value);
		}),
	])
	.then(output =>
		withText(document.querySelector('#output'), output.data)
	)
	.catch(error => {
		console.log(error);
		window.error = error;
		if(error instanceof SyntaxError)
			error = `SyntaxError: line ${error.lineNumber}:${error.columnNumber}, ${error.message}`
		else if(error instanceof TimeoutError) {
			error = 'Timed out after 1 second';
			worker.terminate();
		}
		withText(document.querySelector('#output'), error);
	});
}
evaluate();

document.querySelector('#input').addEventListener('input', () => {
	if(timer !== null) clearTimeout(timer);
	timer = setTimeout(evaluate, window.pause);
});
