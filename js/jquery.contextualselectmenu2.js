var ContextualSelectMenu = function (el, options) {
    this.data = options.data;
    this.selectedIndex = -1;
    this.init = init;
    this.addEventListener = document.body.addEventListener
    el.p = this;
    this.init(el, this.data);


    function assignoptionClick(el) {
        var listOpts = document.getElementsByClassName('selectOption');
        for (b in listOpts) {
            if (listOpts.hasOwnProperty(b)) {
                listOpts[b].addEventListener("click", function (e) {
                    e.stopPropagation();
                    el.p.selectedIndex = this.getAttribute("listIndex");
                    if ((' ' + e.target.className + ' ').indexOf(' selectOption ') > -1)
                        {
                            var evt = document.createEvent("Event");

                            evt.initEvent("listChanged", true, true);

                            el.dispatchEvent(evt);
                    }
                }, true);
            }
        }

    }
      function init(el, data) {

        var htmlStr = "<div id='selectBox_" + el.id + "' class='selectBox'>     <span class='selected'></span>      <span class='selectArrow'>&nbsp;</span>     <div id='selectOptions_" + el.id + "'class='selectOptions' >             </div>  </div>";
        el.innerHTML = htmlStr;
        var selectOptions = document.getElementById("selectOptions_" + el.id);
        var selectBox = document.getElementById("selectBox_" + el.id);

        for (var i = 0; i < data.length; i++) {
            var selctHtmlStr = "<span id='selectOption_" + i + "' class='selectOption' value='" + data[i] + "' listIndex='" + i + "'>" + data[i] + "</span>";
            selectOptions.innerHTML = selectOptions.innerHTML + selctHtmlStr;
            // var currentOption = document.getElementById("selectOption_" + i);


        }
        assignoptionClick(el);
        selectOptions.style.display = 'none';
        //alert(el.id);
        selectBox.addEventListener("click", function () {
            //   alert(el.p.selectedIndex);
            if (selectOptions.style.display == 'none') {
                selectOptions.style.display = 'block';
                //  $("#selectBox_" + el.id).addClass("innerShadow");
                // $("#selectOptions_" + el.id).addClass("optionInnerShadow");
            }
            else {
                selectOptions.style.display = 'none';
                //   $("#selectBox_" + el.id).removeClass("innerShadow");
                // $("#selectOptions_" + el.id).removeClass("optionInnerShadow");
            }
        });
    }
}
ContextualSelectMenu.prototype.getSelectedIndex = function () {
    return this.selectedIndex;
}
