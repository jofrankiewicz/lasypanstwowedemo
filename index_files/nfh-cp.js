var Nfhcp = {
    Header : {
        headerElement : null,

        create : function(element) {
            var result = Object.create(Nfhcp.Header);

            result.headerElement = $(element);
            // obsługa zdarzenia kliknięcia w przycisk nawigacji
            result.headerElement.find('#header-button-navigation').on('click', function(event) {
                result.navigationButtonClicked.call(result, event);
            });

            return result;
        },

        navigationButtonClicked : function(event) {
            var be = $(event.currentTarget);
            var hde = $('#header-divisions');
            var nte = $('#navigation-top');
            if (be.hasClass('open')) {
                be.removeClass('open');
                hde.addClass('open');
                nte.removeClass('open');
            } else {
                be.addClass('open');
                hde.removeClass('open');
                nte.addClass('open');
            }
        }
    },

    NavigationTop : {
        navigationElement : null,

        create : function(element) {
            var result = Object.create(Nfhcp.NavigationTop);

            result.navigationElement = $(element);

            //dodanie klasy focus-within, przy ustawieniu focus na podrzędnym a
            result.navigationElement.find("ul > li").on('focusin', function(event) {
                var le = $(event.currentTarget);

                le.siblings().each(function () {
                    $(this).removeClass("focus-within");
                });

                le.addClass("focus-within");
            });
            result.navigationElement.find("ul > li").on('focusout', function() {
                var $elem = $(this);
                setTimeout(function() {
                    var hasFocus = !! ($elem.find(':focus').length > 0);
                    if (! hasFocus) {
                        le.removeClass("focus-within");
                    }
                }, 10);
            });
            $("*").on('hover', function() {
                result.navigationElement.find("ul > li").each(function () {
                    var $elem = $(this);
                    setTimeout(function() {
                        var hasFocus = !! ($elem.find(':focus').length > 0);
                        if (! hasFocus) {
                            le.removeClass("focus-within");
                        }
                    }, 10);
                })
            });


            // obsługa zdarzenia kliknięcia w menu
            result.navigationElement.find('a.toggle-navigation-button').on('click', function(event) {
                result.navigationItemClicked.call(result, event);
            });

            return result;
        },

        placeInsideHeader : function() {
            this.navigationElement.detach().insertAfter('#header-buttons');
        },

        placeOutsideHeader : function() {
            this.navigationElement.detach().insertAfter('#header');
        },

        navigationItemClicked : function(event) {
            var ie = $(event.currentTarget).closest('li');
            if (ie.hasClass('open')) {
                ie.removeClass('open');
            } else {
                ie.addClass('open');
            }
        }
    },

    AssetPublisherPortlet : {
        portletElement : null,

        create : function(element) {
            var result = Object.create(Nfhcp.AssetPublisherPortlet);

            result.portletElement = $(element);

            return result;
        },

        addFullContentClasses : function() {
            var e = this.portletElement.find('.asset-full-content');
            if (e.length) {
                this.portletElement.addClass("full-content");
            }
        },

        showImageGallery : function() {
            // single image gallery
            this.portletElement.find('a[rel^="prettyPhoto"]').lightBox();
            this.portletElement.find('a[rel^="lightbox"]').lightBox();
            
            // multiple image gallery
            var ag = this.portletElement.find('.multiple-image-gallery');
            if (ag.length) {
                ag.royalSlider({
                    fullscreen: {
                        enabled: true,
                        nativeFS: false
                    },
                    controlNavigation: 'thumbnails',
                    thumbs: {
                        orientation: 'vertical',
                        drag: true,
                        arrows: true,
                        arrowsAutoHide: false,
                        spacing: 10,
                        autoCenter: false,
                        firstMargin: false
                    },
                    imageScaleMode: 'fit',
                    imageScalePadding: 0,
                    slidesSpacing: 0,
                    imgWidth: 570,
                    transitionType:'fade',
                    autoScaleSlider: true, 
                    navigateByClick: false,
                    globalCaption: true,
                    loop: true,
                    arrowsNav: true,
                    keyboardNavEnabled: true
                });

                var slider = this.portletElement.find('.royalSlider').data('royalSlider');
                slider.ev.on('rsExitFullscreen', function() {
                    slider.setThumbsOrientation('vertical');
                    setTimeout(function() {
                        slider.updateSliderSize(true);
                    }, 2000);
                });

                slider.ev.on('rsEnterFullscreen', function() {
                    slider.setThumbsOrientation('horizontal');
                    slider.updateSliderSize(true);
                });

                this.portletElement.find("img.rsImg").lightBox();
            }
        },

        addBaseContactToggle : function() {
            var te = this.portletElement.find('.nfh-cp-base-contact .departments .department h2 a');
            if (te.length) {
                te.each(function(index, element) {
                    $(element).on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var de = $(this).closest('.department');
                        var dde = de.find('.department-data');
                        if (dde.length) {
                            if (de.hasClass('open')) {
                                de.removeClass('open');
                            } else {
                                de.addClass('open');
                            }
                            dde.slideToggle("slow");
                        }
                    });
                });
            }

            te = this.portletElement.find('.nfh-cp-division-contact .divisions .division h2 a');
            if (te.length) {
                te.each(function(index, element) {
                    $(element).on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var de = $(this).closest('.division');
                        var dde = de.find('.division-data');
                        if (dde.length) {
                            if (de.hasClass('open')) {
                                de.removeClass('open');
                            } else {
                                de.addClass('open');
                            }
                            dde.slideToggle("slow");
                        }
                    });
                });
            }

            te = this.portletElement.find('.nfh-cp-district-contact .districts .district h2 a');
            if (te.length) {
                te.each(function(index, element) {
                    $(element).on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var de = $(this).closest('.district');
                        var dde = de.find('.district-data');
                        if (dde.length) {
                            if (de.hasClass('open')) {
                                de.removeClass('open');
                            } else {
                                de.addClass('open');
                            }
                            dde.slideToggle("slow");
                        }
                    });
                });
            }
        },

        addImagesCaption: function() {
            this.portletElement.find('.nfh-cp-article .content img').each(function() {
                var alt = jQuery(this).attr("alt");
                if (alt != null && alt.length > 0) {
                    jQuery(this).wrap("<div class='img-wrapper'></div>");
                    jQuery(this).after("<div class='img-caption'>" + alt + "</div>");

                    var f = jQuery(this).css("float");
                    jQuery(this).parent().css("float", f);
                }
            });
        },

        addFigure2Iframes: function() {
            this.portletElement.find('.nfh-cp-article .content iframe').each(function() {
                jQuery(this).wrap("<figure></figure>");
            });
        },

        fluidWithVideo: function() {
            try {
                var $allVideos = this.portletElement.find("iframe[src*='//player.vimeo.com'], iframe[src*='//www.youtube.com'], iframe[src*='//www.youtube-nocookie.com'], object, embed"),
                    $fluidEl = this.portletElement.find(".journal-content-article .content");


                if ($fluidEl && $fluidEl.length > 0) {
                    $allVideos.each(function () {
                        jQuery(this)
                        // jQuery .data does not work on object/embed elements
                            .attr('data-aspectRatio', this.height / this.width)
                            .removeAttr('height')
                            .removeAttr('width');

                        var newWidth = $fluidEl.outerWidth();
                        newWidth = newWidth - 30;
                        var $el = $(this);
                        $el
                            .width(newWidth)
                            .height(newWidth * $el.attr('data-aspectRatio'));
                    });

                    jQuery(window).resize(function () {

                        var newWidth = $fluidEl.outerWidth();
                        $allVideos.each(function () {

                            var $el = $(this);
                            $el
                                .width(newWidth)
                                .height(newWidth * $el.attr('data-aspectRatio'));

                        });
                    }).resize();
                }
            } catch (e) {
                console.error(e.message);
            }
        },

        printFullContent : function(portletId, articleId, groupId, urlTitle) {
            var entryId = $('#article-' + articleId).parents('.asset-full-content').attr('entry-id');
            if (portletId == "") {
                portletId = $('#article-' + articleId).parents('section').attr('id');
                portletId = portletId.substring(8);
            }
            AUI().use('liferay-portlet-url', function(A) {
                var renderURL = Liferay.PortletURL.createRenderURL();
                renderURL.setPortletMode("view");
                renderURL.setWindowState("pop_up");
                renderURL.setPortletId(portletId);
                renderURL.setParameter("struts_action", "/asset_publisher/view_content");
                renderURL.setParameter("assetEntryId", entryId);
                renderURL.setParameter("viewMode", "print");
                renderURL.setParameter("type", "content");
                if (groupId) {
                    renderURL.setParameter("groupId", groupId);
                }
                renderURL.setParameter("urlTitle", urlTitle);
                window.open(renderURL.toString(), '', 'directories=0,height=480,left=80,location=1,menubar=1,resizable=1,scrollbars=yes,status=0,toolbar=0,top=180,width=640');
            })
        }
    },

    JournalContentPortlet : {
        portletElement : null,

        create : function(element) {
            var result = Object.create(Nfhcp.JournalContentPortlet);

            result.portletElement = $(element);

            return result;
        },

        showImageGallery : function() {
            // single image gallery
            this.portletElement.find('a[rel^="prettyPhoto"]').lightBox();
            this.portletElement.find('a[rel^="lightbox"]').lightBox();

            // multiple image gallery
            var ag = this.portletElement.find('.multiple-image-gallery');
            if (ag.length) {
                ag.royalSlider({
                    fullscreen: {
                        enabled: true,
                        nativeFS: false
                    },
                    controlNavigation: 'thumbnails',
                    thumbs: {
                        orientation: 'vertical',
                        drag: true,
                        arrows: true,
                        arrowsAutoHide: false,
                        spacing: 10,
                        autoCenter: false,
                        firstMargin: false
                    },
                    imageScaleMode: 'fit',
                    imageScalePadding: 0,
                    slidesSpacing: 0,
                    imgWidth: 570,
                    transitionType:'fade',
                    autoScaleSlider: true,
                    navigateByClick: false,
                    globalCaption: true,
                    loop: true,
                    arrowsNav: true,
                    keyboardNavEnabled: true
                });

                var slider = this.portletElement.find('.royalSlider').data('royalSlider');
                slider.ev.on('rsExitFullscreen', function() {
                    slider.setThumbsOrientation('vertical');
                    setTimeout(function() {
                        slider.updateSliderSize(true);
                    }, 2000);
                });

                slider.ev.on('rsEnterFullscreen', function() {
                    slider.setThumbsOrientation('horizontal');
                    slider.updateSliderSize(true);
                });

                this.portletElement.find("img.rsImg").lightBox();
            }
        },

        addImagesCaption: function() {
            this.portletElement.find('.nfh-cp-article .content img').each(function() {
                var alt = jQuery(this).attr("alt");
                if (alt != null && alt.length > 0) {
                    jQuery(this).wrap("<div class='img-wrapper'></div>");
                    jQuery(this).after("<div class='img-caption'>" + alt + "</div>");

                    var f = jQuery(this).css("float");
                    jQuery(this).parent().css("float", f);
                }
            });
        },

        fluidWithVideo: function() {
            try {
                var $allVideos = this.portletElement.find("iframe[src*='//player.vimeo.com'], iframe[src*='//www.youtube.com'], iframe[src*='//www.youtube-nocookie.com'], object, embed"),
                    $fluidEl = this.portletElement.find(".journal-content-article .content");


                if ($fluidEl && $fluidEl.length > 0) {
                    $allVideos.each(function () {
                        jQuery(this)
                        // jQuery .data does not work on object/embed elements
                            .attr('data-aspectRatio', this.height / this.width)
                            .removeAttr('height')
                            .removeAttr('width');

                        var newWidth = $fluidEl.outerWidth();
                        newWidth = newWidth - 30;
                        var $el = $(this);
                        $el
                            .width(newWidth)
                            .height(newWidth * $el.attr('data-aspectRatio'));
                    });

                    jQuery(window).resize(function () {

                        var newWidth = $fluidEl.outerWidth();
                        $allVideos.each(function () {

                            var $el = $(this);
                            $el
                                .width(newWidth)
                                .height(newWidth * $el.attr('data-aspectRatio'));

                        });
                    }).resize();
                }
            } catch (e) {
                console.error(e.message);
            }
        },

        addBaseContactToggle : function() {
            var te = this.portletElement.find('.nfh-cp-base-contact .departments .department h2 a');
            if (te.length) {
                te.each(function(index, element) {
                    $(element).on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var de = $(this).closest('.department');
                        var dde = de.find('.department-data');
                        if (dde.length) {
                            if (de.hasClass('open')) {
                                de.removeClass('open');
                            } else {
                                de.addClass('open');
                            }
                            dde.slideToggle("slow");
                        }
                    });
                });
            }

            te = this.portletElement.find('.nfh-cp-division-contact .divisions .division h2 a');
            if (te.length) {
                te.each(function(index, element) {
                    $(element).on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var de = $(this).closest('.division');
                        var dde = de.find('.division-data');
                        if (dde.length) {
                            if (de.hasClass('open')) {
                                de.removeClass('open');
                            } else {
                                de.addClass('open');
                            }
                            dde.slideToggle("slow");
                        }
                    });
                });
            }

            te = this.portletElement.find('.nfh-cp-district-contact .districts .district h2 a');
            if (te.length) {
                te.each(function(index, element) {
                    $(element).on('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var de = $(this).closest('.district');
                        var dde = de.find('.district-data');
                        if (dde.length) {
                            if (de.hasClass('open')) {
                                de.removeClass('open');
                            } else {
                                de.addClass('open');
                            }
                            dde.slideToggle("slow");
                        }
                    });
                });
            }
        }
    },

    CalendarPortlet : {
        portletElement : null,

        create : function(element) {
            var result = Object.create(Nfhcp.CalendarPortlet);

            result.portletElement = $(element);

            return result;
        },


        addImagesCaption: function() {
            this.portletElement.find('.nfh-cp-article .content img').each(function() {
                var alt = jQuery(this).attr("alt");
                if (alt != null && alt.length > 0) {
                    jQuery(this).wrap("<div class='img-wrapper'></div>");
                    jQuery(this).after("<div class='img-caption'>" + alt + "</div>");

                    var f = jQuery(this).css("float");
                    jQuery(this).parent().css("float", f);
                }
            });
        },

        fluidWithVideo: function() {
            try {
                var $allVideos = this.portletElement.find("iframe[src*='//player.vimeo.com'], iframe[src*='//www.youtube.com'], iframe[src*='//www.youtube-nocookie.com'], object, embed"),
                    $fluidEl = this.portletElement.find(".journal-content-article .content");


                if ($fluidEl && $fluidEl.length > 0) {
                    $allVideos.each(function () {
                        jQuery(this)
                        // jQuery .data does not work on object/embed elements
                            .attr('data-aspectRatio', this.height / this.width)
                            .removeAttr('height')
                            .removeAttr('width');

                        var newWidth = $fluidEl.outerWidth();
                        newWidth = newWidth - 30;
                        var $el = $(this);
                        $el
                            .width(newWidth)
                            .height(newWidth * $el.attr('data-aspectRatio'));
                    });

                    jQuery(window).resize(function () {

                        var newWidth = $fluidEl.outerWidth();
                        $allVideos.each(function () {

                            var $el = $(this);
                            $el
                                .width(newWidth)
                                .height(newWidth * $el.attr('data-aspectRatio'));

                        });
                    }).resize();
                }
            } catch (e) {
                console.error(e.message);
            }
        }

    },

    init : function() {
        // header
        var header = null;
        var elements = $('#header');
        if (elements.length) {
            header = Nfhcp.Header.create(elements);
        }

        // navigation
        var navigationTop = null;
        elements = $('#navigation-top');
        if (elements.length) {
            navigationTop = Nfhcp.NavigationTop.create(elements);
        }

        // asset publisher
        elements = $('.portlet-asset-publisher');
        if (elements.length) {
            var assetPublisher = null;
            elements.each(function(index, element) {
                assetPublisher = Nfhcp.AssetPublisherPortlet.create(element);
                assetPublisher.addFullContentClasses();
                assetPublisher.addBaseContactToggle();
                assetPublisher.addImagesCaption();
                assetPublisher.showImageGallery();
                // assetPublisher.addFigure2Iframes();
                assetPublisher.fluidWithVideo();
            });
        }

        // journal content
        elements = $('.portlet-journal-content');
        if (elements.length) {
            var journalContent = null;
            elements.each(function(index, element) {
                journalContent = Nfhcp.JournalContentPortlet.create(element);
                journalContent.addBaseContactToggle();
                journalContent.addImagesCaption();
                journalContent.showImageGallery();
                journalContent.fluidWithVideo();
            });
        }

        // calendar portlet
        elements = $('.nfh-cp-calendar-portlet');
        if (elements.length) {
            var calendar = null;
            elements.each(function(index, element) {
                calendar = Nfhcp.CalendarPortlet.create(element);
                calendar.addImagesCaption();
                calendar.fluidWithVideo();
            });
        }

        // media check
        mediaCheck({
            media : '(max-width: 767px)',
            entry : function() {
                if (navigationTop) {
                    navigationTop.placeInsideHeader();
                }
            },
            exit : function() {
            }
        });

        mediaCheck({
            media : '(min-width: 768px) and (max-width: 979px)',
            entry : function() {
                if (navigationTop) {
                    navigationTop.placeInsideHeader();
                }
            },
            exit : function() {
            }
        });

        mediaCheck({
            media : '(min-width: 980px) and (max-width: 1199px)',
            entry : function() {
                if (navigationTop) {
                    navigationTop.placeOutsideHeader();
                }
            },
            exit : function() {
            }
        });

        mediaCheck({
            media : '(min-width: 1200px)',
            entry : function() {
                if (navigationTop) {
                    navigationTop.placeOutsideHeader();
                }
            },
            exit : function() {
            }
        });
    }
}

;
(function($) {
    // DOM gotowy
    $(function() {
        Nfhcp.init();
    });
})(jQuery);