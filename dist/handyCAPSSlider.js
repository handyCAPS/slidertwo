
///document.querySelectorAll = null;

function HandyCAPSSlider() {

	var requestAnimationFrame = window.requestAnimationFrame ||
															window.mozRequestAnimationFrame ||
															window.webkitRequestAnimationFrame ||
															window.msRequestAnimationFrame;

	var cancelAnimationFrame = 	window.cancelAnimationFrame ||
															window.mozCancelAnimationFrame ||
															window.webkitCancelAnimationFrame;

	var prefixes = ['webkit','moz','ms','o'];


	this.getNodes = function(selector) {
		if (typeof document.querySelectorAll !== 'function') {
			return document.getElementsByClassName(this.classify(selector).slice(1));
		}
		return document.querySelectorAll(this.classify(selector));
	};

	this.getUnique = function(selector) {
		if (typeof document.querySelectorAll !== 'function') {
			return [document.getElementsByClassName(this.container.slice(1) + ' ' + this.classify(selector).slice(1))];
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
		imgs = this.getUnique(this.items + ' img');

		this.containerNode.style.overflow = 'hidden';

		wrapper.style.whiteSpace = 'nowrap';

		for (var i = 0; i < items.length; i++) {
			items[i].style.display = 'inline-block';
			items[i].style.width = '100%';
		}

		for (var j = 0; j < imgs.length; j++) {
			imgs[j].style.verticalAlign = 'middle';
			imgs[j].style.width = '100%';
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

		this.wrapperNode.style.transform = 'translateX(-' + pos + '%)';

	};

	this.move = 0;
	this.rev = false;

	this.calls = 0;

	this.slide = 1;

	this.animate = function() {

		this.animId = requestAnimationFrame(this.animate.bind(this));

		this.calls++;

		var itemWidth = parseInt(window.getComputedStyle(this.itemNodes[0]).getPropertyValue('width').replace(/[^0-9]/g,''),10);

		var totalWidth = itemWidth * this.itemNodes.length;

		var timePassed = Math.ceil((Date.now() - this.start) / 1000);

		var fps = this.calls / timePassed;

		if (timePassed > this.slideDur + this.animDur) {
			if (this.move <= 100 * this.slide) {
				this.moveWrapper(this.move);
				this.move += Math.ceil((100 / fps) / this.itemNodes.length);
			} else {
				this.slide++;
				this.start = Date.now();
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

		this.animId = requestAnimationFrame(this.animate.bind(this));
	};
}