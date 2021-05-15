document.getElementById('ex').addEventListener('click', () => {
  $('#unit_ex').select2({
    placeholder: 'SELECT',
    multiple: true,
  });
  $('#unit_ex').on('select2:select', function (e) {
    const selected = $('#unit_ex').select2('data');
    dataExercises.units = [];
    selected.forEach((option) => {
      dataExercises.units.push(option.text);
    });
  });
  $('#unit_ex').on('select2:unselect', function (e) {
    const selected = $('#unit_ex').select2('data');
    dataExercises.units = [];
    selected.forEach((option) => {
      dataExercises.units.push(option.text);
    });
  });
});
$.ajax({
  url: '../classes/teacherAddReview/exercise/getSubjectsEx.php',
  method: 'post',
  data: {},
  dataType: 'JSON',
  success: (response) => {
    const subjectElementExercises = document.getElementById('subject_ex');
    subjectElementExercises.innerHTML = '<option selected>SELECT</option>';
    response.forEach((res) => {
      const option = `<option value="${res}">${res}</option>`;
      subjectElementExercises.innerHTML += option;
    });
  },
});
const dataExercises = {
  subject: '',
  level: '1',
  units: [],
  infoPage: 1,
};
const getExercisesUnits = () => {
  document.getElementById('spinner').style.display = 'block';
  $.ajax({
    url: '../classes/teacherAddReview/exercise/getUnitsEx.php',
    method: 'post',
    data: dataExercises,
    dataType: 'JSON',
    success: (response) => {
      document.getElementById('spinner').style.display = 'none';
      const unitsElement = document.getElementById('unit_ex');
      unitsElement.innerHTML = '';
      response.forEach((res) => {
        const option = `<option value="${res}">${res}</option>`;
        unitsElement.innerHTML += option;
      });
    },
  });
};
document.getElementById('subject_ex').addEventListener('change', () => {
  dataExercises.subject = document.getElementById('subject_ex').value;
  getExercisesUnits();
});
document.getElementById('level_ex').addEventListener('change', () => {
  dataExercises.level = document.getElementById('level_ex').value;
  getExercisesUnits();
});
document.getElementById('unit_ex').addEventListener('change', () => {
  dataExercises.unit = document.getElementById('unit_ex').value;
});
let contentIdEx = null,
  totalPaginationPagesExercises = 0;
const filterExercises = (dataEx) => {
  if (document.querySelector('.pagination')) {
    document
      .getElementById('pagination_ex')
      .removeChild(document.querySelector('.pagination'));
  }
  contentIdEx = null;
  totalPaginationPagesExercises = 0;
  const wrapperElement = document.getElementById('wrapper_exercises');
  wrapperElement.innerHTML = `
  <div class="d-flex justify-content-center">
    <div id="spinner" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`;
  $.ajax({
    url: '../classes/teacherAddReview/exercise/getExercisesInfo.php',
    method: 'post',
    data: dataEx,
    dataType: 'JSON',
    success: (response) => {
      wrapperElement.innerHTML = '';
      if (response.length !== 0) {
        totalPaginationPagesExercises = response[0].totalPages;
        response.forEach((res) => {
          const ele = `
        <div class="card mb-1 sidebar-card-color">
          <div class="card-body p-2">
              <div class="d-flex justify-content-between mb-1">
                  <span class="fw-bold">Topic:</span>
                  <span class="text-end"> ${res.subject} Level ${res.level} ${
            res.units.split(':')[0]
          }</span>
              </div>
              <div class="d-flex justify-content-between mb-1">
                  <span class="fw-bold">Summary:</span>
                  <span class="text-end"> ${res.summary.substring(0, 40)}${
            res.summary.length > 40 ? '...' : ''
          }</span>
              </div>
              <div class="text-center">
                <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="dispalyContentExercises(${
                  res.id
                })">Add Feedback</button>
              <div>
          </div>
        </div>`;
          wrapperElement.innerHTML += ele;
        });
        generatePagesExercises(
          totalPaginationPagesExercises,
          dataExercises.infoPage
        );
      } else {
        wrapperElement.innerHTML = `
        <div class="card sidebar-card-color">
          <div class="card-body">
              No content / End of content!!!
          </div>
        </div>`;
      }
    },
  });
};
document.getElementById('filter_exercises').addEventListener('click', () => {
  dataExercises.infoPage = 1;
});
document
  .getElementById('filter_exercises')
  .addEventListener('click', () => filterExercises(dataExercises));
const dispalyContentExercises = (id) => {
  contentIdEx = id;
  $.ajax({
    url: '../classes/teacherAddReview/exercise/getContentExercises.php',
    method: 'post',
    data: { id: id },
    dataType: 'JSON',
    success: (response) => {
      const questionData = document.getElementById('question');
      questionData.innerHTML = response.questionData;
      const explanationData = document.getElementById('explanation');
      explanationData.innerHTML = response.explanations;
      const optionData = document.getElementById('options');
      optionData.innerHTML = '';
      response.answers.forEach((answer, index) => {
        const ele = `
        <div class="card-body d-flex justify-content-between answer-options">
          <div class="form-check">
            <input class="form-check-input" type="radio" id="option${index}" value="${
          answer.isAnswer
        }" ${answer.isAnswer == 1 ? 'checked' : 'disabled'}>
            <label class="form-check-label" for="option${index}">${
          answer.answerData
        }</label>
          </div>
          <div class="">
            <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#questionModal" onclick='optionAddReview(${JSON.stringify(
              answer
            )})'>Add your review</button>
          </div>
        </div>`;
        optionData.innerHTML += ele;
      });
      window.scrollTo(0, document.body.scrollHeight);
    },
  });
};
let contentLinkId = 0;
document.getElementById('question_add_review').addEventListener('click', () => {
  contentLinkId = 0;
  document.getElementById('all_comments_ex').innerHTML = '';
  document.getElementById('message_ex').innerHTML = '';
  document.getElementById('ex_type').innerHTML = 'Question';
  document.getElementById('add_review__el').innerHTML = document.getElementById(
    'question'
  ).innerHTML;
});
document
  .getElementById('explanation_add_review')
  .addEventListener('click', () => {
    contentLinkId = -1;
    document.getElementById('all_comments_ex').innerHTML = '';
    document.getElementById('message_ex').innerHTML = '';
    document.getElementById('ex_type').innerHTML = 'Explanation';
    document.getElementById(
      'add_review__el'
    ).innerHTML = document.getElementById('explanation').innerHTML;
  });
const optionAddReview = (answer) => {
  contentLinkId = answer.id;
  document.getElementById('all_comments_ex').innerHTML = '';
  document.getElementById('message_ex').innerHTML = '';
  document.getElementById('ex_type').innerHTML = `<p>Answer</p><p class="text-${
    answer.isAnswer == 1 ? 'success' : 'danger'
  }">${answer.isAnswer == 1 ? 'Correct' : 'Incorrect'}</p>`;
  document.getElementById('add_review__el').innerHTML = answer.answerData;
};
const all_comments_element_ex = document.getElementById('all_comments_ex');
document.getElementById('add_comment_ex').addEventListener('click', () => {
  document.getElementById('message_ex').innerHTML = '';
  const comment_ex = CKEDITOR.instances.comment_ex.getData();
  all_comments_ex.innerHTML += comment_ex;
  CKEDITOR.instances.comment_ex.setData('');
});
document.getElementById('send_comment_ex').addEventListener('click', () => {
  let all_comments_ex = document.getElementById('all_comments_ex').innerHTML;
  $.ajax({
    url: '../classes/teacherAddReview/createComment.php',
    method: 'post',
    data: {
      comment: all_comments_ex,
      contentId: contentIdEx,
      creatorId: 922,
      commentType: 'exercises',
      contentLink: contentLinkId,
    },
    dataType: 'JSON',
    success: (response) => {
      document.getElementById('all_comments_ex').innerHTML = '';
      all_comments = '';
      if (response.error) {
        document.getElementById(
          'message_ex'
        ).innerHTML = `<p class="text-danger">${response.error}</p>`;
      } else {
        document.getElementById(
          'message_ex'
        ).innerHTML = `<p class="text-success">${response.message}</p>`;
      }
    },
  });
});
const generatePagesExercises = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    if (pages <= 5) {
      let pageBtns = '';
      for (let i = 1; i <= pages; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerExercises(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerExercises(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_ex'
      ).innerHTML = `<ul class="pagination justify-content-center">
                <li class="page-item" onclick="prevNextHandlerExercises('prev')">
                    <button class="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                ${pageBtns}
                <li class="page-item" onclick="prevNextHandlerExercises('next')">
                    <button class="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>`;
    } else {
      let pageBtns = '';
      for (let i = 1; i < 4; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerExercises(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerExercises(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_ex'
      ).innerHTML = `<ul class="pagination justify-content-center">
                <li class="page-item" onclick="prevNextHandlerExercises('prev')">
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
                <li class="page-item" onclick="prevNextHandlerExercises('next')">
                    <button class="page-link" aria-label="Next">
                        <span aria-hidden="true">${pages}</span>
                    </button>
                </li>
                <li class="page-item" onclick="prevNextHandlerExercises('next')">
                    <button class="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>`;
    }
  }
};
const changePageHandlerExercises = (page) => {
  dataExercises.infoPage = page;
  filterExercises(dataExercises);
};
const prevNextHandlerExercises = (action) => {
  if (
    action === 'next' &&
    dataExercises.infoPage < Math.ceil(totalPaginationPagesExercises / 5)
  ) {
    dataExercises.infoPage = dataExercises.infoPage + 1;
    filterExercises(dataExercises);
  }
  if (action === 'prev' && dataExercises.infoPage > 1) {
    dataExercises.infoPage = dataExercises.infoPage - 1;
    filterExercises(dataExercises);
  }
};
