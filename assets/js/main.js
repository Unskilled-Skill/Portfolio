/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

    // Scrolly links with per-link customization.
        // Default offset uses header height; can override via data-offset on the link.
        // For `.goto-next` arrows, default anchor is 'middle' to center the next section.
        $('.scrolly').each(function () {
            var $el = $(this);
            var $header = $('#header');
            var dataOffset = $el.data('offset');
            var dataOffsetExtra = parseInt($el.data('offset-extra'), 10);
            var dataAnchor = $el.data('anchor'); // 'top' or 'middle'
            var dataSpeed = $el.data('speed');

            var offsetOpt = (typeof dataOffset !== 'undefined')
                ? parseInt(dataOffset, 10)
                : function () {
                    var base = ($header.outerHeight() || 0);
                    var extra = isNaN(dataOffsetExtra) ? 0 : dataOffsetExtra;
                    return base + extra;
                };

            $el.scrolly({
                speed: (typeof dataSpeed !== 'undefined') ? parseInt(dataSpeed, 10) : 900,
                offset: offsetOpt,
                anchor: (typeof dataAnchor !== 'undefined') ? dataAnchor : ($el.hasClass('goto-next') ? 'middle' : 'top')
            });
        });

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}
    
	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();
// Project Grid Hover Effects
$('.grid-item').each(function() {
	$(this).on('mousemove', function(e) {
	  const x = e.pageX - $(this).offset().left;
	  const y = e.pageY - $(this).offset().top;
	  
	  const centerX = $(this).width()/2;
	  const centerY = $(this).height()/2;
	  
	  const moveX = (x - centerX) / 20;
	  const moveY = (y - centerY) / 20;
	  
	  $(this).find('img').css({
		'transform': `scale(1.05) translate(${moveX}px, ${moveY}px)`
	  });
	});
	
	$(this).on('mouseleave', function() {
	  $(this).find('img').css({
		'transform': 'scale(1) translate(0, 0)'
	  });
	});
  });

  // Add this to your existing jQuery code
$('.grid-item').on('mousemove', function(e) {
	if (window.innerWidth > 980) { // Only on desktop
	  const $this = $(this);
	  const x = e.pageX - $this.offset().left;
	  const y = e.pageY - $this.offset().top;
	  const centerX = $this.width()/2;
	  const centerY = $this.height()/2;
	  const moveX = (x - centerX) / 15;
	  const moveY = (y - centerY) / 15;
	  
	  $this.find('img').css({
		'transform': `scale(1.05) translate(${moveX}px, ${moveY}px)`
	  });
	}
  }).on('mouseleave', function() {
	$(this).find('img').css({
	  'transform': 'scale(1) translate(0, 0)'
	});
  });
})(jQuery);

// Lightbox for project grid images (with nav + close)
(function(){
  var $body = $('body');
  var tpl = ''+
    '<div class="lightbox" aria-hidden="true" aria-modal="true" role="dialog" aria-label="Image viewer">'+
      '<button class="lightbox__btn lightbox__close" aria-label="Close">×</button>'+
      '<button class="lightbox__btn lightbox__prev" aria-label="Previous">‹</button>'+
      '<img class="lightbox__img" alt="Expanded image" />'+
      '<div class="lightbox__caption" role="note"></div>'+
      '<button class="lightbox__btn lightbox__next" aria-label="Next">›</button>'+
    '</div>';
  var $lightbox = $(tpl).appendTo($body);

  var gallery = [];
  var index = -1;

  function show(i){
    if (!gallery.length) return;
    // wrap around
    index = (i + gallery.length) % gallery.length;
    var item = gallery[index];
    $lightbox.find('.lightbox__img').attr('src', item.src);
    $lightbox.find('.lightbox__caption').text(item.alt || '');
  }

  function openFrom($img){
    // Build gallery from nearest grid container
    var $container = $img.closest('.project-grid-container');
    var $items = $container.find('.grid-item');
    gallery = $items.map(function(){
      var $it = $(this);
      var $im = $it.find('img').first();
      var label = ($it.find('.overlay').text() || $im.attr('alt') || '').trim();
      return { src: $im.attr('src'), alt: label };
    }).get();
    index = $items.index($img.closest('.grid-item'));
    show(index);
    $lightbox.addClass('open').attr('aria-hidden','false');
    $body.addClass('no-scroll');
  }

  function close(){
    $lightbox.removeClass('open').attr('aria-hidden','true');
    $lightbox.find('.lightbox__img').attr('src','');
    $body.removeClass('no-scroll');
    gallery = []; index = -1;
  }

  // Open on image click
  $(document).on('click', '.project-grid-container .grid-item img', function(e){
    e.preventDefault();
    openFrom($(this));
  });

  // Close when clicking image or backdrop
  $lightbox.on('click', function(e){
    var $t = $(e.target);
    if ($t.is('.lightbox__img') || $t.is('.lightbox')) close();
  });

  // Controls
  $lightbox.on('click', '.lightbox__close', function(e){ e.preventDefault(); close(); });
  $lightbox.on('click', '.lightbox__prev', function(e){ e.preventDefault(); show(index-1); });
  $lightbox.on('click', '.lightbox__next', function(e){ e.preventDefault(); show(index+1); });

  // Keyboard
  $(document).on('keyup', function(e){
    if (!$lightbox.hasClass('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index-1);
    else if (e.key === 'ArrowRight') show(index+1);
  });
})();
