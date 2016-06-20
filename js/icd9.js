//take user's string input and return list of matching codes
function stringMatch() {
	var input = document.getElementById('text-field').value;
	console.log('input: ' + input);
	if(input.length == 0){
		return [];
	}

	var res = input.toLowerCase();

	var newarr = [];
	for (var key in datalist) {
		if (datalist.hasOwnProperty(key)) {
			var val = datalist[key];
			if (val.indexOf(res) > -1 || key.indexOf(res) > -1){
				newarr.push(key + ":" + val);
			}
		}
	}

	console.log('newarr: ', newarr);

	var uniqueCodes = getUniqueCodes(newarr);
	var hierarchyMap = hierarchy(uniqueCodes, newarr);
	var listToDisplay = convertMapToList(uniqueCodes, hierarchyMap);

	displayRes(listToDisplay);

	return listToDisplay;
}

//make array of all unique 3 digit codes from newarr
function getUniqueCodes(codeArray) {
	var uniquearr = [];
	for (var j = 0; j< codeArray.length; j++) {
		var eachval = codeArray[j];
		var uniq = eachval.split(":")[0].split(".")[0];


		if (uniquearr.indexOf(uniq) == -1) {
			uniquearr.push(uniq);
		}
	}
	console.log('uniquearr', uniquearr);
	//sortOccurrences(uniquearr);
	return uniquearr;
}

//sort results by number of occurrences in node list
function sortOccurrences(resArr) {
	var codeMap = {};		//make a hashmap with all the node ids in the node list as the keys
							//and the number of times they occurred as values									
	for (var each in nodes) {
		if (nodes.hasOwnProperty(each)) {
			var occurrence = parseInt(nodes[each].occurs); //occurrences are integers not strings
			var nodeid = nodes[each].node_ID; //node ids are strings
	 		if (!codeMap[nodeid]) {
	 		 	codeMap[nodeid] = 0;
	 		}
	 		codeMap[nodeid] += occurrence;
	 	}
	}	

	//for each diagnosis code in the input, make a list of the diagnosis code
	//and the number of occurrences from the node list (ex. ["XXX:35", "YYY:2", etc.)
	// Diagnosis XXX occurred in the node list 35 times, YYY occurred twice
	///If code not in nodelist, number of occurrences = 0
	var sortres = []; 
	for (var i =0; i < resArr.length; i++) {
		var index = resArr[i];
		if (codeMap.hasOwnProperty(index)) {
			var n = codeMap[index];
			sortres.push(index + ":" + n);
		} else {
			sortres.push(index + ":" + 0);
		}
	}

	sortres.sort(
		function(a,b) {
			return b.split(":")[1] - a.split(":")[1]
		});
	
	
	var sorted = []; 
	for (var j = 0; j < sortres.length; j++) {
		var sortable = sortres[j];
		sorted.push(sortable.split(":")[0]);
	}
	console.log('sorted',sorted);
	//retMap(sorted);
	return sorted;
}

function hierarchy(uniqueCodes, searchMatches) {
	var hierarchyMap = {};
	uniqueCodes.forEach(function(code) {
		// var description;
		// if(threedigitlist.hasOwnProperty(code)){
		// 	description = code + ":" + threedigitlist[code];
		// }
		// else {
		// 	console.log('Error: ' + code + ' does not exist.');
		// 	return;
		// }
		var sectionList = [];
		searchMatches.forEach(function(result) {
			if (result.split(":")[0].split(".")[0].indexOf(code) > -1) {
				sectionList.push(result);
			}
		});

		// sort list
		sectionList.sort(function(a,b){
			var codeA = a.split(':')[0];
			var codeB = b.split(':')[0];
			var specificCodeA = codeA.split('.')[1];
			var specificCodeB = codeB.split('.')[1];
			return parseInt(specificCodeA, 10) - parseInt(specificCodeB, 10);
		});

		// if you want the description in the code, uncomment the lines from 98-105 and replace
		// 'code' in line 124 with 'description'
		hierarchyMap[code] = sectionList;
	});

	console.log('hierarchyMap', hierarchyMap);
	return hierarchyMap;

}

function convertMapToList(uniqueCodes, hierarchyMap) {
	var sortedCodes = sortOccurrences(uniqueCodes);
	var convertedList = [];
	sortedCodes.forEach(function(code){
		var subsection = hierarchyMap[code]; // this should be an array
		subsection.forEach(function(result){
			convertedList.push(result);
		});
	});
	console.log('convertedList', convertedList);
	return convertedList;
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
	    var div = document.createElement('div');	// create div element
	    div.innerHTML = mod;							//what text makes up link element
	    node.appendChild(div);						//put link into list node
	    div.className = 'result-item';
	    document.getElementById('search-results').appendChild(node);
			node.addEventListener('click', function(){
				findCode(res);
			});
		}());
	}
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
	//	if (nodelist.hasOwnProperty(node_ID)) {
	//		var codeID = nodelist[node_ID];
	//		if (codeID.indexOf(threeDigCode) > -1) {
	//			var centralnode =
	//		}
	//	}

	//}
}

$('#search').submit(function(){
	stringMatch();
	$('#result-container').slideDown('fast');
	return false;
});
