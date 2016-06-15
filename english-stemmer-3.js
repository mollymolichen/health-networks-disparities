
stemmer = function() {
    function i() {}

    function j() {
        console.log(Array.prototype.slice.call(arguments).join(" "))
    }
    var k = {
            ational: "ate",
            tional: "tion",
            enci: "ence",
            anci: "ance",
            izer: "ize",
            bli: "ble",
            alli: "al",
            entli: "ent",
            eli: "e",
            ousli: "ous",
            ization: "ize",
            ation: "ate",
            ator: "ate",
            alism: "al",
            iveness: "ive",
            fulness: "ful",
            ousness: "ous",
            aliti: "al",
            iviti: "ive",
            biliti: "ble",
            logi: "log"
        },
        l = {
            icate: "ic",
            ative: "",
            alize: "al",
            iciti: "ic",
            ical: "ic",
            ful: "",
            ness: ""
        };
    return function(a, m) {
        var d, c, g, b, h, e, f = a;
        e = m ? j : i;
        if (3 > a.length) return a;
        g = a.substr(0, 1);
        "y" == g && (a = g.toUpperCase() + a.substr(1));
        b = /^(.+?)(ss|i)es$/;
        c = /^(.+?)([^s])s$/;
        b.test(a) ? (a = a.replace(b, "$1$2"), e("1a", b, a)) : c.test(a) && (a = a.replace(c, "$1$2"), e("1a", c, a));
        b = /^(.+?)eed$/;
        c = /^(.+?)(ed|ing)$/;
        b.test(a) ? (c = b.exec(a), b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, b.test(c[1]) && (b = /.$/, a = a.replace(b, ""), e("1b", b, a))) : c.test(a) && (c = c.exec(a), d = c[1], c = /^([^aeiou][^aeiouy]*)?[aeiouy]/, c.test(d) && (a = d, e("1b", c, a), c = /(at|bl|iz)$/, h = /([^aeiouylsz])\1$/, d = /^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/,
            c.test(a) ? (a += "e", e("1b", c, a)) : h.test(a) ? (b = /.$/, a = a.replace(b, ""), e("1b", h, a)) : d.test(a) && (a += "e", e("1b", d, a))));
        b = /^(.*[aeiouy].*)y$/;
        b.test(a) && (c = b.exec(a), d = c[1], a = d + "i", e("1c", b, a));
        b = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
        b.test(a) && (c = b.exec(a), d = c[1], c = c[2], b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, b.test(d) && (a = d + k[c], e("2", b, a)));
        b = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        b.test(a) && (c = b.exec(a), d = c[1], c = c[2], b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, b.test(d) && (a = d + l[c], e("3", b, a)));
        b = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
        c = /^(.+?)(s|t)(ion)$/;
        b.test(a) ? (c = b.exec(a), d = c[1], b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, b.test(d) && (a = d, e("4", b, a))) : c.test(a) && (c = c.exec(a), d = c[1] + c[2], c = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,
            c.test(d) && (a = d, e("4", c, a)));
        b = /^(.+?)e$/;
        if (b.test(a) && (c = b.exec(a), d = c[1], b = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/, c = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$/, h = /^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/, b.test(d) || c.test(d) && !h.test(d))) a = d, e("5", b, c, h, a);
        b = /ll$/;
        c = /^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/;
        b.test(a) && c.test(a) && (b = /.$/, a = a.replace(b, ""), e("5",
            b, c, a));
        "y" == g && (a = g.toLowerCase() + a.substr(1));
        g = {
            skis: "ski",
            skies: "sky",
            dying: "die",
            lying: "lie",
            tying: "tie",
            idly: "idl",
            gently: "gentl",
            ugly: "ugli",
            early: "earli",
            only: "onli",
            singly: "singl"
        };
        g[f] !== {}[f] && (a = g[f], e("Special Word", a)); - 1 !== "sky news howe atlas cosmos bias          andes inning outing canning herring          earring proceed exceed succeed".indexOf(f) && (a = f, e("Special Word", a));
        b = /.*generate?s?d?(ing)?$/;
        b.test(f) && (a += "at", e("Overstemmed", a));
        b = /.*general(ly)?$/;
        b.test(f) && (a += "al",
            e("Overstemmed", a));
        b = /.*generic(ally)?$/;
        b.test(f) && (a += "ic", e("Overstemmed", a));
        b = /.*generous(ly)?$/;
        b.test(f) && (a += "ous", e("Overstemmed", a));
        b = /.*communit(ies)?y?/;
        b.test(f) && (a += "iti", e("Overstemmed", a));
        return a
    }
}();

function multipleWords(string){
  var specialCharacters = [" ", " ,", ",", "-", "(", ")"];
  
  for (var i=0; i < specialCharacters.length; i++){
    if (string.includes(specialCharacters[i])){ //needs to iterate through all special characters each time
      return true;
    }
  }
  //default - 1 word
  return false;
}

function useStemmer2(){
  //var myCodes = [];
  //var specialCharacters = [" ", " ,", ",", "-", "(", ")"];
  var removeChars, splitWord;
  var multipleWords = false;

  for (var key in threedigitlist) {
    if (threedigitlist.hasOwnProperty(key)) {
      //iterate through all special characters - DOESN'T account for phrases w/ multiple special characters!!!
        //threedigitlist[key].split("[^a-z0-9]");
        removeChars = threedigitlist[key].replace(/\W+/g, " ");
        console.log(removeChars);
        splitWord = removeChars.split(" ");
        console.log(splitWord);
        //if (threedigitlist[key].includes(" ") || threedigitlist[key].includes("(") || threedigitlist[key].includes(")") || threedigitlist[key].includes(",") || threedigitlist[key].includes("-") ||){
        //if there are multiple words in a phrase
        //if (threedigitlist[key].includes(specialCharacters[i])){ //should return a Boolean
          //multipleWords = true;
          //splitWord = threedigitlist[key].split(specialCharacters[i]); //creates an array
          //call stemmer function for each part of the phrase
         for (var i=0; i<splitWord.length; i++){
            stemmer(splitWord[i], true);
          }       
        } 
      
    
      /*if (!multipleWords){
          stemmer(threedigitlist[key], true)
        }*/
    }
}

function displayResults(){
 //replaces above for loop as a search method
  console.log("Your search for " + input + " returned:");
  
  var wordsInCommon = 0;
  var threshold;
  var inputArr = input.split(" ");
  //console.log(inputArr);
  for (var key in datalist){
    if (datalist.hasOwnProperty(key)){
      var val = datalist[key].replace(/\W+/g, " "); //value w/o special chars
      //console.log(val);
      var valArr = datalist[key].split(" ");        //for counting purposes
      for (var i=0; i < inputArr.length; i++){
        //console.log(inputArr[i]);
        if (val.includes(inputArr[i])){ //try stemmer(inputArr[i]) 
          wordsInCommon++;
          //console.log("found a word in common!");
        }
      }

      threshold = Math.floor(0.25 * valArr.length); //Math.floor? Makes it harder to pass threshold
      //console.log(threshold);
      if (wordsInCommon >= threshold){
        newarr.push(key + " : " + val);
        //console.log("pushed");
      }
      wordsInCommon = 0; //reset
    }
  }

  console.log('newarr: ', newarr);
}

/*function oldestUseStemmer(){
  //var specialCharacters = [" ", " ,", ",", "-", "(", ")"]; //this creates infinite loop - try to use multiple || statements instead
  var splitWord;

  for (var key in threedigitlist) {
    if (threedigitlist.hasOwnProperty(key)) {
        if (threedigitlist[key].includes(" ")){ 
          splitWord = threedigitlist[key].split(" ");
          for (var i=0; i<splitWord.length; i++){
              stemmer(splitWord[i], true);
          }
        }
      }
      else {
        stemmer(threedigitlist[key], true);
      }
    }
}

function oldUseStemmer(){
  var specialCharacters = [" ", " ,", ",", "-", "(", ")"]; //this creates infinite loop - try to use multiple || statements instead
  var splitWord;

  for (var key in threedigitlist) {
    if (threedigitlist.hasOwnProperty(key)) {
      for (var i=0; i < specialCharacters.length; i++){
        if (threedigitlist[key].includes(specialCharacters[i])){ 
          splitWord = threedigitlist[key].split(specialCharacters[i]);
          for (var i=0; i<splitWord.length; i++){
              stemmer(splitWord[i], true);
            }  
          }
        }
      }
      else {
        stemmer(threedigitlist[key], true);
      }
    }
}

function useStemmer(){
  //var myCodes = [];
  var specialCharacters = [" ", " ,", ",", "-", "(", ")"];
  var splitWord;
  var multipleWords = false;

  for (var key in threedigitlist) {
    if (threedigitlist.hasOwnProperty(key)) {
      //iterate through all special characters - DOESN'T account for phrases w/ multiple special characters!!!
      for (var i=0; i < specialCharacters.length; i++){
        //if there are multiple words in a phrase
        if (threedigitlist[key].includes(specialCharacters[i])){ //should return a Boolean
          multipleWords = true;
          splitWord = threedigitlist[key].split(specialCharacters[i]); //creates an array
          //call stemmer function for each part of the phrase
          for (var i=0; i<splitWord.length; i++){
            stemmer(splitWord[i], true);
          }        
        } 
      }
    
      if (!multipleWords){
          stemmer(threedigitlist[key], true)
        }
    }
  }
}*/


//test
useStemmer2(); //modify stemmer to access each word separately
//stemmer("molasseses", true);