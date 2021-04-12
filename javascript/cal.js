function startUp(){
  document.getElementById("events-view").style.display = "none";
  document.getElementById("calendar-view").style.width = "100%";
  // var height_div = document.getElementById("calendar-view").style.getPropertyValue('height');
  // console.log(height_div);
  // document.getElementById("events-view").style.height =height_div;

}

var last_event_id=0;
var json_events =[
      {
          "Date": "3/12/21",
          "time": "10:00",
          "eventName": "Meeting with Joe"
      },
      {
          "Date": "3/12/21",
          "time": "14:00",
          "eventName": "Meeting with Team"
      },
      {
          "Date": "3/15/21",
          "time": "10:00",
          "eventName": "Team Meeting"
      },
      {
          "Date": "3/15/21",
          "time": "11:00",
          "eventName": "Meeting with Development team on new Product concept"
      },
      {
          "Date": "3/15/21",
          "time": "15:00",
          "eventName": "Meeting with UI team"
      },
      {
          "Date": "3/16/21",
          "time": "10:00",
          "eventName": "Private Investors in San Jose"
      },
      {
          "Date": "3/16/21",
          "time": "15:00",
          "eventName": "Meeting at Deron"
      },
      {
          "Date": "3/19/21",
          "time": "12:00",
          "eventName": "Lunch @TF"
      },
      {
          "Date": "3/19/21",
          "time": "16:00",
          "eventName": "One more Long meeting for the day and then no more"
      }
  ];

function mark_all_events(){
  var list_of_events=[];
  for(var i=0; i<json_events.length; i++){
    var temp = json_events[i].Date.split("/");
    var current_event_date= parseInt(temp[1]);
    list_of_events.push(current_event_date);
  }

  return list_of_events;
}

function showEvents(event_id){
  document.getElementById("events-view").style.display= "inline-block";
  document.getElementById("calendar-view").style.width = "70%";
  // console.log(last_event_id+","+event_id);

  var current_date = parseInt(document.getElementById(event_id).innerText);
  if(last_event_id==0){
    last_event_id= event_id;
    json_events_data(current_date);
  }
  else if(event_id== last_event_id){
    last_event_id= 0;
    startUp();
    // json_events_data(current_date);
  }
  else{
    last_event_id = event_id;
    json_events_data(current_date);
  }


}

function create_week_days_grid(){
  var allGridCode="";
  var i=0, totalDays=7;
  for(; i<totalDays; i++){
    if(i==0){
      allGridCode = "<div><span>Mon</span></div>  <div><span>Tue</span></div>  <div><span>Wed</span></div>  <div><span>Thu</span></div> <div><span>Fri</span></div> <div><span>Sat</span></div> <div><span>Sun</span></div>";
    }
    else{
      allGridCode += "<div><span onclick='showEvents(this.id)' id='r_"+i+"c_1'></span></div>  <div><span onclick='showEvents(this.id)' id='r_"+i+"c_2'></span></div>  <div><span onclick='showEvents(this.id)' id='r_"+i+"c_3'></span></div> <div><span onclick='showEvents(this.id)' id='r_"+i+"c_4'></span></div> <div><span onclick='showEvents(this.id)' id='r_"+i+"c_5'></span></div> <div><span onclick='showEvents(this.id)' id='r_"+i+"c_6'></span></div> <div><span onclick='showEvents(this.id)' id='r_"+i+"c_7'></span></div>" ;
    }
  }
  document.getElementById("week-days").innerHTML = allGridCode;
}

function setHeader_in_calendar_view(month, year){
  if(month.localeCompare("Jan")==0){
    month="January";
  }
  else if(month.localeCompare("Feb")==0){
    month="February";
  }
  else if(month.localeCompare("Mar")==0){
    month="March";
  }
  else if(month.localeCompare("Apr")==0){
    month="April";
  }
  else if(month.localeCompare("May")==0){
    month="May";
  }
  else if(month.localeCompare("Jun")==0){
    month="June";
  }
  else if(month.localeCompare("Jul")==0){
    month="July";
  }
  else if(month.localeCompare("Aug")==0){
    month="August";
  }
  else if(month.localeCompare("Sep")==0){
    month="September";
  }
  else if(month.localeCompare("Oct")==0){
    month="October";
  }
  else if(month.localeCompare("Nov")==0){
    month="November";
  }
  else if(month.localeCompare("Dec")==0){
    month="December";
  }

  document.getElementById("header").innerHTML = "<span style='position:relative; left:20%;'>"+month+"</span><span style='position:relative; right:-60%;'>"+year+"</span>";


}

function setDates(){
  //setting the current date in a variable
  var date= new Date();
  var list_of_events= mark_all_events();
  var index_of_list_of_events=0;
  //declaring date array of first and last day of month
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toString().split(" ");
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toString().split(" ");
  // console.log(firstDay);

  var temp_date = 1; // variable to set the dates
  var firstDay_day = 0; //variable to set the day of 1st

  var current_day = date.getDate();


  setHeader_in_calendar_view(firstDay[1], firstDay[3]);
  //checking and storing the first day of the current month
  if (firstDay[0].localeCompare("Mon") == 0)
      firstDay_day = 1;
  else if (firstDay[0].localeCompare("Tue") == 0)
      firstDay_day = 2;
  else if (firstDay[0].localeCompare("Wed") == 0)
      firstDay_day = 3;
  else if (firstDay[0].localeCompare("Thu") == 0)
      firstDay_day = 4;
  else if (firstDay[0].localeCompare("Fri") == 0)
      firstDay_day = 5;
  else if (firstDay[0].localeCompare("Sat") == 0)
      firstDay_day = 6;
  else if (firstDay[0].localeCompare("Sun") == 0)
      firstDay_day = 7;

  //total divs present to represent month
  var rows = 6,
      cols = 7;

  //putting the day in each div grid
  for (var i = 1; i <= rows; i++) {
      for (var j = 1; j <= cols; j++) {
          if (temp_date > parseInt(lastDay[2]))
              break;
          var current_Feild = "r_" + i + "c_" + j;
          if (firstDay_day > 0) {
              if (firstDay_day == j) {
                  document.getElementById(current_Feild).innerHTML = "" + temp_date++;
                  if(j==6 || j==7){
                    document.getElementById(current_Feild).style.backgroundColor= "green";
                    document.getElementById(current_Feild).style.borderRadius= "15px";
                    document.getElementById(current_Feild).style.padding= "10px";
                    // document.getElementById(current_Feild).style.opacity= "50%";

                  }
                  do{
                    if( index_of_list_of_events<list_of_events.length &&  list_of_events[index_of_list_of_events]==temp_date-1){
                      document.getElementById(current_Feild).style.backgroundColor= "pink";
                      document.getElementById(current_Feild).style.borderRadius= "15px";
                      document.getElementById(current_Feild).style.padding= "10px";
                      index_of_list_of_events+=1;
                    }
                  }while(index_of_list_of_events<list_of_events.length && list_of_events[index_of_list_of_events]==temp_date-1);
                  firstDay_day = -1;
              }

          } else {
              document.getElementById(current_Feild).innerHTML = "" + temp_date++;
              if(j==6 || j==7){
                document.getElementById(current_Feild).style.backgroundColor= "green";
                document.getElementById(current_Feild).style.borderRadius= "15px";
                document.getElementById(current_Feild).style.padding= "10px";

              }
              do{
                if( index_of_list_of_events<list_of_events.length &&  list_of_events[index_of_list_of_events]==temp_date-1){
                  document.getElementById(current_Feild).style.backgroundColor= "pink";
                  document.getElementById(current_Feild).style.borderRadius= "15px";
                  document.getElementById(current_Feild).style.padding= "10px";
                  index_of_list_of_events+=1;
                }
              }while(index_of_list_of_events<list_of_events.length && list_of_events[index_of_list_of_events]==temp_date-1);

          }

          //hilight the current day
          if (current_day == temp_date - 1) {
              // document.getElementById(current_Feild).style.backgroundColor = "pink";
              document.getElementById(current_Feild).style.backgroundColor= "blue";
              document.getElementById(current_Feild).style.borderRadius= "15px";
              document.getElementById(current_Feild).style.padding= "10px";
          }
      }

      if (temp_date > parseInt(lastDay[2]))
          break;
  }
}

function json_events_data(event_date){



    var all_Events_today="";
    for(var i=0; i<json_events.length; i++){
      var temp = json_events[i].Date.split("/");
      // console.log(event_date+","+temp[1]);
      if(event_date ==  parseInt(temp[1])){
        all_Events_today += "<p>"+json_events[i].Date+"</p> <p>"+json_events[i].time+"</p> <p>"+json_events[i].eventName+"</p> <br>";
      }
    }
    console.log(all_Events_today);
    if(all_Events_today.length<5){
      document.getElementById("events-view").innerHTML="<h1>Events on "+event_date+":</h1> <br> "+"No Events";

    }
    else{
      document.getElementById("events-view").innerHTML="<h1>Events on "+event_date+":</h1> <br> "+all_Events_today;
    }
}



startUp();
create_week_days_grid();
setDates();
// json_events_data();
