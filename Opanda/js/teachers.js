$(document).ready(function () {
  $('.unit').select2({
    placeholder: 'SELECT',
    multiple: true,
  });
});
document.addEventListener('DOMContentLoaded', () => {
  getSubjects();
});
const getSubjects = () => {
  $.ajax({
    url: '../classes/teachers/subjects.php',
    method: 'post',
    data: {},
    success: (response) => {
      document.getElementById('subject').innerHTML = '<option>SELECT</option>';
      document.getElementById('subject').innerHTML += response;
    },
  });
};
const selectSubject = document.getElementById('subject');
const selectLevel = document.getElementById('level');
let data = {
  subject: '',
  level: 1,
  date: 1,
  activity: 2,
  teacherId: 951,
  units: [],
};
selectSubject.addEventListener('change', () => {
  document.getElementById('subject_error').innerText = '';
  data.subject = selectSubject.value;
  getUnits(data);
});
selectLevel.addEventListener('change', () => {
  data.level = selectLevel.value;
  getUnits(data);
});
const getUnits = (data) => {
  $.ajax({
    url: '../classes/teachers/units.php',
    method: 'post',
    data: data,
    success: (response) => {
      document.getElementById('unit').innerHTML = response;
    },
  });
};
const getUniqueViews = (data) => {
  $.ajax({
    url: '../classes/teachers/uniqueViews.php',
    method: 'post',
    data: data,
    success: (response) => {
      document.querySelector(
        '.unique_students_views'
      ).innerHTML = response.split(',')[0];
      document.querySelector(
        '.unique_teachers_views'
      ).innerHTML = response.split(',')[1];
    },
  });
};
const getAllViews = (data) => {
  $.ajax({
    url: '../classes/teachers/allViews.php',
    method: 'post',
    data: data,
    success: (response) => {
      document.querySelector('.all_students_views').innerHTML = response.split(
        ','
      )[0];
      document.querySelector('.all_teachers_views').innerHTML = response.split(
        ','
      )[1];
    },
  });
};
const activityRadioBtns = document.querySelectorAll('input[name="view"]');
activityRadioBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    data.activity = btn.value;
  });
});
const timeRadioBtns = document.querySelectorAll('input[name="time"]');
timeRadioBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    data.date = btn.value;
  });
});
document.querySelector('.filter').addEventListener('click', () => {
  document.getElementById('subject_error').innerText = '';
  document.querySelectorAll('.summary').forEach((summary) => {
    summary.querySelector('.subject').innerHTML = data.subject || 'Subject';
    summary.querySelector('.level').innerHTML = `Level ${data.level}`;
    summary.querySelector('.units').innerHTML = '';
    data.units.forEach((unit) => {
      summary.querySelector('.units').innerHTML += unit + '<br>';
    });
  });
  if (data.subject === '') {
    document.getElementById('subject_error').innerText =
      'Select a subject first';
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  } else {
    window.scrollBy(0, 400);
    document.querySelector('.unique_students_views').innerHTML =
      '<div id="spinner" class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    document.querySelector('.unique_teachers_views').innerHTML =
      '<div id="spinner" class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    document.querySelector('.all_students_views').innerHTML =
      '<div id="spinner" class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    document.querySelector('.all_teachers_views').innerHTML =
      '<div id="spinner" class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    getUniqueViews(data);
    getAllViews(data);
  }
});
$(document).ready(function () {
  $('.unit').on('select2:select', function (e) {
    const selected = $('.unit').select2('data');
    data.units = [];
    selected.forEach((option) => {
      data.units.push(option.text);
    });
  });
  $('.unit').on('select2:unselect', function (e) {
    const selected = $('.unit').select2('data');
    data.units = [];
    selected.forEach((option) => {
      data.units.push(option.text);
    });
  });
});
