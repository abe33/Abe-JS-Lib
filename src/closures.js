// core
function not( f ) 
{
    if( f instanceof Function )
        return function( o ) { return !f( o ); };
    else
        return function( o ) { return o != f; };
}
function equalTo ( n )
{
    return function( o ) { return o == n; };
}
function strictlyEqualTo ( n )
{
    return function( o ) { return o === n; };
}
function nullValue ()
{
    return function( o ) { return o == null; };
}
function notNullValue ()
{
    return function( o ) { return o != null; };
}
function isA ( type )
{
	return function ( o ){ return typeof o == type; }
}
function instanceOf ( type )
{
	return function ( o ){ return o instanceof type; }
}
function inList()
{
	var list = arguments;
	return function ( o ){ return list.indexOf( o ) != -1; }
}
function allOf ()
{
    var args = arguments;
    return function( o )
    {
        var l  = args.length;
        for( var i = 0; i < l; i++ )
        {
            var f = args[i];
            if( f instanceof Function )
            {
                if( !f.apply( null, arguments ) )
                    return false;
            }
            else
            {
                if( c != o )
                    return false;
            }
        }
        return true;
    };
}
function anyOf ()
{
    var args = arguments;
    return function( o )
    {
        var l  = args.length;
        for( var i = 0; i < l; i++ )
        {
            var f = args[i];
            if( f instanceof Function )
            {
                if( f( o ) )
                    return true;
            }
            else
            {
                if( c == o )
                    return true;
            }
        }
        return false;
    };
}
// numbers
function nan ()
{
    return function( o ) { return isNaN( o ); };
}
function notNaN ()
{
    return function( o ) { return !isNaN( o ); };
}
function greaterThan ( n )
{
    return function( o ) { return o > n; };
}
function greaterThanOrEqual ( n )
{
    return function( o ) { return o >= n; };
}
function lowerThan ( n )
{
    return function( o ) { return o < n; };
}
function lowerThanOrEqual ( n )
{
    return function( o ) { return o <= n; };
}
function between( a, b, exclusive )
{
	if( exclusive )
		return function( o ) { return o > a && o < b; }
	else
		return function( o ) { return o >= a && o <= b; }
}
function closeTo( n, d )
{
	return function ( o ) { return Math.abs( n - o ) <= d; }
}
// strings
function contains( s )
{
	return function( o ){ return String(o).indexOf( s ) != -1; }
}
function startWith( s )
{
	return function( o ){ return String(o).indexOf( s ) == 0; }
}
function endWith( s )
{
	return function( o ){ return String(o).indexOf( s ) == String(o).length - s.length; }
}
function re( r )
{
	return function( o ){ return re.test(o); }
}
// objects 
function hasProperty( name, value )
{
	if( value == undefined )
		return function( o ) { return o.hasOwnProperty( name ); }
	else
	{
		if( value instanceof Function )
			return function( o, i, a ) { return o.hasOwnProperty( name ) && value( o[name], i, a ); }
		else
			return function( o ) { return o.hasOwnProperty( name ) && o == value }
	}
}
function hasProperties( dict )
{
	return function( o, i, a )
	{
		for( var j in dict )
		{
			if( !o.hasOwnProperty( j ) )
				return false;
			
			var value = dict[j];
			
			if( value instanceof Function )
			{
				if( !value(o[j],i,a) )
					return false;
			}
			else
			{
				if( o[j] != value )
					return false;
			}
		}
		return true;
	} 
}
function propertiesCount( v )
{
	if( v instanceof Function )
		return function ( o ) 
		{
			var a = [];
			for ( var i in o ) 
				a.push(i);
			
			return v( a.length );
		};
	else 
		return function ( o ) 
		{
			var a = [];
			for ( var i in o ) 
				a.push(i);
			
			return a.length == v;
		};
}
// arrays
function matchCycle ()
{
	var struct = arguments; 
	return function( o, i, a  )
	{
		if( i == 0 && a.length % struct.length != 0 )
			return false;
		
		var i2 = i % struct.length;
		var v = struct[i2];
		
		if( v instanceof Function )
			return v( o, i, a );
		else
			return o == v;
	};
}
function matchFixed ()
{
	var struct = arguments; 
	return function( o, i, a ) 
	{
		if( i == 0 && a.length != struct.length )
			return false;
		
		var v = struct[i];
		
		if( v instanceof Function )
			return v( o, i, a );
		else
			return o == v;
	};
}
function matchRest ()
{
	var struct = arguments; 
	return function ( o, i, a) 
	{
		// the last struct argument is the rest and is optionnal
		if( i == 0 && a.length < struct.length - 1 )
			return false;
		
		// lock the struct cursor to the rest arg when reached
		var i2 = Math.min(i, struct.length - 1);
		var v = struct[i2];
		
		if( v instanceof Function )
			return v( o, i, a );
		else
			return o == v;
	};
}


