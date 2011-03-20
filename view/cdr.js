
getStuff = function() {
    jQuery.getJSON("http://localhost:8000/notes/2",
                  function(json) {
                      jQuery("#note").append("<h1>Distilery: " + json.Distillery + "</h1>");
                      jQuery("#note").append("<h1>Region: " + json.Region + "</h1>");
                      jQuery("#note").append("<h1>Name: " + json.Name + "</h1>");
                      jQuery("#note").append("<h1>Batch: " + json.Batch + "</h1>");
                      jQuery("#note").append("<h1>Age: " + json.Age + "</h1>");
                      jQuery("#note").append("<h1>Note: " + json.Note + "</h1>");
                      jQuery("#note").append("<h1>Score: " + json.Score + "</h1>");
                  });
};