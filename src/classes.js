function Point( x, y )
{
	this.x = x ? x : 0;
	this.y = y ? y : 0;
}
Point.prototype = {
	length:		function() 		{ return this.x * this.x + this.y * this.y; },
	toString:	function() 		{ return _$("(x=$0, y=$1)", this.x, this.y ); },
	toSource:	function()		{ return _$("new Point($0,$1)", this.x, this.y ); },
	clone:		function() 		{ return new Point( this.x, this.y ); },
	equals:		function( pt )	{ return pt.x == this.x && pt.y == this.y; },
	add:		function( pt ) 	{ return new Point( this.x + pt.x, this.y + pt.y ); },
	subtract:	function( pt ) 	{ return new Point( this.x - pt.x, this.y - pt.y ); }
}

function Dimension( w, h )
{
	this.width = w ? w : 0;
	this.height = h ? h : 0;
}
Dimension.prototype = {
	toString:	function() 		{ return _$("(width=$0, height=$1)", this.width, this.height ); },
	toSource:	function()		{ return _$("new Dimension($0,$1)", this.width, this.height ); },
	clone:		function() 		{ return new Dimension( this.width, this.height ); },
	equals:		function( dm )	{ return dm.width == this.width && pt.height == this.height; }
};

