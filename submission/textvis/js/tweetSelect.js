(function() {

var topLevel = document.getElementById('topLevelSelect');
var featureSelectParent = document.getElementById('featureSelectParent');

var featureSelect;

topLevel.addEventListener("change", function() {
    if (topLevel.value == "Hurricane") {
      featureSelectParent.innerHTML = '';
      featureSelectParent.appendChild(getHurricaneFeatures(getDisabledOption()));
    }
    else {
      featureSelectParent.innerHTML = '';
      featureSelectParent.appendChild(getWeinsteinFeatures(getDisabledOption()));
    }
    changeDesc(topLevel.value,featureSelect);
    var featureSelect = document.getElementById('featureSelect')
    featureSelect.addEventListener("change", function() {
      changeDesc(topLevel.value,featureSelect.value);
      getFeatureData(topLevel.value,featureSelect.value);
    });
});


function getFeatureData(topLevel, feature){
  var newTopLevel = "hhFeatureFiles";
  if (topLevel == "Weinstein") {
    newTopLevel = "hwFeatureFiles";
  }

  $.getJSON(newTopLevel + '/' + feature + '.json')
     .done(function (data) {
         displayData(data.slice(0,5000));
     });
}

function displayData(data) {
  var tweetList = document.getElementById("tweetList");
  tweetList.innerHTML = '';
  var tweetCount = document.getElementById("tweetCount");
  tweetCount.innerHTML = data.length;
  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      tweetList.appendChild(generateTweet(data[i]));
    }
  }
  // <li class="list-group-item">#Oscars tonights not so subtle theme Spanish speakers -women -people of any color except old white <mark><b>men</b></mark> sorry harvey #Weinstein<br /><small class="text-muted">Mon Mar 05 03:15:43 +0000 2018</small></li>
}

function generateTweet(data) {
  var tweet = document.createElement("li");

  var str = data.tweet;
  var str = str.replace(data.feature, "<mark><b>" + data.feature + "</b></mark>");
  tweet.innerHTML = '"' + str + '"' + '<br /><small class="text-muted">' + data.date + '</small>';
  tweet.className = "list-group-item";
  return tweet;
}

function getDisabledOption() {
  var disabledOption = document.createElement("option");
  disabledOption.disabled = true;
  disabledOption.selected = true;
  disabledOption.value = '';
  disabledOption.text = " -- select an option -- ";
  return disabledOption
}

function getWeinsteinFeatures(disabledOption) {
  var weinsteinFeaturesWords = ["men","trump","rt","spacey","kevin","did","brad","harvey","weinstein","fuck"]
  var weinsteinFeatures = document.createElement("select");
  weinsteinFeatures.className = "form-control";
  weinsteinFeatures.id = "featureSelect";
  for (var i in weinsteinFeaturesWords) {
    if (weinsteinFeaturesWords.hasOwnProperty(i)) {
      var tempOption = document.createElement("option");
      tempOption.value = weinsteinFeaturesWords[i];
      tempOption.text = weinsteinFeaturesWords[i];
      weinsteinFeatures.appendChild(tempOption);
    }
  }
  weinsteinFeatures.appendChild(disabledOption);
  return weinsteinFeatures;
}

function getHurricaneFeatures(disabledOption) {
  var hurricaneFeaturesWords = ["hashtagtexassearchandrescue","hashtaghelpforharvey","hashtaghelpforhouston","hashtaghelpharvey","hashtaghelphouston","hashtaghelpincrisis","hashtaghelping","hashtaghelpinghand"]
  var hurricaneFeatures = document.createElement("select");
  hurricaneFeatures.className = "form-control";
  hurricaneFeatures.id = "featureSelect"
  for (var i in hurricaneFeaturesWords) {
    if (hurricaneFeaturesWords.hasOwnProperty(i)) {
      var tempOption = document.createElement("option");
      tempOption.value = hurricaneFeaturesWords[i];
      tempOption.text = hurricaneFeaturesWords[i];
      hurricaneFeatures.appendChild(tempOption);
    }
  }
  hurricaneFeatures.appendChild(disabledOption);
  return hurricaneFeatures;
}

function changeDesc(top,feat) {
  var topVal = document.getElementById("topLevelDesc");
  var featVal = document.getElementById("featureSelectDesc");

  if (top == "Hurricane") {
    topVal.innerHTML = "Hurricane Harvey";
  }
  else {
    topVal.innerHTML = "Harvey Weinstein";
  }
  featVal.innerHTML = "N/A";
  if (feat) {
    featVal.innerHTML = feat;
  }
}


}());
