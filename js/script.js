(function () {

  var TvSchedule = function () {

    this.init();

  };

  TvSchedule.prototype.init = function () {

    var program = document.querySelector('#channels')

    program.addEventListener('click', this.showPopup.bind(this));

    this.generatePrograms();
  };

  /*TvSchedule.prototype.checkFinishedPrograms = function () {

    var channels = document.getElementById('temp'),
        times = 0;//document.querySelectorAll('.channel__content__program__time');

    console.log(channels);


    var programTime = 0,
        date = 0,
        now = new Date().getTime();

    for(var i = 0; i < channels.length; i++) {
      times = channels[i].getElementsByClassName('channel__content__program__time');
      console.log(channels[i]);
      for(var j = 0; j < times.length; j++) {
        programTime = times[j].getAttribute('dateTime');
        date = new Date(programTime).getTime();

        if(date - now < 0) {
          times[j].parentElement.classList.add('hidden-program');
        }
        else {
          times[j].parentElement.classList.add('current-program');
          break;
        }
      }
    }

  };*/

  TvSchedule.prototype.isFinished = function (t) {
    return new Date() > Date.parse(t);
  };

  TvSchedule.prototype.generatePrograms = function () {
    var programTitles = ['Доброе утро', 'Новости', 'Контрольная закупка', 'Жить здорово', 'Время покажет', 'Новости с субтитрами', 'Мужское / Женское', 'Наедине со всеми', 'Давай поженимся!', 'Пусть говорят', 'Вечерний Ургант', 'Модный приговор'];

    var dateTime = '',
        amountOfPrograms = '',
        programsInfo = [],
        isFinished = false;

    var channels = document.querySelectorAll('.channel'),
        programElem = '',
        timeElem = '',
        titleElem = '',
        wrapper = '';

    for(var i = 0; i < channels.length; i++) {

      programsInfo = [];
      wrapper = document.createDocumentFragment(); //wrapper to reduce amount of DOM operations
      amountOfPrograms = Math.floor(Math.random() * 5 + 5);


      for(var j = 0; j < amountOfPrograms; j++) {
        programsInfo.push(getRandomDatetime());
      }

      programsInfo.sort(function (a, b) {
        if(a.hour == b.hour) {
          return a.minute > b.minute;
        }
        return a.hour > b.hour;
      });

      for(var j = 0; j < amountOfPrograms; j++) { //random amount of programs, from 5 to 15
        programsInfo.push(getRandomDatetime());
        dateTime = programsInfo[j];
        dateTime.hour = dateTime.hour < 10 ? '0' + dateTime.hour : dateTime.hour;
        dateTime.minute = dateTime.minute < 10 ? '0' + dateTime.minute : dateTime.minute;
        isFinished = this.isFinished(dateTime.year + '/' + dateTime.month + '/' + dateTime.day + ' ' + dateTime.hour + ':' + dateTime.minute + ' ' + dateTime.ampm);


        programElem = document.createElement('div');
        timeElem = document.createElement('time');
        titleElem = document.createElement('span');

        programElem.classList.add('channel__content__program');
        timeElem.classList.add('channel__content__program__time');
        titleElem.classList.add('channel__content__program__title');
        if(isFinished) {
          programElem.classList.add('hidden-program');
        }

        timeElem.setAttribute('datetime', dateTime.year + '/' + dateTime.month + '/' + dateTime.day + ' ' + dateTime.hour + ':' + dateTime.minute + ' ' + dateTime.ampm);
        timeElem.innerHTML = dateTime.hour + ':' + dateTime.minute;
        titleElem.innerHTML = programTitles[Math.floor(Math.random() * programTitles.length)];

        programElem.appendChild(timeElem);
        programElem.appendChild(titleElem);

        wrapper.appendChild(programElem);

      }
      channels[i].appendChild(wrapper);
    }

  };

  TvSchedule.prototype.showPopup = function (e) {
    if(e.target.classList.contains('channel__content__program__title')) {

      if(document.querySelector('.popup')) {
        var toRemove = document.querySelector('.popup');
        toRemove.parentElement.removeChild(document.querySelector('.popup'));
      }

      var wrapper = document.createElement('div'),
          header = document.createElement('div'),
          button = document.createElement('div'),
          body = document.createElement('div');

      header.classList.add('popup__header');
      header.innerHTML = e.target.innerHTML;

      body.classList.add('popup__body');
      body.innerHTML = 'Эта программа наверняка очень интересная и здесь могло бы быть ее описание :)';

      button.classList.add('popup__button-close');
      button.innerHTML = 'X';

      wrapper.classList.add('popup');

      wrapper.appendChild(header);
      wrapper.appendChild(button);
      wrapper.appendChild(body);

      e.target.appendChild(wrapper);
    }

    else if(e.target.classList.contains('popup__button-close')) {
      e.target.parentElement.parentElement.removeChild(document.querySelector('.popup'));
    }
  };

  function getRandomDatetime() {
    var date = '', //temp variable for getting daysToShow from current day
        daysToShow = 6,//how much day to show from current day e.g. 6 == -3, -2, -1, currentDay, 1, 2
        now = new Date(), //temp variable for getting amount of days in this month
        daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0), //amount of days in this month
        month = new Date().getMonth() + 1, //current month
        days = [], //days from current day
        tempHour = Math.floor(Math.random() * 24),
        tempMinute = Math.floor(Math.random() * 60);

    var dateTime = {};

    daysInMonth = daysInMonth.getDate();

    for(var i = daysToShow / 2 - daysToShow; i < daysToShow / 2; i++) {
      date = new Date();
      date.setDate(date.getDate() - (-i));

      days.push(date.getDate());
    }

    dateTime.year = new Date().getFullYear();
    dateTime.month = month;
    dateTime.day = days[Math.floor(Math.random() * days.length)];
    dateTime.hour = tempHour;
    dateTime.minute = tempMinute;
    dateTime.ampm = dateTime.hour > 12 ? 'PM' : 'AM';

    return dateTime;
  }

  window.tvshedule = new TvSchedule()
})();