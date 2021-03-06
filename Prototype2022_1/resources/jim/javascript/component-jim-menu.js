/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

/*
 * jimMenu: custom-built menu, which allows overlaps while the parent resides in a different z-index stacking context.
 *          each menu item has two listeners for mouseenter and mouseleave events.
 *          every mouseleave event registers a timeout, which will close the respective submenu.
 *          in the case, where a submenu is entered which was previously marked by a timeout to be closed, the timeout is cancelled.
 */

(function(window, undefined) {
  var menu = {
    "defaults": {
      "showDelay": 50, /* Time in ms before menu shows */
      "hideDelay": 100, /* Time in ms before menu hides */
      "zIndex": 100, /* starting z-index value */
      "vertical": "vertical", /* orientation vertical key */
      "timeoutRegister": {} /* reference to submenus to be closed */
    },
    "registerTimeout": function($submenu) {
      if(jimUtil.exists($submenu)) {
        menu.defaults.timeoutRegister[$submenu.attr("id") + $submenu.attr("masteritem")] = setTimeout(function() {menu.closeSubmenu($submenu);}, menu.defaults.hideDelay);
      }
    },
    "removeTimeout": function($submenu) {
      if(jimUtil.exists($submenu)) {
        var key = $submenu.attr("id") + $submenu.attr("masteritem");
        var closer = menu.defaults.timeoutRegister[key];
        if (closer) {
          clearTimeout(closer);
          delete menu.defaults.timeoutRegister[key];
        }
      }
    },
    "closeAdjacentSubmenus": function(submenus) {
      jQuery.each(submenus, function(i, submenu) {
        jQuery(submenu).hide();
      });
    },
    "closeSubmenu": function($submenu) {
      menu.closeAdjacentSubmenus($submenu.find(".submenu:visible"));
      $submenu.hide();
    },
    "showMenu": function($item) {
      if ($item.closest(".menu").length) {
        var submenuID = $item.attr("id") + "-submenu";
        var masteritemID = $item.parents(".master:first").attr("id");
        var $submenu = (masteritemID) ? jQuery("#simulation").find("#" + submenuID + "[masteritem='" + masteritemID + "']") : jQuery("#simulation").find("#" + submenuID);
        menu.removeTimeout($submenu);
        var position = $item.jimPosition();
        if($item.closest(".menu").hasClass("horizontal")) {
          ++menu.defaults.zIndex;
          $submenu.css({"z-index": Math.max($submenu.css("z-index"), menu.defaults.zIndex), "top": position.bottom - 1 + "px", "left": position.left + "px"}).show();
        } else {        
          ++menu.defaults.zIndex;
          $submenu.css({"z-index": Math.max($submenu.css("z-index"), menu.defaults.zIndex), "top": position.top + "px", "left": position.right - 1 + "px"}).show();
        }
      } else if ($item.parents(".submenu").length) {
        var $parentMenu = $item.parents(".submenu:first");
        menu.removeTimeout($parentMenu);
        /*menu.closeAdjacentSubmenus($parentMenu.find(".submenu:visible"));*/
        
        $item.find(".submenu:first").show();
      } else {
        menu.closeAdjacentSubmenus($item.siblings("tr").find(".submenu:visible"));
        $item.find(".submenu:first").show();
      }
    },
    "hideMenu": function($item, event) {
      if ($item.closest(".menu").length) {
        var submenuID = $item.attr("id") + "-submenu";
        var masteritemID = $item.parents(".master:first").attr("id");
        var $submenu = (masteritemID) ? jQuery("#simulation").find("#" + submenuID + "[masteritem='" + masteritemID + "']") : jQuery("#simulation").find("#" + submenuID);
        menu.registerTimeout($submenu);
      } else if ($item.parents(".submenu").length) {
        menu.closeAdjacentSubmenus($item.find(".submenu:visible"));
        menu.registerTimeout($item.parents(".submenu:first"));
      } else {
        if (jQuery(event.relatedTarget).parents(".submenu").length) {
          menu.closeAdjacentSubmenus($item.find(".submenu:visible"));
        } else {
          menu.removeTimeout($item.parents(".submenu"));
        }
      }
    }
  };

  jQuery("#simulation").on("mouseenter mouseleave", ".menunode", function(event) {
    if(event.type === "mouseenter") {
      menu.showMenu(jQuery(this));
    } else {
      if(jimUtil.exists(event.relatedTarget) && (event.relatedTarget.id === "" || jQuery(event.target || event.srcElement).closest(".menunode").find("#" + event.relatedTarget.id).length === 0))
        menu.hideMenu(jQuery(this), event);
    }
  });
})(window);