//global vars
//var myKeys = [];

//find intersections of all string queries
function boolSearch(){
  var input = document.getElementById('text-field').value;
  console.log('input: ' + input);
  if(input.length == 0){
    return [];
  }

  var res = input.toLowerCase();

  if (res.indexOf(" ") > -1) {
    var newKeys = res.split(" ");
    var matchlist = [];

    for (var a = 0; a < newKeys.length; a++) {
      var nkey = newKeys[a];
      if(nkey != ' '){
        var eacharr = stringMatch(nkey);
        matchlist.push(eacharr);
      }
    }
    console.log('matchlist ', matchlist);

    var emptyarr = [];
    for (var b = 0; b < matchlist.length; b++) {
      var eachele = matchlist[b];
      emptyarr = emptyarr.concat(eachele);
    }

    var wordMap = {};
    emptyarr.forEach(function(result){
      if(!wordMap[result]){
        wordMap[result] = 0;
      }
      wordMap[result]++;
    });

    var result = [];
    for(var key in wordMap){
      if(wordMap.hasOwnProperty(key)){
        var numwords = newKeys.length;
        var threshold = numwords > 2 ? numwords - 1 : 2;
        if(wordMap[key] >= threshold){
         result.push(key);
        }
      }
    }

    //  var nonunique = [];
    //  var prev;
    //  emptyarr.sort();
    //  for (var i = 0; i < emptyarr.length; i++) {
    //    if (emptyarr[i] == prev) {
    //      nonunique.push(emptyarr[i]);
    //    }
    //    prev = emptyarr[i];
    //  }
    //
    // retresult = $.unique(nonunique);
    // displayRes(retresult);
    // makeUnique(retresult);

    displayRes(result);
    makeUnique(result);

  } else {
    stringMatch(res);
  }
}

//take user's string input and return list of matching codes
function stringMatch(result) {
  var newarr = [];
  var myKeys = [];
  for (var key in datalist) {
    if (datalist.hasOwnProperty(key)) {
      var val = datalist[key];
      if (val.indexOf(result) > -1 || key.indexOf(result) > -1){
        newarr.push(key + ":" + val);
      }
    }
  }

  console.log('newarr: ', newarr);

  //makeUnique(newarr);
  displayRes(newarr);
  return newarr;
}

//take user's string input and return list of codes
function stringMatch() {
  var newarr = [];
  var myKeys = [];

  /*var rawInput = document.getElementById('text-field').value;
  console.log('input: ' + rawInput);
  if(rawInput.length == 0){
    return [];
  }

  var input = stemmer(rawInput, true);*/

  var input = document.getElementById('text-field').value;
  console.log('input: ' + input);
  if (input.length == 0){
    return [];
  }

  var res = input.toLowerCase();
  for (var key in datalist) {
    if (datalist.hasOwnProperty(key)) {
      var val = datalist[key];
      if (val.indexOf(res) > -1 || val.indexOf(key) > -1){ //if value matches search, word for word
        newarr.push(key + " : " + val);
        myKeys.push(key);
      }
    }
  }
  /*
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
  }*/

  console.log('newarr: ', newarr);

  //show how many results were found
  var resultCount = document.getElementById('resultCount');
  resultCount.innerText = newarr.length + ' results found';

  //remove previous displays on screen in order to update
  var newList = document.getElementById("search-results");
  while (newList.hasChildNodes()){
  	newList.removeChild(newList.firstChild); //other version didn't have ;
  }

  //display list of matching results for user to select from
  for (var i = 0; i < newarr.length; i++){
  	(function(){
  		var res = newarr[i];
  		var info = res.split(":"); //keep this as an array so you can access more elements
  		var key = info[0];				 //code
  		var value = info[1];			//diagnosis - need to categorize
  		var mod = '<strong>' + info[0] + '</strong>' + ' - ' + value[0].toUpperCase() + value.slice(1);
  		var node = document.createElement("LI"); //create a list node
  		var div = document.createElement("div"); //create a div element
  		div.innerHTML = mod; //text that makes up 
  		node.appendChild(div);
  		div.className = 'result-item';
  		document.getElementById('search-results').appendChild(node);
  		node.addEventListener("click", function(){
  			findCode(res);
  		});
  	}()); 
  }
  //return myKeys;
}

//display how many results were found
function displayRes(nArray) {
  var resultCount = document.getElementById('resultCount');
  resultCount.innerText = nArray.length + ' results found';

//remove all previous displays on screen in order to update
  var newList = document.getElementById("search-results");
  while (newList.hasChildNodes()) {
    newList.removeChild(newList.firstChild);
  }

//display list of matching results for user to select from
  for (var i = 0; i < nArray.length; i++) {
    (function(){
      var res = nArray[i];
    var info = res.split(":");
    var keycode = info[0];
      var descrip = info[1];
      var mod = '<strong>' + info[0] + '</strong>' + ' - '
                  + descrip[0].toUpperCase() + descrip.slice(1);

      var node = document.createElement ("LI");  // create a list node
      var div = document.createElement('div');  // create div element
      div.innerHTML = mod;              //what text makes up link element
      node.appendChild(div);            //put link into list node
      div.className = 'result-item';
      document.getElementById('search-results').appendChild(node);
      node.addEventListener('click', function(){
        findCode(res);
      });
    }());
  }
}
/*function displayResults(){
  //is splitword local? is input (from icd9.js) accessible? look into dynamic file loading if doesn't work
  //see whether user input matches 25% of array entries
  /*if (splitWord.length = 1){
    if (input === splitWord[0]){
      document.write(splitWord[0]); //document write is equivalent to displaying in search bar - format later
    }
  }
  else { //search phrase has multiple words

  }*/
 /* document.write("Your search for " + input + " returned: <br/>");
  
  var wordsInCommon = 0;
  var threshold;
  var inputArr = input.split(" ");

  for (var key in datalist){
    if (datalist.hasOwnProperty(key)){
      var val = datalist[key].replace(/\W+/g, " "); //value w/o special chars
      var valArr = datalist[key].split(" ");        //for counting purposes
      for (var i=0; i < inputArr.length; i++){
        if (key.includes(inputArr[i])){ //try stemmer(inputArr[i]) 
          wordsInCommon++;
        }
      }

      threshold = 0.25 * valArr.length;
      if (wordsInCommon >= threshold){
        newArr.push(datalist[key]);
      }
    }
  }
}*/

//function to return unique integers of search results for subCategory sort/display purposes
function resultCategories(myArray){

  //var unfiltered = [];
  //IF USING 3DIGIT LIST, DON'T NEED TO TRUNCATE
  //place truncated entries into own array
  /*for (var i = 0; i < myArray.length; i++){							 //V101.67 : Heart Disease
    var key = myArray[i].split(":")[0];									 //V101.67
    var roundedEntry = key.slice(0, key.indexOf("."));   //V101
    unfiltered.push(roundedEntry);
  }*/

  //remove duplicates
  var filtered = myArray.filter(function(item, pos){
    return myArray.indexOf(item) == pos;
  });
  for (var item in filtered){
  	document.write(filtered[item] + ", ");
  }
  var myMap = new Map();
  //output
  for (var i = 0; i < myArray.length; i++){
       var code = myArray[i];
              if (code == 0) return error;
              if (code > 0 && code <= 139){
                  subCategory = "Infections and Parasitic Diseases";
                  category = "Integumentary System";
              }
              if (code >= 140 && code <= 239){
                  subCategory = "Neoplasms";
                  category = "Clinical Diagnostics";
              }
              if (code >= 240 && code <= 279){
                  subCategory = "Endocrine, Nutritional and Metabolic Diseases, and Immunity Disorders";
                  category = "Regulatory Systems";
              }
              if (code >= 280 && code <= 289){
                  subCategory = "Diseases of the Blood and Blood-Forming Organs";
                  category = "Circulatory/Respiratory Systems";
              }
              if (code >= 290 && code <= 319){
                  subCategory = "Mental Disorders";
                  category = "Nervous System and Psychological Disorders";
              }
              if (code >= 320 && code <= 389){
                  subCategory = "Diseases of the Nervous System and Sense Organs";
                  category = "Nervous System and Psychological Disorders";
              }
              if (code >= 390 && code <= 459){
                  subCategory = "Diseases of the Circulatory System";
                  category = "Circulatory/Respiratory Systems";
              }
              if (code >= 460 && code <= 519){
                  subCategory = "Diseases of the Respiratory System";
                  category = "Circulatory/Respiratory Systems";
              }
              if (code >= 520 && code <= 579){
                  subCategory = "Diseases of the Digestive System";
                  category = "Regulatory Systems";
              }
              if (code >= 580 && code <= 629){
                  subCategory = "Diseases of the Genitourinary System";
                  category = "Regulatory Systems";
              }
              if (code >= 630 && code <= 679){
                  subCategory = "Complications of Pregnancy, Childbirth, and the Puerperium";
                  category = "Reproductive System";
              }
              if (code >= 680 && code <= 709){
                  subCategory = "Diseases of the Skin and Subcutaneous Tissue";
                  category = "Integumentary System";
              }
              if (code >= 710 && code <= 739){
                  subCategory = "Diseases of the Musculoskeletal System and Connective Tissue";
                  category = "Integumentary System";
              }
              if (code >= 740 && code <= 759){
                  subCategory = "Congenital Anomalies";
                  category = "Reproductive System";
              }
              if (code >= 760 && code <= 779){
                  subCategory = " Certain Conditions Originating in the Perinatal Period";
                  category = "Reproductive System";
              }
              if (code >= 780 && code <= 799){
                  subCategory = "Symptoms, Signs, and Ill-Defined Conditions";
                  category = "Clinical Diagnostics";
              }
              if (code >= 800 && code <= 999){
                  subCategory = "Injury and Poisoning";
                  category = "Injury and Poisoning";
              }
              if (code.includes("E")){
                  subCategory = "Supplementary Classification of External Causes of Injury and Poisoning";
                  category = "Injury and Poisoning";
              }
              if (code.includes("V")){
                  subCategory = "Supplementary Classification of Factors Influencing Health Status and Contact with Health Services";
                  category = "Clinical Diagnostics";
              }

              //sort output
              myMap.set(category, code);  //key = category, value = code(s) associated with category
              //output
              //document.write(category + ": " + filtered[i] + "\n");
       }

       //map is outputting the entry right after the last one in its category  fix
       /*for (var [key, value] of myMap.entries()){
       		document.write(key + ": " + value + "<br>");
       } */

       /*for (var value of myMap.values()){
        	document.write(value + ", ");
       }*/

       /*for (var key of myMap.keys()){
       		document.write(key + ": ");
       		for (var value of myMap.values()){
       				document.write(value + " ");
       		}
       }*/
       //console.log(myMap.keys().length);
       /*for (var i = 0; i < myMap.keys().length, i++){
       		document.write(myMap.keys(i) + ": ");
       		for (var j=0; j<myMap.keys(i), j++){
       			document.write(myMap.values(j) + " ");
       		}
       }*/
  }

//make a link for each entry in newarr to display to user
function makeLink(entry) {

}

//take user chosen link and extract the numerical code
function findCode(choice){
  // '524.72:alveolar mandibular hyperplasia' => ['524.72', 'alveolar mandibular hyperplasia']
  var numCode = choice.split(":")[0];
  var decimalPos = numCode.indexOf(".");
  var code = numCode.slice(0, decimalPos);
  console.log(code);
  codeMatch(code);
}

//match code to nodelist -> ultimately display local network
function codeMatch(threeDigCode) {
//for (var node_ID in my5000Entries) {
  //  if (nodelist.hasOwnProperty(node_ID)) {
  //    var codeID = nodelist[node_ID];
  //    if (codeID.indexOf(threeDigCode) > -1) {
  //      var centralnode =
  //    }
  //  }

  //}
}

//make array of all unique 3 digit codes from newarr
function makeUnique(codeArray) {
  var uniquearr = [];
  for (var j = 0; j< codeArray.length; j++) {
    var eachval = codeArray[j];
    var uniq = eachval.split(":")[0].split(".")[0];


    if (uniquearr.indexOf(uniq) == -1) {
      uniquearr.push(uniq);
    }
  }
  console.log('unique array ', uniquearr);
}

//create an age slider
/*$(document).on("ready", function(){
    
    function moveSlider(e){
      e.preventDefault();
      var pos = $(e.currentTarget).offset(),
      posX = e.pageX - pos.left,
      value = posX*100/$(e.currentTarget).outerWidth();
      
      if (posX >= 0 && posX <= $(e.currentTarget).outerWidth()){
        $('slider > .progress').css('width', posX+'px');
        $('.slider > .indicator').css('left', posX+'px');
        $('#valueSlider').val(value);
      }
    }

    $('.slider').on('mousedown', function(e) {
      moveSlider(e);
      $(this).on('mousemove', function(e){
        moveSlider(e);
      });
    }).on('mouseup', function(){
      $(this).off('mousemove');
    });
});*/

//MAIN
$('#search').submit(function(){
  //var myArray = stringMatch();
  //resultCategories(myArray);
  boolSearch();
  $('#result-container').slideDown('fast');
  return false;
});
