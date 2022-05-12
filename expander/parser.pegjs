Top = Content*

Content
	= SingleTag
	/ DoubleTag
	/ strings:RawString+
		{ return strings.join('') }

RawString
	= '{' ! '{'
	/ '{{{' count:'{'*
		{ return Array(count.length + 2).fill('\x7b').join('') }
	/ '\\' ('\n' / '\r\n' / '\r')
		{ return '' }
	/ chars:[^{]+
		{ return chars.join('') }

SingleTag
	= '{{' _ fields:TagFields  _ '/' _ '}}'
	{ return { location: location(), name: fields.name
		, attrs: fields.attrs, kwattrs: fields.kwattrs, contents: [] } }

DoubleTag
	= '{{' _ fields:TagFields _ '}}' contents:Top '{{' _ '/' _ end:Identifier _ '}}'
		{ if (fields.name !== end) { expected('tags do not match: ' + fields.name + ' - ' + end) }
		; return { location: location(), name: fields.name ,
			attrs: fields.attrs, kwattrs: fields.kwattrs, contents: contents }
		;}

TagFields
	= name:Identifier attrs:Attributes
	{ return { name: name, attrs: attrs.attrs, kwattrs: attrs.kwattrs } }

Attributes
	= attrs:( __ attr:Attribute { return attr })*
		{ let dict = { Name: [], Pair: [] }
		; for(let {type, value} of attrs) dict[type].push(value)
		; return { attrs: dict.Name, kwattrs: Object.assign({}, dict.Pair) }
		;}

Attribute
	= pair:AttributePair
		{ return { type: 'Pair', value: pair } }
	/ name:AttributeName
		{ return { type: 'Name', value: name } }

AttributeName
	= '#' expr:[^#]* '#'
		{ return expr.join('') }
	/ Identifier
	/ Number
	/ String

AttributePair
	= name:AttributeName '=' value:AttributeName
		{ return { name: value } }

Number
	= sign:[+\-]? lead:[0-9]+ '.' trail:[0-9]* exponent:Exponent?
		{ return parseFloat((sign||'')+lead.join('')+'.'+trail.join('')+(exponent||'')) }
	/ sign:[+\-]? lead:[0-9]* '.' trail:[0-9]+ exponent:Exponent?
		{ return parseFloat((sign||'')+lead.join('')+'.'+trail.join('')+(exponent||'')) }
	/ sign:[+\-]? head:[1-9] tail:[0-9]*
		{ return parseInt((sign || '') + head + tail.join('')) }
	/ sign:[+\-]? '0' [Xx] digits:[0-9a-fA-F]+
		{ return parseInt((sign || '') + digits.join(''), 16) }
	/ sign:[+\-]? '0' [bB] digits:[01]+
		{ return parseInt((sign || '') + digits.join(''), 2) }
	/ sign:[+\-]? ('0'[Oo] / '0') digits:[0-7]+
		{ return parseInt((sign || '') + digits.join(''), 8) }

Exponent
	= [Ee] sign:[+\-]? digits:[0-9]+
		{ return 'e' + (sign || '') + digits.join('') }

String
	= '"' chars:('\\' esc:. { return '\\' + esc } / [^"])* '"'
		{ return eval('"' + chars.join('') + '"') }
	/ "'" chars:('\\' esc:. { return '\\' + esc } / [^'])* "'"
		{ return eval("'" + chars.join('') + "'") }

Identifier
	= head:[a-zA-Z_$] tail:[a-zA-Z0-9_$]*
		{ return head + tail.join('') }

_ 'whitespace'
	= [ \t\n\r]*

__ 'whitespace'
	= [ \t\n\r]+

