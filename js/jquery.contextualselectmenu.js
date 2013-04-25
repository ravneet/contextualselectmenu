(function($){
    $.ContextualSelectMenu = function(el, options){
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        base._selectedIndex = -1;
        base._selctedText = "";

        base.$el.data("ContextualSelectMenus", base);
        
        base.init = function(){
            base.options = $.extend({},$.ContextualSelectMenu.defaultOptions, options);
            var htmlStr = "<div id='selectBox_" + el.id + "' class='selectBox'>     <span class='selected'></span>      <span class='selectArrow'>&nbsp;</span>     <div id='selectOptions_" + el.id + "'class='selectOptions' >             </div>  </div>";
            base.$el.append(htmlStr);
            // Put your initialization code here
            for (var i = 0; i < options.data.length; i++) {
                var selctHtmlStr = "<span id='selectOption_" + i + "' class='selectOption' value='" + options.data[i] + "' listIndex='" + i + "'>" + options.data[i] + "</span>";
                $("#selectOptions_" + el.id).append(selctHtmlStr);
            }

            $("#selectBox_" + el.id).click(function () {
                if ($(this).children('div.selectOptions').css('display') == 'none') {
                    $(this).children('div.selectOptions').css('display', 'block');
                    $("#selectBox_" + el.id).addClass("innerShadow");
                    $("#selectOptions_" + el.id).addClass("optionInnerShadow");
                }
                else {
                    $(this).children('div.selectOptions').css('display', 'none');
                    $("#selectBox_" + el.id).removeClass("innerShadow");
                    $("#selectOptions_" + el.id).removeClass("optionInnerShadow");
                }
            });

            $("#selectBox_" + el.id).find('span.selectOption').click(function (event) {
                event.stopPropagation();
                base._selctedText = $(this).html();
                base._selectedIndex = $(this).attr('listIndex')
                $(this).parent().css('display', 'none');
                $(this).closest('div.selectBox').attr('value', $(this).attr('value'));
                $(this).parent().siblings('span.selected').html($(this).html());
                $("#selectBox_" + el.id).removeClass("innerShadow");
                $("#selectOptions_" + el.id).removeClass("optionInnerShadow");
                $("#selectBox_" + el.id).trigger("listChanged", { listIndex: $(this).attr('listIndex') });
            });
        };
        
        
        // Run initializer
        base.init();
    };
    
    $.ContextualSelectMenu.defaultOptions = {
    };
    
    $.fn.contextualSelectMenu = function(options){
        return this.each(function(){
            (new $.ContextualSelectMenu(this, options));
        });
    };
    
    $.fn.getSelectedIndex = function () {
        return this.data("ContextualSelectMenus")._selectedIndex;
    };
    $.fn.getSelectedText = function () {
       return this.data("ContextualSelectMenus")._selctedText;
    };
    $.fn.setSelectedIndex = function (selectedIndex) {
        this.data("ContextualSelectMenus").$el.find("#selectOption_" + selectedIndex).trigger("click");
    
    };
})(jQuery);
