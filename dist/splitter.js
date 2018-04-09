"use strict";

// Our 'pagination' suffix may take up to 8 chars, so we check for those here
var suffixChars = 8;

function split(str) {
  var finalContainer = [];
  var splitStr = str.split(" ");
  var currentPartIndex = 0;
  finalContainer.push([]);
  for (var word in splitStr) {
    var currentWordLength = splitStr[word].length;
    var currentLineLength = returnPostLength(finalContainer[currentPartIndex]);
    if (currentWordLength + currentLineLength < 240 - suffixChars) {
      finalContainer[currentPartIndex].push(splitStr[word]);
    } else {
      finalContainer.push([]);
      currentPartIndex++;
      finalContainer[currentPartIndex].push(splitStr[word]);
    }
  }

  return finalContainer.map(function (element, index, array) {
    element.push("[" + (index + 1) + "/" + array.length + "]");
    return element.join(" ");
  });
}

function returnPostLength(post) {
  return post.join(" ").length;
}

module.exports = split;