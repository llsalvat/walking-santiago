    // Bottom to top button
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
    //
    












    

(function () {
  "use strict";

  // The widget object
  var widgets;

  function createShareButtonAndDialog() {
    var $share_url_copy_prompt = $("#share-url-copy-prompt");

    // Create the share dialog
    var $share_dialog = widgets.createCustomDialog({
      selector: "#share-dialog",
      full_width_button: true,
      action_text: "Copy to clipboard",
      close_dialog_on_action: false,
      show_cancel_btn: false,
      action_callback: function () {
        widgets.copyText("share-url");
        $share_url_copy_prompt.show();
      }
    });
    $share_dialog.on("dialogclose", function () {
      $share_url_copy_prompt.hide();
    });

    // Set the event of the share url textbox
    var $share_url = $("#share-url");
    $share_url.focus(function () {
      $(this).select();
    }).click(function () {
      $(this).select();
    }).mouseup(function (e) {
      e.preventDefault();
    });

    // Set the event of the share button
    $("#share-btn").on("click", function () {
      $share_dialog.dialog("open");
    });
  }

  function init() {
    // Create the widget object
    widgets = new edaplotjs.Widgets();

    // Set custom dropdown
    widgets.setCustomDropdown($("#custom-dropdown"), {
      items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      //init_index: 0, // You can use this parameter to set the initial item for displaying
      init_text: "Dropdown Menu (With JavaScript)",
      on_item_click_callback: function ($ui) {
        console.log($ui.text());
      }
    });
    widgets.setCustomDropdown($("#custom-dropdown-large"), {
      items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      //init_index: 0, // You can use this parameter to set the initial item for displaying
      init_text: "Large Dropdown Menu (With JavaScript)",
      on_item_click_callback: function ($ui) {
        console.log($ui.text());
      }
    });

    // Set custom radio
    $("input:radio[name='playback-speed']").on("change", function () {
      console.log($(this).val());
    });

    // Set custom dialog type 1
    var $dialog_1 = widgets.createCustomDialog({
      selector: "#dialog-1",
      full_width_button: true
    });
    $("#dialog-btn-1").on("click", function () {
      $dialog_1.dialog("open");
    });

    // Set custom dialog type 2
    var $dialog_2 = widgets.createCustomDialog({
      selector: "#dialog-2",
      action_callback: function () {
        console.log("confirm");
      },
      cancel_callback: function () {
        console.log("cancel");
      }
    });
    $("#dialog-btn-2").on("click", function () {
      $dialog_2.dialog("open");
    });

    // Set custom dialog type 3
    var $dialog_3 = widgets.createCustomDialog({
      selector: "#dialog-3",
      parent: $(".content"),
      show_cancel_btn: false,
      cancel_callback: function () {
        console.log("cancel");
      },
    });
    $("#dialog-btn-3").on("click", function () {
      $dialog_3.dialog("open");
    });

    // Set custom dialog type 4
    var $dialog_4 = widgets.createCustomDialog({
      selector: "#dialog-4",
      action_text: "Action",
      reverse_button_positions: true,
      full_width_button: true,
      action_callback: function () {
        console.log("action");
      },
      cancel_text: "Back",
      cancel_callback: function () {
        console.log("back");
      }
    });
    $("#dialog-btn-4").on("click", function () {
      $dialog_4.dialog("open");
    });

    // Create the share button and dialog
    createShareButtonAndDialog();

    // Create the gallery
    var $gallery = $(".gallery");
    // In practice, these images urls may come from your server via http ajax requests.
    for (var i = 0; i < 8; i++) {
      var item = "<a href=\"javascript:void(0)\" class=\"flex-column\">" +
        "<img src=\"img/dummay-img.png\">" +
        "<div>Image Caption</div>" +
        "</a>";
      $gallery.append($(item));
    }

    // Create custom tabs
    widgets.createCustomTab({
      selector: "#custom-tab"
    });

    // Set the custom legend
    widgets.setCustomLegend($("#custom-legend"));
  }

  $(init);
})();

/*************************************************************************
 * GitHub: https://github.com/yenchiah/project-website-template
 * Version: v3.29
 * This JS file has widgets for building interactive web applications
 * Use this file with widgets.css
 * If you want to keep this template updated, avoid modifying this file
 * Instead, add your own JavaScript in the index.js
 *************************************************************************/

(function () {
  "use strict";

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Create the class
  //
  var Widgets = function () {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Variables
    //

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Private methods
    //

    // Safely get the value from a variable, return a default value if undefined
    function safeGet(v, default_val) {
      if (typeof default_val === "undefined") default_val = "";
      return (typeof v === "undefined") ? default_val : v;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Privileged methods
    //
    function createCustomTab(settings) {
      settings = safeGet(settings, {});

      // Specify the selector of the tab
      var $selector = $(settings["selector"]);
      if ($selector.length == 0) {
        console.error("Cannot find selector: " + settings["selector"]);
        return false;
      }
      if ($selector.length > 1) {
        console.error("Multiple selectors were found. Please indicate only one at a time.");
        return false;
      }

      // Get the menu items
      var $menu_items = $selector.find(".custom-tab-menu-item");
      var $all_contents = $selector.find(".custom-tab-content");
      $menu_items.each(function (i, element) {
        var $element = $(element);
        var idx_content = $element.data("content");
        var $desired_content = $selector.find(".custom-tab-content[data-content=" + idx_content + "]");
        // Add click event
        $element.on("click", function () {
          $all_contents.hide();
          $desired_content.css("display", "flex");
          $menu_items.removeClass("active");
          $element.addClass("active");
        });
      });
      $selector.find(".custom-tab-menu-item.active").click();
    }
    this.createCustomTab = createCustomTab;

    function createCustomDialog(settings) {
      settings = safeGet(settings, {});

      // Create a button for taking actions (e.g., confirm that users get the message)
      // The default text for the button is "Confirm"
      var has_action_callback = (typeof settings["action_callback"] === "function");
      var action_text = safeGet(settings["action_text"], "Confirm");

      // Create a button for cancellation
      // The default text for the button is "Cancel" when there is an action button
      // The default text for the button is "Ok" when there is no action button
      var has_cancel_callback = (typeof settings["cancel_callback"] === "function");
      var cancel_text = has_action_callback ? "Cancel" : "Ok";
      cancel_text = safeGet(settings["cancel_text"], cancel_text);

      // Hide the cancel button or not
      var show_cancel_btn = safeGet(settings["show_cancel_btn"], true);

      // Specify the style
      var style_class = "custom-dialog-flat";

      // Specify the selector of the dialog
      // If no selector, a <div></div> will be created
      var $selector = $(safeGet(settings["selector"], "<div></div>"));

      // Specify the width of the dialog
      var width = safeGet(settings["width"], 260);

      // Specify if full width buttons
      var full_width_button = safeGet(settings["full_width_button"], false);

      // Show the close button or not
      var show_close_button = safeGet(settings["show_close_button"], true);

      // Close the dialog when the action button is clicked or not
      var close_dialog_on_action = safeGet(settings["close_dialog_on_action"], true);

      // Close the dialog when the cancel button is clicked or not
      var close_dialog_on_cancel = safeGet(settings["close_dialog_on_cancel"], true);

      // Reverse the positions of the action and cancel buttons
      var reverse_button_positions = safeGet(settings["reverse_button_positions"], false);

      // Specify buttons
      var buttons = [];
      if (show_cancel_btn) {
        var btn_class = "ui-cancel-button";
        if (full_width_button) {
          btn_class += " full-width";
        }
        buttons.push({
          class: btn_class,
          text: cancel_text,
          click: function () {
            if (close_dialog_on_cancel) {
              $(this).dialog("close");
            }
            if (has_cancel_callback) settings["cancel_callback"]();
          }
        });
      }
      if (has_action_callback) {
        var btn_class = "ui-action-button";
        if (full_width_button) {
          btn_class += " full-width";
        }
        buttons.push({
          class: btn_class,
          text: action_text,
          click: function () {
            if (close_dialog_on_action) {
              $(this).dialog("close");
            }
            if (has_action_callback) settings["action_callback"]();
          }
        });
      }

      // Reverse button positions or not
      if (buttons.length == 2 && reverse_button_positions) {
        var tmp = buttons[1];
        buttons[1] = buttons[0];
        buttons[0] = tmp;
      }

      // Create dialog
      var $selector_container;
      var dialog_settings = {
        autoOpen: false,
        resizable: false,
        height: "auto",
        draggable: false,
        width: width,
        modal: true,
        classes: {
          "ui-dialog": style_class
        }, // this is for jquery 1.12 and after
        dialogClass: style_class, // this is for before jquery 1.12
        buttons: buttons,
        closeText: "",
        open: function (event, ui) {
          var num_opened_dialog = 0;
          $(".ui-dialog-content").each(function () {
            if ($(this).dialog("isOpen")) num_opened_dialog += 1;
          });
          // Larger than 1 after opening means that there exists other opened dialog boxes
          var is_other_dialog_opened = num_opened_dialog > 1;
          // Check if parent element is specified
          if (!is_other_dialog_opened) {
            if (typeof settings["parent"] === "undefined") {
              var $body = $("body");
              if (!$body.hasClass("no-scroll") || !$body.hasClass("no-x-scroll")) {
                // When the dialog is open, we want to set the top of the body to the scroll position
                document.body.style.top = -window.scrollY + "px";
                if (window.innerWidth > document.body.clientWidth) {
                  // This means that the page has a vertical scroll bar
                  $body.addClass("no-x-scroll");
                } else {
                  // This means that the page has no vertical scroll bar
                  $body.addClass("no-scroll");
                }
              }
              $selector_container.css({
                position: "fixed",
                top: "calc(50% - " + ($selector_container.height() / 2) + "px)",
                margin: "0 auto",
                left: "0",
                right: "0",
                overflow: "hidden"
              });
            } else {
              // If there is a parent, need to fit the overlay to the parent element
              var $overlay = $(".ui-widget-overlay");
              if (!$overlay.hasClass("fit-parent")) {
                $overlay.addClass("fit-parent");
              }
            }
          }
        },
        close: function (event, ui) {
          var num_opened_dialog = 0;
          $(".ui-dialog-content").each(function () {
            if ($(this).dialog("isOpen")) num_opened_dialog += 1;
          });
          // Larger than 0 after closing means that there exists other opened dialog boxes
          var is_other_dialog_opened = num_opened_dialog > 0;
          if (!is_other_dialog_opened) {
            // Check if parent element is specified
            if (typeof settings["parent"] === "undefined") {
              var $body = $("body");
              if ($body.hasClass("no-scroll") || $body.hasClass("no-x-scroll")) {
                if ($body.hasClass("no-scroll")) {
                  $body.removeClass("no-scroll");
                }
                if ($body.hasClass("no-x-scroll")) {
                  $body.removeClass("no-x-scroll");
                }
                // When the dialog is hidden, we want to remain at the top of the scroll position
                var scrollY = document.body.style.top;
                document.body.style.top = "";
                window.scrollTo(0, parseInt(scrollY || "0") * -1);
              }
            } else {
              // If there is a parent, need to remove the class that fits the overlay to the parent
              var $overlay = $(".ui-widget-overlay");
              if ($overlay.hasClass("fit-parent")) {
                $overlay.removeClass("fit-parent");
              }
            }
          }
        }
      };

      if (typeof settings["parent"] === "undefined") {
        dialog_settings["position"] = {
          my: "center",
          at: "center",
          of: window
        };
      } else {
        dialog_settings["appendTo"] = settings["parent"];
        dialog_settings["position"] = {
          my: "center",
          at: "center",
          of: settings["parent"]
        };
      }
      var $dialog = $selector.dialog(dialog_settings);
      $selector_container = $selector.closest(".ui-dialog");
      $selector_container.find(".ui-dialog-titlebar-close").empty().append("<i class='fa fa-times fa-lg'></i>");
      if (!show_close_button) {
        $dialog.on("dialogopen", function () {
          $(this).parent().find(".ui-dialog-titlebar-close").hide();
        });
      }
      return $dialog;
    }
    this.createCustomDialog = createCustomDialog;

    function setCustomDropdown($ui, settings) {
      var items = settings["items"]; // the text that will appear for each item
      var init_index = settings["init_index"];
      var init_text = settings["init_text"];
      var on_item_click_callback = settings["on_item_click_callback"];
      var on_item_create_callback = settings["on_item_create_callback"];
      var $menu = $ui.find("div").empty();
      var $button_text = $ui.find("a > span").text("");
      var $selected_item;
      // Set initial button text
      if (typeof init_text !== "undefined") {
        $button_text.text(init_text);
      } else {
        if (typeof init_index !== "undefined" && typeof items !== "undefined") {
          $button_text.text(items[init_index]);
        }
      }
      // Set button event
      // Note that the button is designed to use focusout and focus to determine its state
      // "focusout" indicates that the menu is currently opened and should be closed
      // "focus" indicates that the menu is currently closed and should be opened
      $ui.find("a").off("focusout").on("focusout", function () {
        // Find which item is hovered, and then simulate the click
        if (typeof $selected_item !== "undefined") {
          $button_text.text($selected_item.text()); // update the text on the button
          if (typeof on_item_click_callback === "function") on_item_click_callback($selected_item, $selected_item.index());
          $selected_item = undefined;
        }
        if ($menu.is(":visible")) $menu.addClass("force-hide"); // close the menu
      }).off("focus").on("focus", function () {
        if (!$menu.is(":visible")) $menu.removeClass("force-hide"); // open the menu
      });
      // Add events for menu items
      for (var i = 0; i < items.length; i++) {
        var $item = $("<a href=\"javascript:void(0)\">" + items[i] + "</a>");
        // We need to let the focusout button event know which item is selected
        // Note that we cannot use the click event to find this,
        // because as soon as the item is clicked,
        // the focusout event of the button is triggered,
        // this closes the menu and we never get the click event from the items
        $item.on("mouseover", function () {
          $selected_item = $(this);
        }).on("mouseout", function () {
          $selected_item = undefined;
        });
        $menu.append($item);
        if (typeof on_item_create_callback === "function") on_item_create_callback($item, i);
      }
      return $ui;
    }
    this.setCustomDropdown = setCustomDropdown;

    function setCustomLegend($ui, settings) {
      settings = safeGet(settings, {});
      $ui.accordion({
        collapsible: true,
        animate: safeGet(settings["animate"], false)
      });
      return $ui;
    }
    this.setCustomLegend = setCustomLegend;

    // Copy text in a input field
    function copyText(element_id) {
      // Get the text field
      var copy = document.getElementById(element_id);
      // Select the text field
      copy.select();
      copy.setSelectionRange(0, 99999); /*For mobile devices*/
      // Copy the text inside the text field
      document.execCommand("copy");
    }
    this.copyText = copyText;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Constructor
    //
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Register to window
  //
  if (window.edaplotjs) {
    window.edaplotjs.Widgets = Widgets;
  } else {
    window.edaplotjs = {};
    window.edaplotjs.Widgets = Widgets;
  }
})();

$(document).ready(function(){

  $('.ir-arriba').click(function(){
    $('body, html').animate({
      scrollTop: '0px'
    }, 300);
  });

  $(window).scroll(function(){
    if( $(this).scrollTop() > 0 ){
      $('.ir-arriba').slideDown(300);
    } else {
      $('.ir-arriba').slideUp(300);
    }
  });

});


// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}