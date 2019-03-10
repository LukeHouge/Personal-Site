/*
	Formula by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					visibleClass: 'is-menu-visible',
					target: $body,
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

		// Banner.
			var $banner = $('#banner'),
				$header = $('#header');

			if ($banner.length > 0) {

				// Video check.
					var video = $banner.data('video');

					if (video)
						$window.on('load.banner', function() {

							// Disable banner load event (so it doesn't fire again).
								$window.off('load.banner');

							// Append video if supported.
								if (!skel.vars.mobile
								&&	!skel.breakpoint('large').active
								&&	skel.vars.IEVersion > 9)
									$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

						});

				// IE: Height fix.
					if (skel.vars.browser == 'ie'
					&&	skel.vars.IEVersion > 9) {

						skel.on('-small !small', function() {
							$banner.css('height', '100vh');
						});

						skel.on('+small', function() {
							$banner.css('height', '');
						});

					}

				// More button.
					$banner.find('.more')
						.addClass('scrolly');

				// Header.
					$header
						.addClass('with-banner')
						.addClass('alt');

					$banner.scrollex({
						mode: 'top',
						top: '-100vh',
						bottom: 10,
						enter: function() { $header.addClass('alt'); },
						leave: function() { $header.removeClass('alt'); }
					});

			}

		// Spotlights.
			var $spotlight = $('.spotlight');

			if ($spotlight.length > 0
			&&	skel.canUse('transition'))
				$spotlight.each(function() {

					var $this = $(this);

					$this.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() { $this.addClass('inactive'); },
						enter: function() { $this.removeClass('inactive'); }
					});

				});

		// Features.
			var $features = $('.features');

			if ($features.length > 0
			&&	skel.canUse('transition'))
				$features.each(function() {

					var $this = $(this);

					$this.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						initialize: function() { $this.addClass('inactive'); },
						enter: function() { $this.removeClass('inactive'); }
					});

				});

		// Scrolly.
			$('.scrolly').scrolly();

		// Initial scroll.
			$window.on('load', function() {
				$window.trigger('scroll');
			});
		// Gallery.
			$('.gallery')
				.wrapInner('<div class="inner"></div>')
				.prepend(skel.vars.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					delay:		50,
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				})
				.children('.inner')
					//.css('overflow', 'hidden')
					.css('overflow-y', skel.vars.mobile ? 'visible' : 'hidden')
					.css('overflow-x', skel.vars.mobile ? 'scroll' : 'hidden')
					.scrollLeft(0);

			// Style #1.
				// ...

			// Style #2.
				$('.gallery')
					.on('wheel', '.inner', function(event) {

						var	$this = $(this),
							delta = (event.originalEvent.deltaX * 10);

						// Cap delta.
							if (delta > 0)
								delta = Math.min(25, delta);
							else if (delta < 0)
								delta = Math.max(-25, delta);

						// Scroll.
							$this.scrollLeft( $this.scrollLeft() + delta );

					})
					.on('mouseenter', '.forward, .backward', function(event) {

						var $this = $(this),
							$inner = $this.siblings('.inner'),
							direction = ($this.hasClass('forward') ? 1 : -1);

						// Clear move interval.
							clearInterval(this._gallery_moveIntervalId);

						// Start interval.
							this._gallery_moveIntervalId = setInterval(function() {
								$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
							}, 10);

					})
					.on('mouseleave', '.forward, .backward', function(event) {

						// Clear move interval.
							clearInterval(this._gallery_moveIntervalId);

					});

			// Lightbox.
				$('.gallery.lightbox')
					.on('click', 'a', function(event) {

						var $a = $(this),
							$gallery = $a.parents('.gallery'),
							$modal = $gallery.children('.modal'),
							$modalImg = $modal.find('img'),
							href = $a.attr('href');

						// Not an image? Bail.
							if (!href.match(/\.(jpg|gif|png|mp4)$/))
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Lock.
							$modal[0]._locked = true;

						// Set src.
							$modalImg.attr('src', href);

						// Set visible.
							$modal.addClass('visible');

						// Focus.
							$modal.focus();

						// Delay.
							setTimeout(function() {

								// Unlock.
									$modal[0]._locked = false;

							}, 600);

					})
					.on('click', '.modal', function(event) {

						var $modal = $(this),
							$modalImg = $modal.find('img');

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Already hidden? Bail.
							if (!$modal.hasClass('visible'))
								return;

						// Lock.
							$modal[0]._locked = true;

						// Clear visible, loaded.
							$modal
								.removeClass('loaded')

						// Delay.
							setTimeout(function() {

								$modal
									.removeClass('visible')

								setTimeout(function() {

									// Clear src.
										$modalImg.attr('src', '');

									// Unlock.
										$modal[0]._locked = false;

									// Focus.
										$body.focus();

								}, 475);

							}, 125);

					})
					.on('keypress', '.modal', function(event) {

						var $modal = $(this);

						// Escape? Hide modal.
							if (event.keyCode == 27)
								$modal.trigger('click');

					})
					.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
						.find('img')
							.on('load', function(event) {

								var $modalImg = $(this),
									$modal = $modalImg.parents('.modal');

								setTimeout(function() {

									// No longer visible? Bail.
										if (!$modal.hasClass('visible'))
											return;

									// Set loaded.
										$modal.addClass('loaded');

								}, 275);

							});

	});

})(jQuery);