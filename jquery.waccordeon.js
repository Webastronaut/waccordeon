/** Yet another accordeon plugin
 *
 * @param {object} options - Settings for the accordeon
 *
 * @this {object} - jQuery Element
 * @return {object} - Same as this
 *
 */
;
(function ($) {
	$.fn.waccordeon = function (options) {
		var self = {
				$that: $(this),
				$accordeonHeader: '',
				$accordeonContents: '',
				activeClass: 'active',
				offsetToAccordeonHeader: 10,
				animationDuration: 200,
				scrollSpeed: 200,
				scrollOffset: 0,
				initActive: 0,
				openFirstItem: false,
				useCSS: true
			},
			_ = {};

		if (self.$that.length === 0) {
			return;
		}

		/** Show related accordeon content
		 *
		 * @private
		 * @this {object} - Clicked accordeon header
		 * @return void
		 */
		_.showAccordeonContent = function () {
			var $that = $(this);

			if ($that.hasClass(self.activeClass)) {
				_.closeAll();
			} else {
				_.closeAll();

				$that.addClass(self.activeClass);

				if(!self.useCSS) {
					$that.next('div').stop(true, true).slideDown(self.animationDuration, function () {
						_.moveToPosition.call($that);
					});
				}
			}
		};

		/** Close opened accordeons and remove active classes
		 *
		 * @private
		 * @return void
		 */
		_.closeAll = function () {
			self.$accordeonHeader.removeClass(self.activeClass);
			if(!self.useCSS) {
				self.$accordeonContents.stop(true, true).slideUp(self.animationDuration);
			}
		};

		/** Scroll document to opened accordeon header
		 *
		 * @private
		 * @this {object} - Clicked accordeon header
		 * @return void
		 */
		_.moveToPosition = function () {
			var $that = $(this);

			window.setTimeout(function () {
				$('html, body').stop(true, true).animate({
					scrollTop: ($that.offset().top - self.offsetToAccordeonHeader) - self.scrollOffset
				}, self.scrollSpeed);
			}, self.animationDuration);
		};

		/** Initialize accordeon
		 *
		 * @constructor
		 * @param Object obj - Settings
		 * @return {object} $that - this
		 */
		self.init = function () {
			var hash = window.location.hash.substr(1),
				hashEqualId = false;

			if (options.length !== 0) {
				$.extend(self, options);
			}

			self.$accordeonHeader.each(function (i) {
				var $that = $(this);

				if ($that.attr('id') === hash) {
					self.initActive = i;
					hashEqualId = true;
				}
			});

			self.$accordeonHeader.on('click', _.showAccordeonContent);

			if(!self.useCSS) {
				self.$accordeonContents.hide();
			}

			if (self.openFirstItem || hashEqualId) {
				self.$accordeonContents.eq(self.initActive).addClass(self.activeClass);
				if(!self.useCSS) {
					self.$accordeonContents.eq(self.initActive).show()
				}
			}

			return self.$that;
		};

		self.init();
	};
})(jQuery);