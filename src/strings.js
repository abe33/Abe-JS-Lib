function _$( s )
{
	var f;
	var args = [];
	for(var i in arguments)
		args[i] = arguments[i];
	
	args.shift();
	if( args.length > 0 && args[0] instanceof Object )
	{
		var kwargs = args[0];
		f = function ()
		{
			var key = arguments[ 1 ];
			return kwargs.hasOwnProperty(key) ? kwargs[ key ] : arguments[0];
		};
		s = s.replace ( /\${([^}]+)}/g, f );
		args.shift();
	}
	f = function ()
	{
		var index = parseInt ( arguments[ 1 ] );
		return index < args.length ? args[ index ] : arguments[0];
	};
	return s.replace ( /\$([0-9]+)/g, f );
}
