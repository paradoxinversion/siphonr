// Our 'pagination' suffix may take up to 8 chars, so we check for those here
const suffixChars = 8;

function split(str){
  const finalContainer = [];
  const splitStr = str.split(" ");
  let currentPartIndex = 0;
  finalContainer.push([]);
  for (let word in splitStr){
    let currentWordLength = splitStr[word].length;
    let currentLineLength = returnPostLength(finalContainer[currentPartIndex]);
    if (currentWordLength + currentLineLength < 240 - suffixChars){
      finalContainer[currentPartIndex].push(splitStr[word]);
    }else{
      finalContainer.push([]);
      currentPartIndex++;
      finalContainer[currentPartIndex].push(splitStr[word]);
    }
  }

  return finalContainer.map((element, index, array)=>{
    element.push(`[${index+1}/${array.length}]`);
    return element.join(" ");
  });
}

function returnPostLength(post){
  return post.join(" ").length;
}

module.exports = split;
