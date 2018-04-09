"use strict";

var getWordFrequency = function getWordFrequency(str) {
  var freq = {};
  var words = str.split(" ");
  words.forEach(function (element) {
    var word = element.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
    if (!freq[word]) {
      freq[word] = 1;
    } else {
      freq[word] = freq[word] + 1;
    }
  });
  return freq;
};

var getWordFrequencyFromArray = function getWordFrequencyFromArray(stringArr) {
  var freq = {};
  stringArr.forEach(function (string) {
    var stringWordFrequency = getWordFrequency(string);
    Object.keys(stringWordFrequency).forEach(function (frequency) {
      if (!freq[frequency]) {
        freq[frequency] = stringWordFrequency[frequency];
      } else {
        freq[frequency] += stringWordFrequency[frequency];
      }
    });
  });
  return freq;
};

module.exports = {
  getWordFrequency: getWordFrequency,
  getWordFrequencyFromArray: getWordFrequencyFromArray
};