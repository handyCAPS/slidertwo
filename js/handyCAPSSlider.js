


function HandyCAPSSlider() {

	var requestAnimationFrame = window.requestAnimationFrame ||
															window.mozRequestAnimationFrame ||
															window.webkitRequestAnimationFrame ||
															window.msRequestAnimationFrame;

	var cancelAnimationFrame = 	window.cancelAnimationFrame ||
															window.mozCancelAnimationFrame ||
															window.webkitCancelAnimationFrame;


	this.getNodes = function(selector) {
		if (!document.querySelectorAll) {
			return document.getElementsByClassName(this.classify(selector).slice(1));
		}
		return document.querySelectorAll(this.classify(selector));
	};

	this.getUnique = function(selector) {
		if (!document.querySelectorAll) {
			return document.getElementsByClassName(this.container.slice(1) + ' ' + this.classify(selector).slice(1));
		}
		return document.querySelectorAll(this.container + ' ' + this.classify(selector));
	};

	this.classify = function(name) {
		if (!name) {return;}
		return /^\./.test(name) ? name : '.' + name;
	};

	this.basicCSS = function() {
		var
		wrapper = this.getUnique(this.itemWrapper)[0],
		items = this.getUnique(this.items),
		imgs = wrapper.querySelectorAll('img');

		this.containerNode.style += '; overflow: hidden';
		wrapper.style = ' white-space: nowrap;';

		for (var i = 0; i < items.length; i++) {
			items[i].style += ';display: inline-block; width: 100%;';
		}

		for (var j = 0; j < imgs.length; j++) {
			imgs[j].style += ';vertical-align: middle; width: 100%';
		}

	};

	this.wrapItems = function() {

		var
		container = this.getNodes(this.container)[0],
		items     = this.getNodes(this.items),
		wrapper 	= document.createElement('div');

		wrapper.className = 'item-wrapper';

		this.itemWrapper = this.classify(wrapper.className);

		container.appendChild(wrapper);

		for (var i = 0; i < items.length; i++) {
			wrapper.appendChild(items[i]);
		}

		this.wrapperNode = this.getUnique(this.itemWrapper)[0];
	};

	this.moveWrapper = function(pos) {
		this.wrapperNode.style.transform = 'translateX(-' + pos + 'px)';
	};

	this.move = 0;
	this.rev = false;

	this.calls = 1;

	this.slide = 1;

	this.animate = function() {

		this.animId = requestAnimationFrame(this.animate.bind(this));

		this.calls++;

		var itemWidth = parseInt(window.getComputedStyle(this.itemNodes[0]).getPropertyValue('width'),10);

		var totalWidth = itemWidth * --this.itemNodes.length;

		var timePassed = Math.floor((Date.now() - this.start) / 1000);

		var fps = this.calls / timePassed;

		if (timePassed > this.animDur) {console.log(this.calls);}

		if (!this.rev && timePassed > this.slideDur && this.move < itemWidth * this.slide) {
			this.moveWrapper(this.move);
			this.move += itemWidth / fps;
		}

		if (timePassed > this.slideDur + this.animDur) {
			this.start = Date.now();
			this.calls = 1;
			this.slide++;
			return;
		}

		if (this.move > totalWidth && timePassed > this.slideDur) {
			this.rev = true;
			this.slide = 1;
		}

		if (this.rev) {
			if (this.move > 0) {
				this.moveWrapper(this.move);
				this.move -= totalWidth / (this.animDur * 60);
			} else {
				this.rev = false;
			}
		}

	};

	this.init = function() {
		var options = arguments[0] || {};

		this.container     = options.container || '.container';
		this.items         = options.items || '.slider-item';

		this.animDur = options.animationDuration || 2;
		this.slideDur = options.slideDuration || 2;

		this.containerNode = this.getNodes(this.container)[0];
		this.itemNodes = this.getUnique(this.items);

		this.start = Date.now();

		this.wrapItems();

		this.basicCSS();

		this.animate();


		//this.animId = requestAnimationFrame(this.animate.bind(this));
	};
}