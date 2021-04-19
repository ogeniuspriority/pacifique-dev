const parent_id = 922;
google.charts.load('current', {
  packages: ['corechart', 'bar'],
});
google.charts.setOnLoadCallback();

document.addEventListener('DOMContentLoaded', () => {
  getChildren(parent_id);
});
const getChildren = (parentId) => {
  $.ajax({
    url: '../classes/getChilds.php',
    method: 'post',
    data: { parentId },
    dataType: 'JSON',
    success: (response) => {
      document.querySelector('.students').innerHTML = '';
      response.forEach((child) => {
        document.querySelector('.students').innerHTML += `
        <div class='student_conteiner border border-dark rounded mx-1 my-2'>
          <div class='student'>
            <input type='hidden' class='user_id' value=${child.id} />
            <p>Names: ${child.name}</p>
            <p>School: ${child.school}</p>
            <p>Level: Senior ${child.level}</p>
          </div>
          <div class='text-center mb-1'>
              <button class='btn'>Unlink Child</button>
          </div>
        </div>`;
      });
      students = document.querySelectorAll('.student');
      if (students.length > 0) {
        studentStatsData = {
          id: students[0].firstChild.nextElementSibling.value,
          page: 1,
          date: 1,
          activity: 1,
        };
        document.querySelector(
          '.students'
        ).firstElementChild.firstElementChild.style.background = '#f2f6fc';
        document.getElementById('no_content')
          ? (document.getElementById('no_content').innerHTML = '')
          : null;
      } else {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('content').innerHTML =
          "<div id='no_content' class='content_container rounded p-2 m-1'>You have got no child linked!!! Click on My children on the top of the page to link with your children</div>";
      }
      const unlinkBtns = document
        .querySelector('.students')
        .querySelectorAll('.btn');
      unlinkBtns.forEach((unlinkBtn, index) => {
        unlinkBtn.addEventListener('click', () => {
          unlinkChild(
            students[index].firstChild.nextElementSibling.value,
            parent_id
          );
        });
      });
      loadStudents();
      getStudentStatistics(studentStatsData);
      loadChart(studentStatsData);
    },
  });
};
let students;
const btns = document.querySelectorAll('.statsBtn');
const dateBtns = document.querySelectorAll('.date_btns');
const datePicker = document.getElementById('picker');
const spinner = document.getElementById('spinner');
let studentStatsData = {
  id: null,
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
    document.getElementById('dropdownMenuButton').classList.remove('focus');
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
const loadStudents = () => {
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
};
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
      generatePages(total, data.page);
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
      parent_id: parent_id,
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
        document.getElementById('refId').value = '';
        getChildren(parent_id);
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
          document.getElementById('scheduked_classes').innerHTML += `
          <div class="content_container rounded p-2 m-1">
            <div class="d-flex justify-content-between"><p class="mb-0">Topic: </p><p class="mb-0">${res.title}</p></div>
            <div class="d-flex justify-content-between"><p class="mb-0">Subject: </p><p class="mb-0">${res.subject}</p></div>
            <div class="d-flex justify-content-between"><p class="mb-0">Level: </p><p class="mb-0">${res.level}</p></div>
            <div class="d-flex justify-content-between"><p class="mb-0">Unit: </p><p class="mb-0">${res.unit}</p></div>
            <div class="d-flex justify-content-between"><p class="mb-0">Classe starting time: </p><p class="mb-0">${res.date}</p></div>
          </div>`;
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
                              <p class="mb-1">Name: ${res.name}</p>
                              <p class="mb-1">School: ${res.school}</p>
                              ${
                                res.subject != ''
                                  ? `<p class="mb-1">Subject: ${res.subject}</p>`
                                  : ''
                              }
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
      parent_id: parent_id,
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
const unlinkChild = (id, parentId) => {
  $.ajax({
    url: '../classes/unlinkChild.php',
    method: 'post',
    data: {
      id: id,
      parent_id: parentId,
    },
    dataType: 'JSON',
    success: (response) => {
      getChildren(parent_id);
    },
  });
};
document.querySelectorAll('.dropdown-item').forEach((btn) =>
  btn.addEventListener('click', () => {
    document.getElementById('dropdownMenuButton').innerText = btn.innerText;
    document.getElementById('dropdownMenuButton').classList.add('focus');
  })
);
const generatePages = (total, page) => {
  if (total > 2) {
    const pages = Math.ceil(total / 2);
    if (pages <= 5) {
      let pageBtns = '';
      for (let i = 1; i <= pages; i++) {
        if (i === page) {
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
    } else {
      let pageBtns = '';
      for (let i = 1; i < 4; i++) {
        if (i === page) {
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
                <li class="page-item">
                    <button class="page-link" aria-label="Next">
                        <span aria-hidden="true">...</span>
                    </button>
                </li>
                <li class="page-item" onclick="prevNextHandler('next')">
                    <button class="page-link" aria-label="Next">
                        <span aria-hidden="true">${pages}</span>
                    </button>
                </li>
                <li class="page-item" onclick="prevNextHandler('next')">
                    <button class="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>`;
    }
  }
};
