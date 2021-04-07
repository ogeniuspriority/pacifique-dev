google.charts.load('current', {
  packages: ['corechart', 'bar'],
});
google.charts.setOnLoadCallback();

const students = document.querySelectorAll('.student');
if (students.length > 0) {
  document.querySelector('.students').firstElementChild.style.background =
    '#f2f6fc';
  document.getElementById('no_content')
    ? (document.getElementById('no_content').innerHTML = '')
    : null;
} else {
  document.getElementById('spinner').style.display = 'none';
  document.getElementById('content').innerHTML =
    "<div id='no_content' class='content_container rounded p-2 m-1'>You have got no child linked!!! Click on My children on the top of the page to link with your children</div>";
}
const btns = document.querySelectorAll('.statsBtn');
const dateBtns = document.querySelectorAll('.date_btns');
const datePicker = document.getElementById('picker');
const spinner = document.getElementById('spinner');
const studentStatsData = {
  id: students[0] ? students[0].firstChild.nextElementSibling.value : null,
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
    loadChart(studentStatsData);
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
    url: '../classes/studentStats.php',
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
  document.getElementById('chart_area').innerText = '';
  $.ajax({
    url: '../classes/drawChart.php',
    method: 'post',
    data: data,
    dataType: 'JSON',
    success: (response) => {
      if (response.length > 0) {
        drawChart(response);
      }
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
  const options = {
    chart: {
      title: "Child's sessions",
      subtitle: 'Based on time they spent on the pratform in minutes',
    },
  };
  const chart = new google.charts.Bar(document.getElementById('chart_area'));
  chart.draw(data, options);
};
document.getElementById('linkBtn').addEventListener('click', () => {
  $.ajax({
    url: '../classes/linkChildParent.php',
    method: 'post',
    data: {
      child_referal_id: document.getElementById('refId').value,
      parent_id: 922,
    },
    dataType: 'JSON',
    success: (response) => {
      if (response[0].error) {
        document
          .getElementById('link_message')
          .classList.remove('text-success');
        document.getElementById('link_message').classList.add('text-danger');
        document.getElementById('link_message').innerText = response[0].error;
      }
      if (response[0].message) {
        document.getElementById('link_message').classList.remove('text-danger');
        document.getElementById('link_message').classList.add('text-success');
        document.getElementById('link_message').innerText = response[0].message;
        window.location.reload();
      }
    },
  });
});
document
  .getElementById('view_scheduled_classes')
  .addEventListener('click', () => {
    $.ajax({
      url: '../classes/scheduledClasses.php',
      method: 'post',
      data: {
        id: studentStatsData.id,
      },
      dataType: 'JSON',
      success: (response) => {
        document.getElementById('scheduked_classes').innerHTML = '';
        response.forEach((res) => {
          document.getElementById(
            'scheduked_classes'
          ).innerHTML += `<div class="content_container rounded p-2 m-1"><div class="d-flex justify-content-around"><p>Topic: </p><p>${res.title}</p></div><div class="d-flex justify-content-around"><p>Classe starting time: </p><p>${res.date}</p></div></div>`;
        });
      },
    });
  });
const getTeachersHelpData = { id: studentStatsData.id, page: 1 };
const getTeacherHelp = (data) => {
  $.ajax({
    url: '../classes/teachersByLevel.php',
    method: 'post',
    data: data,
    dataType: 'JSON',
    success: (response) => {
      document.getElementById('list_of_teachers').innerHTML = '';
      response.teachers.forEach((res, index) => {
        document.getElementById(
          'list_of_teachers'
        ).innerHTML += `<div class="teacher_${index} content_container rounded p-2 m-1">
                          <input type="hidden" value="${res.email}">
                          <div class="d-flex justify-content-between">
                            <div>
                              <p>Name: ${res.name}</p>
                              <p>School: ${res.school}</p>
                              <p>Subject: ${res.subject}</p>
                            </div>
                            <div class="d-flex align-items-center">
                              <button class="btn btn-primary" onclick="sendMail(${index}, 'pacifique@ogeniuspriority.com')">Ask help</button>
                            </div>
                          </div>
                          <p class="mail_message text-center m-2 text-success"></p>
                        </div>`;
      });
      if (response.number > 4) {
        const pages = Math.ceil(response.number / 4);
        let pageBtns = '';
        for (let i = 1; i <= pages; i++) {
          if (i === data.page) {
            pageBtns += `<li class="page-item active"><button class="page-link" onclick="modalChangePageHandler(${i})">${i}</button></li>`;
          } else {
            pageBtns += `<li class="page-item"><button class="page-link" onclick="modalChangePageHandler(${i})">${i}</button></li>`;
          }
        }
        document.getElementById(
          'modal_pagination'
        ).innerHTML = `<ul class="pagination justify-content-center">
                    <li class="page-item" onclick="modalPrevNextHandler('prev')">
                        <button class="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    ${pageBtns}
                    <li class="page-item" onclick="modalPrevNextHandler('next')">
                        <button class="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>`;
      }
    },
  });
};
document
  .getElementById('ask_teachers_help')
  .addEventListener('click', () => getTeacherHelp(getTeachersHelpData));
const modalChangePageHandler = (page) => {
  getTeachersHelpData.page = page;
  getTeacherHelp(getTeachersHelpData);
};
const modalPrevNextHandler = (action) => {
  if (action === 'next') {
    getTeachersHelpData.page = getTeachersHelpData.page + 1;
  } else {
    getTeachersHelpData.page = getTeachersHelpData.page - 1;
  }
  getTeacherHelp(getTeachersHelpData);
};
const sendMail = (index, email) => {
  $.ajax({
    url: '../classes/sendMail.php',
    method: 'post',
    data: {
      parent_id: 922,
      teachers_email: email,
    },
    dataType: 'JSON',
    success: (response) => {
      document
        .querySelector(`.teacher_${index}`)
        .querySelector(
          '.mail_message'
        ).innerHTML = `<span>${response.message}</span>`;
    },
  });
};
