$(function () {
  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {
  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}' with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  // Given array of category objects, returns a random category object.
  function chooseRandomCategory(categories) {
    var randomArrayIndex = Math.floor(Math.random() * categories.length);
    return categories[randomArrayIndex];
  }

  // Load the menu categories view
  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, buildAndShowCategoriesHTML);
  };

  // Load the menu items view
  // 'categoryShort' is a short_name for a category
  dc.loadMenuItems = function (categoryShort) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(menuItemsUrl + categoryShort + ".json", buildAndShowMenuItemsHTML);
  };

  function buildAndShowCategoriesHTML(categories) {
    // Implementation for building and displaying categories view
    // ...
  }

  function buildAndShowMenuItemsHTML(categoryMenuItems) {
    // Implementation for building and displaying menu items view
    // ...
  }

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {
    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl, function (categories) {
      var chosenCategory = chooseRandomCategory(categories);
      var homeHtmlToInsertIntoMainPage = homeHtmlUrl.replace("{{randomCategoryShortName}}", chosenCategory.short_name);
      insertHtml("#main-content", homeHtmlToInsertIntoMainPage);

      // Set onclick attribute for the "specials" tile dynamically
      var specialsTileLink = document.getElementById("specials-tile-link");
      specialsTileLink.setAttribute("onclick", "$dc.loadMenuItems('" + chosenCategory.short_name + "');");
    }, true); // Explicitly setting the flag to get JSON from server processed into an object literal
  });

  global.$dc = dc;
})(window);
