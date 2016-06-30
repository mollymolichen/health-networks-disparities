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
	console.log('newLinks', newLinks);
	// console.log('temparr', tempArr);

	resObj["links"] = newLinks;
	resObj["nodes"] = tempArr;
	// console.log("resObj", resObj);
	makeLocGraph (resObj);
}

function makeLocGraph(dataObject) {
 	//clear previous results
 	var prev = document.getElementById("displayResult");
 	while (prev.hasChildNodes()) {
		prev.removeChild(prev.firstChild);
	}

    // console.log('object passed in', dataObject);
    // Constants for the SVG
	var width = 960,
	    height = 700;

	//Set up the colour scale
	var color = d3.scale.category10();

	//Set up the force layout
	var force = d3.layout.force()
	    .charge(-600)
	    .linkDistance(250)
	    .size([width, height]);

	var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);

    function dragstart(d, i) {
        force.stop() // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
        d.px += d3.event.dx;
        d.py += d3.event.dy;
        d.x += d3.event.dx;
        d.y += d3.event.dy; 
    }

    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        force.resume();
    }

    function releasenode(d) {
        d.fixed = false; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        force.resume();
    }

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
	    .style("opacity", "1")
	    .style("marker-end", "url(#suit)");

	var node = svg.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("g")
	    .attr("class", "node")

	node.append("circle")
	    .attr("r", 10)
	    .style("fill", function (d) {
	    return color(d.group);
	})

	.on('dblclick', releasenode)
	.call(node_drag); 

	node.append("text")
	      .attr("dx", 15)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.name });


	//Now we are giving the SVGs co-ordinates - the force layout is generating the co-ordinates which this code is using to update the attributes of the SVG elements
	force.on("tick", function () {
	    link.attr("x1", function (d) {
		        return d.source.x;
		    })
	        .attr("y1", function (d) {
		        return d.source.y;
		    })
	        .attr("x2", function (d) {
		        return d.target.x;
		    })
	        .attr("y2", function (d) {
		        return d.target.y;
		    });

	        d3.selectAll("circle").attr("cx", function (d) {
		        return d.x;
		    })
		        .attr("cy", function (d) {
		        return d.y;
		    });

		    d3.selectAll("text").attr("x", function (d) {
		        return d.x;
		    })
		        .attr("y", function (d) {
		        return d.y;
		    });
		    node.each(collide(0.5));
	});

	//formatting arrows
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
    	.style("opacity", "2");

    	//collision detection code
    	var padding = 1, // separation between circles
		    radius=10;

		function collide(alpha) {
		  var quadtree = d3.geom.quadtree(graph.nodes);
		  return function(d) {
		    var rb = 2*radius + padding,
		        nx1 = d.x - rb,
		        nx2 = d.x + rb,
		        ny1 = d.y - rb,
		        ny2 = d.y + rb;
		    
		    quadtree.visit(function(quad, x1, y1, x2, y2) {
		      if (quad.point && (quad.point !== d)) {
		        var x = d.x - quad.point.x,
		            y = d.y - quad.point.y,
		            l = Math.sqrt(x * x + y * y);
		          if (l < rb) {
		          l = (l - rb) / l * alpha;
		          d.x -= x *= l;
		          d.y -= y *= l;
		          quad.point.x += x;
		          quad.point.y += y;
		        }
		      }
		      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		    });
		  };
		}
}


$('#search').submit(function(){
	stringMatch();
	$('#result-container').slideDown('fast');
	return false;
});
