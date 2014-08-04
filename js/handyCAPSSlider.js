


function HandyCAPSSlider() {

	var requestAnimationFrame = window.requestAnimationFrame ||
															window.mozRequestAnimationFrame ||
															window.webkitRequestAnimationFrame ||
															window.msRequestAnimationFrame;


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
		imgs = this.getUnique(this.items + ' img');

		this.getNodes(this.container)[0].style += '; overflow: hidden';
		wrapper.style = ' white-space: nowrap;';

		for (var i = 0; i < items.length; i++) {
			items[i].style = 'display: inline-block; width: 100%;';
		}

		for (var j = 0; j < imgs.length; j++) {
			imgs[j].style = 'vertical-align: middle; width: 100%';
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

	this.move = 0;
	this.rev = false;

	this.animate = function() {

		if (!this.rev && this.move < 1000) {
			this.wrapperNode.style.transform = 'translateX(-' + this.move + 'px)';
			this.move++;
		} else {
			this.rev = true;
			this.wrapperNode.style.transform = 'translateX(-' + this.move + 'px)';
			this.move--;
			if (this.move < 1) {this.rev = false;}
		}

		requestAnimationFrame(this.animate.bind(this));
	};

	this.init = function() {
		var options = arguments[0] || {};

		this.container     = options.container || '.container';
		this.items         = options.items || '.slider-item';

		this.containerNode = this.getNodes(this.container)[0];

		this.wrapItems();

		this.basicCSS();

		console.log(this.wrapperNode.style);

		this.animId = requestAnimationFrame(this.animate.bind(this));
	};
}