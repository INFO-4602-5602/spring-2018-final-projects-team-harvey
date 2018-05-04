(function() {
// <li class="list-group-item">#Oscars tonights not so subtle theme Spanish speakers -women -people of any color except old white <mark><b>men</b></mark> sorry harvey #Weinstein<br /><small class="text-muted">Mon Mar 05 03:15:43 +0000 2018</small></li>

topLevel = document.getElementById('topLevelSelect').value;
featureSelect = document.getElementById('featureSelect');

var hurricaneFeatures = document.createElement("option");
hurricaneFeatures.text = "hashtagtexassearchandrescue";
hurricaneFeatures.value = "hashtagtexassearchandrescue";
// '<option value="hashtagtexassearchandrescue">hashtagtexassearchandrescue</option>
// <option value="hashtaghelpandhopeforhouston">hashtaghelpandhopeforhouston</option>
// <option value="hashtaghelpforharvey">hashtaghelpforharvey</option>
// <option value="hashtaghelpforhouston">hashtaghelpforhouston</option>
// <option value="hashtaghelpharvey">hashtaghelpharvey</option>
// <option value="hashtaghelphouston">hashtaghelphouston</option>
// <option value="hashtaghelpincrisis">hashtaghelpincrisis</option>
// <option value="hashtaghelping">hashtaghelping</option>
// <option value="hashtaghelpacripple">hashtaghelpacripple</option>
// <option value="hashtaghelpinghand">hashtaghelpinghand</option>';


var weinsteinFeatures = document.createElement("option");
weinsteinFeatures.text = "men";
weinsteinFeatures.value = "men";
// = '<option value="men">men</option>
// <option value="trump">trump</option>
// <option value="rt">rt</option>
// <option value="spacey">spacey</option>
// <option value="kevin">kevin</option>
// <option value="did">did</option>
// <option value="brad">brad</option>
// <option value="harvey">harvey</option>
// <option value="weinstein">weinstein</option>
// <option value="fuck">fuck</option>';

topLevel.addEventListener("change", function() {
    if (topLevel=="Hurricane") {
      featureSelect.appendChild(hurricaneFeatures);
      console.log("HI");
    }
    else {
      featureSelect.appendChild(weinsteinFeatures);
    }
});

function getFeatureData(topLevel, featureSelect){
  console.log("CHANGE");
  var currentData;
  $.getJSON(topLevel + '/' + featureSelect + '.json')
     .done(function (data) {
         currentData = data;
     });
     return currentData;
}
}());
