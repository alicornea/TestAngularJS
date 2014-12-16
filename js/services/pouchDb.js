(function() {

    var db = new PouchDB('todos');
    var action = {
        _id: "gigi2",
        name: "bmida"
    };
    db.put(action, function cb(err, result) {
        if (!err) {
            console.log("success");
            db.allDocs({include_docs:false,descending:true},function(err,docs){console.log(docs.rows)})
        }
        else
        	console.log(err);
    })
}());
