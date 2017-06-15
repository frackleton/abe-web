function customCalendar() {
  this.masterLabels = [];
  this.activeLabels = [];
  this.rendering = function(event, element) {
    if ($.inArray(event.visibility,mycalendar.masterLabels) < 0){
      mycalendar.masterLabels.push(event.visibility)};
    if(event.visibility === "olin"){
      element.css('background-color', 'blue');
      element.css('border-color', 'blue');
    }
    else if(event.visibility === "students"){
      element.css('background-color','red');
      //event.rendering = "background"
    // console.log(mycalendar.masterLabels.toString());
    };
  };
  this.calendar = {
       // put your options and callbacks here
       weekends: true,
       // events: '/myfeed.php',
       //fake events to play with:
       events: [
          {
              title  : 'event1',
              start  : '2017-06-13',
              //rendering : "background",
              description : "blue",
              visibility : "students",
          },
          {
              title  : 'event2',
              start  : '2017-06-05',
              end    : '2017-06-07',
              description : "blue",
              visibility: "olin",
          },
          {
              title  : 'event3',
              start  : '2017-06-09T12:30:00',
              allDay : false, // will make the time show
              description : "blue",
              visibility: "public",
          }
        ],

       header: {
         left: 'title',
         center:'',
         right:'today prev,next'
       },
       eventRender: this.rendering,
   };

  this.initCalendar = function(){
    $('#calendar').fullCalendar(this.calendar)
  };
  this.makeDropdown = function(){
    $('.fc-toolbar .fc-left').append(
      $('<div>').attr('id','labels-dropdown'));
      $('#labels-dropdown').addClass('btn-group');
      $('#labels-dropdown').append(
        $('<button>').addClass('fc-button fc-state-default fc-corner-left fc-corner-right dropdown-toggle'));
      $('.dropdown-toggle').attr('type','button').attr('data-toggle','dropdown').attr('aria-haspopup', 'true').attr('aria-expanded','false');
      $('.dropdown-toggle').text('Action');
      $('.dropdown-toggle').append(
        $('<span>').addClass('caret')
      );
      $('#labels-dropdown').append(
        $('<ul>').attr('id','labels-dropdown-inner'));
      $('#labels-dropdown-inner').addClass('dropdown-menu');
  };
  this.filter = function (event){
    if (mycalendar.activeLabels.indexOf(event.visibility) < 0){
      console.log('removed');
      console.log(event.visibility);
      return true

    }
  };
  this.refreshFilters = function(toggledFilters){
    console.log('bleep')
    for (var i=0; i< toggledFilters.length; i++){
      var index = this.activeLabels.indexOf(toggledFilters[i]);
      if(index > -1){
        this.activeLabels.splice(index,1)
      }
      else{
        this.activeLabels.push(toggledFilters[i])
      };
      $('#calendar').fullCalendar('refetchEvents');
      $('#calendar').fullCalendar('removeEvents', this.filter);
      console.log(this.activeLabels)
    };
  };
  this.populateDropdown = function(){
    for (var i=0; i < this.masterLabels.length; i++){
      $('#labels-dropdown-inner').append(
        $('<li>').append(
        $('<a>').attr('href','#').text(this.masterLabels[i])).on('click', function(){
        $(this).toggleClass('active');
        mycalendar.refreshFilters([$(this).text()])
      })
    );
    }
  };


    // $('#calendar').fullCalendar('refetchEvents')
    // //console.log(this.activeLabels)
    // //console.log(this.masterLabels)
    // $('.navbar-brand').text(this.activeLabels.toString())

}
var mycalendar;
var main=function() {
  //console.log(customCalendar.masterLabels)
  mycalendar = new customCalendar()
  mycalendar.initCalendar()
  // $('#calendar').fullCalendar('eventRender')
  mycalendar.makeDropdown()
  mycalendar.populateDropdown()
}



$(document).ready(main);
