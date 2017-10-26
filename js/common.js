'use strict';

(function(window, document, $) {
  var tbody = document.getElementsByTagName('tbody')[0];
  var flagItaly = 'flagItaly.png';
  var teams = [];
  var th = $('#foot-tab thead tr').children();
  var trigger = 0;
  getData();

  th.on('click', trigger, function(event) {
    if(!event.target.id) {
      return;
    }
    var el = event.target.id;
    var newArray = teams.sort(sortFn(el, trigger));
    if (!trigger) {
      trigger = 1;
    } else {
      trigger = 0;
    }
    drawTable(newArray, tbody);
  });


  $.fn.sortTable = function() {

  };

  function sortFn(prop, trigger) {
    if(trigger) {
      return function(a, b) {
        return a[prop] - b[prop];
      };
    } else {
      return function(a, b) {
        return b[prop] - a[prop];
      };
    }
  }

  function getData() {
    var req = getXmlHttpRequest();
    var url = 'seriea.json';
    req.open('GET', url, true);
    req.send(null);
    req.onreadystatechange = function() {
      if (req.readyState !== 4) {
        return;
      }
      var json = JSON.parse(req.responseText);
      formArray(json);
      drawTable(teams, tbody);
    };
  }

  function drawTable(array, table) {
    while (table.firstChild) table.removeChild(table.firstChild);
    var length = array.length;
    for(var i = 0; i < length; i++) {
      var tr = document.createElement('tr');
      var color = setColor(array[i].color);
      var place = $('<td>' + array[i].place + '</td>');
      var team = $('<td></td>');
      $(tr).append(place);
      if(array[i].flag_country === 'Италия') $(team).append( $("<img src='"+flagItaly+"'>"));
      $(team).append( $("<a href='"+array[i].tag_url+"'>"+array[i].name+"</td>"));
      $(tr).append(team);
      $(tr).append( $("<td>"+array[i].matches+"</td>"));
      $(tr).append( $("<td>"+array[i].win+"</td>"));
      $(tr).append( $("<td>"+array[i].draw+"</td>"));
      $(tr).append( $("<td>"+array[i].lose+"</td>"));
      $(tr).append( $("<td>"+array[i].goals+"</td>"));
      $(tr).append( $("<td>"+array[i].conceded_goals+"</td>"));
      $(tr).append( $("<td>"+array[i].score+"</td>"));
      $(tr).addClass("foot-tab__row");
      place.css('background', color);
      tbody.appendChild(tr);
    }
  }

  function formArray(obj) {
    $.each(obj, function(key, val) {
      $.each(val, function(k, v) {
        teams.push(v);
      });
    });
  }

  function setColor(num) {
    var color = '';
    switch (num) {
      case '1':
        color = '#7fd498';
        break;
      case '2':
        color = '#cceed6';
        break;
      case '4':
        color = '#ff99b1';
        break;
      default:
        color = '#fff';
        break;
    }
    return color;
  }




  function getXmlHttpRequest() {
    if(window.XMLHttpRequest) {
      try {
        return new XMLHttpRequest();
      }
      catch(e) {}
    } else if(window.ActiveXObject) {
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch(e) {}
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e) {}
    }
    return null;
  }

})(window, document, jQuery);
