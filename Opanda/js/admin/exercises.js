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
  url: '../classes/admin/exercise/getSubjectsEx.php',
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
    url: '../classes/admin/exercise/getUnitsEx.php',
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
  if (document.querySelector('.pagination1')) {
    document
      .getElementById('pagination_ex')
      .removeChild(document.querySelector('.pagination1'));
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
    url: '../classes/admin/exercise/getExercisesInfo.php',
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
                  })">See Feedback</button>
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
document
  .getElementById('filter_exercises')
  .addEventListener('click', () => filterExercises(dataExercises));
const dispalyContentExercises = (id) => {
  contentIdEx = id;
  $.ajax({
    url: '../classes/admin/exercise/getContentExercises.php',
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
              )})'>See your review</button>
            </div>
          </div>`;
        optionData.innerHTML += ele;
      });
      window.scrollTo(0, document.body.scrollHeight);
    },
  });
};
let paginationPageExercises = 1,
  totalPaginationPagesCommentsExercises = 0,
  contentLinkExercises = 0;
document.getElementById('question_see_review').addEventListener('click', () => {
  contentLinkExercises = 0;
  paginationPageExercises = 1;
  document.getElementById('all_comments_ex').innerHTML = '';
  document.getElementById('message_ex').innerHTML = '';
  document.getElementById('ex_type').innerHTML = 'Question';
  document.getElementById('see_review__el').innerHTML =
    document.getElementById('question').innerHTML;
  getCommentsExercises();
});
document
  .getElementById('explanation_see_review')
  .addEventListener('click', () => {
    contentLinkExercises = -1;
    paginationPageExercises = 1;
    document.getElementById('all_comments_ex').innerHTML = '';
    document.getElementById('message_ex').innerHTML = '';
    document.getElementById('ex_type').innerHTML = 'Explanation';
    document.getElementById('see_review__el').innerHTML =
      document.getElementById('explanation').innerHTML;
    getCommentsExercises();
  });
const optionAddReview = (answer) => {
  contentLinkExercises = answer.id;
  paginationPageExercises = 1;
  document.getElementById('all_comments_ex').innerHTML = '';
  document.getElementById('message_ex').innerHTML = '';
  document.getElementById('ex_type').innerHTML = `<p>Answer</p><p class="text-${
    answer.isAnswer == 1 ? 'success' : 'danger'
  }">${answer.isAnswer == 1 ? 'Correct' : 'Incorrect'}</p>`;
  document.getElementById('see_review__el').innerHTML = answer.answerData;
  getCommentsExercises();
};
const getCommentsExercises = () => {
  if (document.querySelector('.pagination2')) {
    document
      .getElementById('pagination_comments_ex')
      .removeChild(document.querySelector('.pagination2'));
  }
  document.getElementById('pagination_comments_ex').innerHTML = '';
  document.getElementById('message_ex').innerHTML = '';
  $.ajax({
    url: '../classes/admin/exercise/getComments.php',
    method: 'post',
    data: {
      contentId: contentIdEx,
      link: contentLinkExercises,
      page: paginationPageExercises,
    },
    dataType: 'JSON',
    success: (response) => {
      document.getElementById('all_comments_ex').innerHTML = '';
      const commentsElement = document.getElementById('all_comments_ex');
      if (response[0]) {
        response.forEach((comment) => {
          const ele = `
              <div class="card mb-1 sidebar-card-color">
                <div class="card-body p-2">
                ${comment.commentBody}
                <p class="text-center mb-0">Comment by teacher ${
                  comment.username
                }</p>
                <p class="text-center mb-0">Status: ${comment.status}</p>
              <p class="text-center ${
                comment.status == 'approved' ? 'd-none' : ''
              } mb-0">
                <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReviewExercises(${
                  comment.commentId
                })">Approve Review</button>
              </p>
                </div>
              </div>`;
          commentsElement.innerHTML += ele;
        });
        totalPaginationPagesCommentsExercises = response[0].totalComments;
        generatePagesCommentsExercises(
          response[0].totalComments ?? 0,
          paginationPageExercises
        );
      } else {
        commentsElement.innerHTML = `
        <div class="card mb-1 sidebar-card-color">
          <div class="card-body p-2">
            No comments for this content!!!
          </div>
        </div>`;
      }
    },
  });
};
const approveReviewExercises = (id) => {
  document.getElementById('message_ex').innerHTML = '';
  $.ajax({
    url: '../classes/admin/courses/approveReview.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      getCommentsExercises();
      document.getElementById(
        'message_ex'
      ).innerHTML = `<p class="text-success">${response.message}</p>`;
    },
  });
};
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
      ).innerHTML = `<ul class="pagination pagination1 justify-content-center">
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
      ).innerHTML = `<ul class="pagination pagination1 justify-content-center">
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
const generatePagesCommentsExercises = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    if (pages <= 5) {
      let pageBtns = '';
      for (let i = 1; i <= pages; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerCommentsExercises(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerCommentsExercises(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_comments_ex'
      ).innerHTML = `<ul class="pagination pagination2 justify-content-center">
                  <li class="page-item" onclick="prevNextHandlerCommentsExercises('prev')">
                      <button class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                      </button>
                  </li>
                  ${pageBtns}
                  <li class="page-item" onclick="prevNextHandlerCommentsExercises('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </button>
                  </li>
              </ul>`;
    } else {
      let pageBtns = '';
      for (let i = 1; i < 4; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerCommentsExercises(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerCommentsExercises(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_comments_ex'
      ).innerHTML = `<ul class="pagination pagination2 justify-content-center">
                  <li class="page-item" onclick="prevNextHandlerCommentsExercises('prev')">
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
                  <li class="page-item" onclick="prevNextHandlerCommentsExercises('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">${pages}</span>
                      </button>
                  </li>
                  <li class="page-item" onclick="prevNextHandlerCommentsExercises('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </button>
                  </li>
              </ul>`;
    }
  }
};
const changePageHandlerCommentsExercises = (page) => {
  paginationPageExercises = page;
  getCommentsExercises();
};
const prevNextHandlerCommentsExercises = (action) => {
  if (
    action === 'next' &&
    paginationPageExercises <
      Math.ceil(totalPaginationPagesCommentsExercises / 5)
  ) {
    paginationPageExercises = paginationPageExercises + 1;
    getCommentsExercises();
  }
  if (action === 'prev' && paginationPageExercises > 1) {
    paginationPageExercises = paginationPageExercises - 1;
    getCommentsExercises();
  }
};