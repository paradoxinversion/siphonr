const getWordFrequency = (str) => {
  const freq = {};
  const words = str.split(" ");
  words.forEach((element) => {
    const word = element.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
    if (!freq[word]){
      freq[word]= 1;
    } else{
      freq[word]= freq[word] + 1;
    }
  });
  return freq;
};

const getWordFrequencyFromArray = (stringArr) => {
  const freq = {};
  stringArr.forEach((string) => {
    const stringWordFrequency = getWordFrequency(string);
    Object.keys(stringWordFrequency).forEach((frequency) => {
      if (!freq[frequency]){
        freq[frequency] = stringWordFrequency[frequency];
      } else {
        freq[frequency] += stringWordFrequency[frequency];
      }
    });
  });
  return freq;
};



module.exports = {
  getWordFrequency,
  getWordFrequencyFromArray
};
