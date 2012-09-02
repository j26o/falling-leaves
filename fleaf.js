/*
 * Falling Leaf - jQuery plugin
 *
 * Copyright (c) 2010-2012 Roland Baldovino
 *
 * Project home:
 *   http://junebaldovino.com
 *
 * Version:  0.1.0
 *
 * based on http://www.dynamicdrive.com/dynamicindex3/leaves.htm by Kurt Grigg
 *
 */

$.fn.leaf = function(options) {
	var settings = {
		src 	: '',
		fall 	: true,
		dblHt	: false,
		cont	: $(document),
		wind	: false,
		minstep	: .005,
		maxstep	: .05
	};
			
	if(options) {
		$.extend(settings, options);
	}
	
	var img, leaf, winH, winW, ypos, xpos, speed, cstep, step, to;
	img = new Image();
	img.src = settings.src;
	
	var _this = this;
	this.fall = _this.fall = settings.fall;
	_this.pause = false;
	_this.dblHt = this.dblHt = settings.dblHt;
	
	this.leaf = leaf = $(this);
	leaf.attr('src', settings.src);
	leaf.css({opacity:0, 'display': 'none'});
	
	$(img).load(function() {
		winH = settings.cont.height() - this.height;
		winW = settings.cont.width() - this.width;
		
		ypos = Math.round(Math.random()*winH);
		xpos = Math.round(Math.random()*winW);
		
		var hscrll = document.body.scrollTop;		
	
		leaf.css({display:'block', position:'absolute', left:xpos, top:ypos+hscrll}).stop(true).animate({opacity:1},'slow');
	});
	
	speed = Math.random()*3 + 1;
	cstep = -1;
	
	step = Math.random()*settings.maxstep + settings.minstep;
	
	this.move = function(){
		winH = settings.cont.height();
		winW = settings.cont.width();
		var hscrll=document.body.scrollTop;
		var wscrll=document.body.scrollLeft;
		
		sy = speed*Math.sin(90*Math.PI/180);
		sx = speed*Math.cos(cstep);
		ypos+=sy;
		xpos+=sx; 
		
		if (_this.fall) requestAnimFrame(_this.move, window);
		
		if (ypos > winH){
			ypos=-60;
			xpos=Math.round(Math.random()*winW);
			speed=Math.random()*3+1;
		}
		
		var rot = xpos*.4-sx;
		
		leaf.css({left:xpos, top:ypos+hscrll, '-moz-transform': 'rotate(' + rot + 'deg)', '-webkit-transform': 'rotate(' + rot + 'deg)', transform:'rotate(' + rot + 'deg)'});
		
		if(!settings.wind){
			cstep += step;
		}
	}

	if(_this.fall) {_this.move()};
}