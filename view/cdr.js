
getStuff = function() {
    jQuery.getJSON("http://localhost:8000/notes/1",
                  function(json) {
                      jQuery("#note").append("<h3>Distilery: " + json.Distillery + "</h3>");
                      jQuery("#note").append("<h3>Region: " + json.Region + "</h3>");
                      jQuery("#note").append("<h3>Name: " + json.Name + "</h3>");
                      jQuery("#note").append("<h3>Batch: " + json.Batch + "</h3>");
                      jQuery("#note").append("<h3>Age: " + json.Age + "</h3>");
                      jQuery("#note").append("<h3>Note: " + json.Note + "</h3>");
                      jQuery("#note").append("<h3>Score: " + json.Score + "</h3>");
                  });

    jQuery.getJSON("http://localhost:8000/notes/2",
                  function(json) {
                      jQuery("#note").append("<hr />");
                      jQuery("#note").append("<h3>Distilery: " + json.Distillery + "</h3>");
                      jQuery("#note").append("<h3>Region: " + json.Region + "</h3>");
                      jQuery("#note").append("<h3>Name: " + json.Name + "</h3>");
                      jQuery("#note").append("<h3>Batch: " + json.Batch + "</h3>");
                      jQuery("#note").append("<h3>Age: " + json.Age + "</h3>");
                      jQuery("#note").append("<h3>Note: " + json.Note + "</h3>");
                      jQuery("#note").append("<h3>Score: " + json.Score + "</h3>");
                  });
};
