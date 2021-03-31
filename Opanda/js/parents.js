google.charts.load('current', {
  packages: ['corechart', 'line'],
});
google.charts.setOnLoadCallback();
document.querySelector('.students').firstElementChild.style.background =
  '#f2f6fc';
const students = document.querySelectorAll('.student');
const btns = document.querySelectorAll('.statsBtn');
const dateBtns = document.querySelectorAll('.date_btns');
const datePicker = document.getElementById('picker');
const spinner = document.getElementById('spinner');
const studentStatsData = {
  id: students[0].firstChild.nextElementSibling.value,
  page: 1,
  date: 1,
  activity: 1,
};
btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    spinner.style.display = 'block';
    if (document.querySelector('.pagination')) {
      document
        .getElementById('pagination')
        .removeChild(document.querySelector('.pagination'));
    }
    btns.forEach((btn) => {
      btn.classList.remove('focus');
    });
    btn.classList.add('focus');
    studentStatsData.activity = index + 1;
    studentStatsData.page = 1;
    getStudentStatistics(studentStatsData);
  });
});
dateBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    spinner.style.display = 'block';
    if (document.querySelector('.pagination')) {
      document
        .getElementById('pagination')
        .removeChild(document.querySelector('.pagination'));
    }
    dateBtns.forEach((btn) => {
      btn.classList.remove('focus');
    });
    btn.classList.add('focus');
    studentStatsData.date = index + 1;
    studentStatsData.page = 1;
    getStudentStatistics(studentStatsData);
    loadChart(studentStatsData);
  });
});
datePicker.addEventListener('change', () => {
  spinner.style.display = 'block';
  if (document.querySelector('.pagination')) {
    document
      .getElementById('pagination')
      .removeChild(document.querySelector('.pagination'));
  }
  studentStatsData.date = datePicker.value;
  studentStatsData.page = 1;
  getStudentStatistics(studentStatsData);
  loadChart(studentStatsData);
});
students.forEach((student) => {
  student.addEventListener('click', () => {
    spinner.style.display = 'block';
    if (document.querySelector('.pagination')) {
      document
        .getElementById('pagination')
        .removeChild(document.querySelector('.pagination'));
    }
    students.forEach((st) => (st.style.background = '#97a5b6'));
    student.style.background = '#f2f6fc';
    const student_id = student.firstElementChild.value;
    studentStatsData.id = student_id;
    studentStatsData.page = 1;
    getStudentStatistics(studentStatsData);
    loadChart(studentStatsData);
  });
});
const changePageHandler = (page) => {
  spinner.style.display = 'block';
  if (document.querySelector('.pagination')) {
    document
      .getElementById('pagination')
      .removeChild(document.querySelector('.pagination'));
  }
  studentStatsData.page = page;
  getStudentStatistics(studentStatsData);
};
const prevNextHandler = (action) => {
  spinner.style.display = 'block';
  if (document.querySelector('.pagination')) {
    document
      .getElementById('pagination')
      .removeChild(document.querySelector('.pagination'));
  }
  if (action === 'next') {
    studentStatsData.page = studentStatsData.page + 1;
  } else {
    studentStatsData.page = studentStatsData.page - 1;
  }
  getStudentStatistics(studentStatsData);
};
document.addEventListener('DOMContentLoaded', () => {
  getStudentStatistics(studentStatsData);
  loadChart(studentStatsData);
});
const getStudentStatistics = (data) => {
  $.ajax({
    url: '../helpers/studentStats.php',
    method: 'post',
    data: data,
    success: (response) => {
      spinner.style.display = 'none';
      document.getElementById('content').innerHTML = response.split('_&_&')[0];
      const total = response.split('_&_&')[1];
      document.querySelector('.total').innerHTML = `Total: ${total}`;
      if (total > 2) {
        const pages = Math.ceil(total / 2);
        let pageBtns = '';
        for (let i = 1; i <= pages; i++) {
          if (i === data.page) {
            pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandler(${i})">${i}</button></li>`;
          } else {
            pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandler(${i})">${i}</button></li>`;
          }
        }
        document.getElementById(
          'pagination'
        ).innerHTML = `<ul class="pagination justify-content-center">
                    <li class="page-item" onclick="prevNextHandler('prev')">
                        <button class="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    ${pageBtns}
                    <li class="page-item" onclick="prevNextHandler('next')">
                        <button class="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>`;
      }
    },
  });
};
const loadChart = (data) => {
  $.ajax({
    url: '../helpers/drawChart.php',
    method: 'post',
    data: data,
    dataType: 'JSON',
    success: (response) => {
      console.log(response);
      drawChart(response);
    },
  });
};
const drawChart = (chartData) => {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Date');
  data.addColumn('number', 'Minutes');
  $.each(chartData, function (i, chartData) {
    const time = chartData.time;
    const span = chartData.span;
    data.addRows([[time, parseFloat(span)]]);
  });
  console.log(data);
  const options = {
    chart: {
      title: "Child's sessions",
      subtitle: 'Based on time they spent on the pratform in minutes',
    },
  };
  const chart = new google.charts.Line(document.getElementById('chart_area'));
  chart.draw(data, options);
};
