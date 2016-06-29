/*//make array of all unique 3 digit codes from newarr
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
        var threshold = numwords > 2 ? numwords : 2;
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
    stringMatch(res); //FIX
  }
}*/

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
	//console.log('uniquearr', uniquearr);
	return uniquearr;
}

//sort results by number of occurrences in node list
function sortOccurrences(resArr) {
	var codeMap = {};		//make a hashmap with all the node ids in the node list as the keys
							//and the number of times they occurred as values									
	for (var each in myEntryNodes) {
		if (myEntryNodes.hasOwnProperty(each)) {
			var occurrence = parseInt(myEntryNodes[each].occurs); //occurrences are integers not strings
			var nodeid = myEntryNodes[each].node_ID; //node ids are strings
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
	//console.log('sorted',sorted);
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

	//console.log('hierarchyMap', hierarchyMap);
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
	//console.log('convertedList', convertedList);
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
				$("#result-container").slideUp("fast");
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
	//console.log('code:', code);
	codeMatch(code);
}

//match user-selected code to nodelist 
function codeMatch(threeDigCode) {
	var targArr = [];
	var sourceArr = [];
	var nlinkList = [];
	var resObj ={};
	for (var obj in myEntryLinks) {
		if (myEntryLinks.hasOwnProperty(obj)) {
			var source = myEntryLinks[obj].source;
	 		var targ = myEntryLinks[obj].target;
	 		if (source.indexOf(threeDigCode) > -1) {
				nlinkList.push(myEntryLinks[obj]);
				targArr.push(myEntryLinks[obj].target);
			}
			if (targ.indexOf(threeDigCode) > -1) {
				nlinkList.push(myEntryLinks[obj]);
				sourceArr.push(myEntryLinks[obj].source);
			}
		}
	}

	allNodes = targArr.concat(sourceArr);
	allNodes.push(threeDigCode);
	$.unique(allNodes);
	// console.log('allNodes', allNodes);
	// console.log('nlinkList', nlinkList);

	var description = [];
	allNodes.forEach(function(code) {
		if(threedigitlist.hasOwnProperty(code)){
			description.push(code + ":" + threedigitlist[code]);
		}
	});
	//console.log('description',description);
	
	//assigning name and group number to local nodes
	var tempArr = [];
	for (i = 0; i < description.length; i ++) {
		newObj = {};
		newObj["name"] = description[i];
		if (description[i].split(":")[0].indexOf(threeDigCode)> -1) {
			newObj["group"] = 0;
		} else {
			newObj["group"]=1;
		}

		tempArr.push(newObj);
	}

	//defining weight of links
	var newLinks = [];
	for(var j = 0; j < nlinkList.length; j++) {
		var node = nlinkList[j];
		var nwObject = {};
		var weight = 0;
		for(var i = 0; i < myEntryLinks.length; i++) {
			if(node.source == myEntryLinks[i].source
				&& node.target == myEntryLinks[i].target) {
				weight++;
			}
		}
		nwObject.value = weight;
		newLinks.push(nwObject);
	}

	//defining source and target of links as index of node list
	
	console.log('temparr', tempArr);
	for (var j = 0; j <nlinkList.length; j++) {
		var node = nlinkList[j];
		var newObject = newLinks[j];
		newObject["source"] = undefined;
		newObject["target"] = undefined;

		for (var k =0; k < tempArr.length; k++) {
			var name = tempArr[k].name.split(":")[0];
			// console.log('source:', node.source, 'target:', node.target);
			if(!newObject['source'] && name == node.source){
				newObject['source'] = k;
			}
			if(!newObject['target'] && name == node.target){
				newObject['target'] = k;
			}
		}

		newLinks[j] = newObject;
	}
	// console.log('newLinks', newLinks);
	// console.log('temparr', tempArr);

	resObj["links"] = newLinks;
	resObj["nodes"] = tempArr;
	// console.log("resObj", resObj);
	makeLocGraph (resObj);
}

function makeLocGraph(dataObject) {

	// var width = 960,
 //    height = 500;

	// var color = d3.scale.category20();

	// var force = d3.layout.force()
	//     .charge(-120)
	//     .linkDistance(30)
	//     .size([width, height]);

	// var svg = d3.select("body").append("svg")
	//     .attr("width", width)
	//     .attr("height", height);

	// var graph = dataObject;

 //  	force
 //      	.nodes(graph.nodes)
 //      	.links(graph.links)
 //      	.start();

 //  	var link = svg.selectAll(".link")
 //      	.data(graph.links)
 //    	.enter().append("line")
 //      	.attr("class", "link")
 //      	.style("stroke-width", function(d) { return Math.sqrt(d.value); });

 //  	var node = svg.selectAll(".node")
 //      	.data(graph.nodes)
 //    	.enter().append("circle")
 //      	.attr("class", "node")
 //      	.attr("r", 5)
 //      	.style("fill", function(d) { return color(d.group); })
 //      	.call(force.drag);

 //  	node.append("title")
 //      	.text(function(d) { return d.name; });

 //  	force.on("tick", function() {
 //    	link.attr("x1", function(d) { return d.source.x; })
 //        .attr("y1", function(d) { return d.source.y; })
 //        .attr("x2", function(d) { return d.target.x; })
 //        .attr("y2", function(d) { return d.target.y; });

 //    node.attr("cx", function(d) { return d.x; })
 //        .attr("cy", function(d) { return d.y; });
 //  });

 	//clear previous results
 	var prev = document.getElementById("displayResult");
 	while (prev.hasChildNodes()) {
		prev.removeChild(prev.firstChild);
	}

    // console.log('object passed in', dataObject);
    // Constants for the SVG
	var width = 960,
	    height = 500;

	//Set up the colour scale
	var color = d3.scale.category20();

	//Set up the force layout
	var force = d3.layout.force()
	    .charge(-120)
	    .linkDistance(200)
	    .size([width, height]);

	//Append a SVG to the body of the html page. Assign this SVG as an object to svg
	var svg = d3.select("#displayResult").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	var graph = dataObject;

	//Creates the graph data structure out of the json data
	force.nodes(graph.nodes)
	    .links(graph.links)
	    .start();

	//Create all the line svgs but without locations yet
	var link = svg.selectAll(".link")
	    .data(graph.links)
	    .enter().append("line")
	    .attr("class", "link")
	    .style("marker-end", "url(#suit)");

	var node = svg.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("g")
	    .attr("class", "node")
	    .call(force.drag);

	node.append("circle")
	    .attr("r", 11)
	    .style("fill", function (d) {
	    return color(d.group);
	})

	node.append("text")
	      .attr("dx", 10)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.name });

	//Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
	force.on("tick", function () {
	    link.attr("x1", function (d) {
		        return d.source.x * 1.0;
		    })
	        .attr("y1", function (d) {
		        return d.source.y * 1.0;
		    })
	        .attr("x2", function (d) {
		        return d.target.x *1.0;
		    })
	        .attr("y2", function (d) {
		        return d.target.y * 1.0;
		    });

	        d3.selectAll("circle").attr("cx", function (d) {
		        return d.x * 1.0;
		    })
		        .attr("cy", function (d) {
		        return d.y * 1.0;
		    });

		    d3.selectAll("text").attr("x", function (d) {
		        return d.x * 1.0;
		    })
		        .attr("y", function (d) {
		        return d.y * 1.0;
		    });
    
	    // node.attr("cx", function (d) {
		   //      return d.x;
		   //  })
	    //     .attr("cy", function (d) {
		   //      return d.y;
		   //  });
	});

	svg.append("defs").selectAll("marker")
    	.data(["suit", "licensing", "resolved"])
  		.enter().append("marker")
    	.attr("id", function(d) { return d; })
    	.attr("viewBox", "0 -5 10 10")
    	.attr("refX", 25)
    	.attr("refY", 0)
    	.attr("markerWidth", 8)
    	.attr("markerHeight", 8)
    	.attr("orient", "auto")
  		.append("path")
    	.attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
    	.style("stroke", "#4679BD")
    	.style("opacity", "0.6");
}

//MAIN
$('#search').submit(function(){
	//boolSearch();
	stringMatch();
	$('#result-container').slideDown('fast');
	return false;
});
