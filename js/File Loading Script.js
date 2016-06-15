//global variables go here

//load data
d3.json("my5000Entries.json", function(error, data){
    for (var d in data){
        d.age = d.age;
        d.gender = d.gender;
        d.node_ID = d.node_ID;
        d.occurs = d.occurs;
        d.race_ethn = d.race_ethn;
        //not sure
        d.category = d.category;
        d.largeCategory = d.largeCategory;
    }
        categorize(nodes);
        console.log("Is this working");
        visualize(data);
});

//functions defined below
