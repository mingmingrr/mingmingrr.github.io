function trace(...args) {
	console.log(...args);
	return args[args.length - 1];
}

function evalScope(expr, scope) {
	return (function(e) {
		return eval('' + e);
	}).call(scope, expr);
}

const builtins = Object.freeze({
	eval: function(tag, scope) {
		scope.$content = expand(tag.contents, scope);
		return evalScope(tag.attrs.join(' '), scope);
	},

	exec: function(tag, scope) {
		scope.$content = expand(tag.contents, scope);
		evalScope(tag.attrs.join(' '), scope);
		return '';
	},

	repeat: function(tag, scope) {
		return Array(evalScope(tag.attrs.join(' '), scope))
			.fill(() => expand(tag.contents, scope))
			.map(x => x()).join('');
	},

	for: function(tag, scope) {
		let segments = [];
		for(let item of evalScope(tag.attrs.slice(1).join(' '), scope)) {
			scope[tag.attrs[0]] = item;
			segments.push(expand(tag.contents, scope));
		}
		return segments.join('');
	},

	local: function(tag, scope) {
		let local = [];
		for(let name of tag.attrs) {
			local.push([name, name in scope, scope[name]]);
			delete scope[name];
		}
		let value = expand(tag.contents, scope);
		for(let [name, exists, value] of local) {
			if(exists) scope[name] = value;
			else delete scope[name];
		}
		return value;
	},

	while: function(tag, scope) {
		let segments = [];
		while(evalScope(tag.attrs.join(' '), scope))
			segments.push(expand(tag.contents, scope));
		return segments.join('');
	},

	if: function(tag, scope) {
		scope.$cond = !!evalScope(tag.attrs.join(' '), scope);
		if(!scope.$cond) return '';
		let cond = scope.$cond;
		let value = expand(tag.contents, scope)
		scope.$cond = cond;
		return value;
	},

	elif: function(tag, scope) {
		if(scope.$cond) return '';
		scope.$cond = !!evalScope(tag.attrs.join(' '), scope);
		if(!scope.$cond) return '';
		let cond = scope.$cond;
		let value = expand(tag.contents, scope)
		scope.$cond = cond;
		return value;
	},

	else: function(tag, scope) {
		if(scope.$cond) return '';
		let cond = scope.$cond;
		let value = expand(tag.contents, scope)
		scope.$cond = cond;
		return value;
	},

	macro: function(tag, scope) {
		scope.$tags[tag.attrs[0]] = function(atag, ascope) {
			return expand(tag.contents, ascope);
		};
		return '';
	},

});

function expand(contents, scope={$tags:Object.assign({},builtins)}) {
	return contents.map(function(content) {
		if(typeof content === 'string') return content;
		return scope.$tags[content.name](content, scope);
	}).join('');
}

