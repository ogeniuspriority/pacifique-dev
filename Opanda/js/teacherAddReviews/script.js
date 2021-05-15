$(document).ready(function () {
  $('#unit').select2({
    placeholder: 'SELECT',
    multiple: true,
  });
});
$.ajax({
  url: '../classes/teacherAddReview/courses/getSubjects.php',
  method: 'post',
  data: {},
  dataType: 'JSON',
  success: (response) => {
    const subjectElement = document.getElementById('subject');
    subjectElement.innerHTML = '<option selected>SELECT</option>';
    response.forEach((res) => {
      const option = `<option value="${res}">${res}</option>`;
      subjectElement.innerHTML += option;
    });
  },
});
const data = {
  subject: '',
  level: '1',
  units: [],
  infoPage: 1,
};
const getUnits = () => {
  $.ajax({
    url: '../classes/teacherAddReview/courses/getUnits.php',
    method: 'post',
    data: data,
    dataType: 'JSON',
    success: (response) => {
      const unitsElement = document.getElementById('unit');
      unitsElement.innerHTML = '';
      response.forEach((res) => {
        const option = `<option value="${res}">${res}</option>`;
        unitsElement.innerHTML += option;
      });
    },
  });
};
document.getElementById('subject').addEventListener('change', () => {
  data.subject = document.getElementById('subject').value;
  getUnits();
});
document.getElementById('level').addEventListener('change', () => {
  data.level = document.getElementById('level').value;
  getUnits();
});
$(document).ready(function () {
  $('#unit').on('select2:select', function (e) {
    const selected = $('#unit').select2('data');
    data.units = [];
    selected.forEach((option) => {
      data.units.push(option.text);
    });
  });
  $('#unit').on('select2:unselect', function (e) {
    const selected = $('#unit').select2('data');
    data.units = [];
    selected.forEach((option) => {
      data.units.push(option.text);
    });
  });
});
let contentId = null,
  totalPaginationPages = 0;
const filterCourses = (data) => {
  if (document.querySelector('.pagination')) {
    document
      .getElementById('pagination')
      .removeChild(document.querySelector('.pagination'));
  }
  contentId = null;
  const wrapperElement = document.getElementById('wrapper');
  wrapperElement.innerHTML = `
  <div class="d-flex justify-content-center">
    <div id="spinner" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`;
  $.ajax({
    url: '../classes/teacherAddReview/courses/getContent.php',
    method: 'post',
    data: data,
    dataType: 'JSON',
    success: (response) => {
      wrapperElement.innerHTML = '';
      if (response.length !== 0) {
        totalPaginationPages = response[0].totalPages;
        response.forEach((res) => {
          const ele = `
          <div class="card mb-1 sidebar-card-color">
            <div class="card-body p-2">
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold">Name:</span>
                    <span class="text-end">${res.name}</span>
                </div>
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold">Subject:</span>
                    <span class="text-end">${res.subject}</span>
                </div>
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold">Units:</span>
                    <span class="text-end">${res.units}</span>
                </div>
                <div class="text-center">
                  <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="dispalyContent(${res.id})">Add Feedback</button>
                </div>
            </div>
          </div>`;
          wrapperElement.innerHTML += ele;
        });
        generatePages(totalPaginationPages, data.infoPage);
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
document.getElementById('filter').addEventListener('click', () => {
  data.infoPage = 1;
});
document
  .getElementById('filter')
  .addEventListener('click', () => filterCourses(data));
let current = { page: 0, id: 0 },
  totalPages = 0;
const dispalyContent = (id) => {
  window.scrollTo(0, document.body.scrollHeight);
  contentId = id;
  totalPages = 0;
  $.ajax({
    url: '../classes/teacherAddReview/courses/getContentById.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      const contentElement = document.getElementById('content');
      const addReviewContentElement = document.getElementById(
        'add_review_content'
      );
      contentElement.innerHTML = '';
      addReviewContentElement.innerHTML = '';
      contentElement.innerHTML += response.html_content;
      addReviewContentElement.innerHTML += response.html_content;
      const pagesElement = document.getElementById('pages');
      pagesElement.innerHTML = '<option>SELECT</option>';
      totalPages = response.pages.length;
      response.pages.forEach((page, index) => {
        const option = `<option value="${page}">Page ${index + 1}</option>`;
        pagesElement.innerHTML += option;
      });
      document.getElementById('modalPageNumber').innerHTML = 'Summary';
    },
  });
};
document.getElementById('add_review').addEventListener('click', () => {
  document.getElementById('all_comments').innerHTML = '';
  document.getElementById('message').innerHTML = '';
});
const getPageContent = (id) => {
  $.ajax({
    url: '../classes/teacherAddReview/courses/getCoursePages.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      const contentElement = document.getElementById('content');
      const addReviewContentElement = document.getElementById(
        'add_review_content'
      );
      contentElement.innerHTML = '';
      addReviewContentElement.innerHTML = '';
      contentElement.innerHTML += response;
      addReviewContentElement.innerHTML += response;
      if (current.page && current.page != undefined) {
        document.getElementById(
          'modalPageNumber'
        ).innerHTML = `Page ${current.page}`;
      } else {
        document.getElementById('modalPageNumber').innerHTML = '';
      }
    },
  });
};
document.getElementById('pages').addEventListener('change', (e) => {
  current.page = document
    .getElementById('pages')
    .options[document.getElementById('pages').selectedIndex].text.split(' ')[1];
  current.id = e.target.value;
  getPageContent(e.target.value);
});
document.getElementById('previous').addEventListener('click', () => {
  if (current.page > 1) {
    document.getElementById('pages').selectedIndex--;
    var event = new Event('change');
    document.getElementById('pages').dispatchEvent(event);
  }
});
document.getElementById('next').addEventListener('click', () => {
  if (current.page < totalPages) {
    document.getElementById('pages').selectedIndex++;
    var event = new Event('change');
    document.getElementById('pages').dispatchEvent(event);
  }
});
const all_comments_element = document.getElementById('all_comments');
let all_comments = '';
document.getElementById('add_comment').addEventListener('click', () => {
  const comment = CKEDITOR.instances.comment.getData();
  all_comments_element.innerHTML += comment;
  all_comments += comment;
  CKEDITOR.instances.comment.setData('');
});
document.getElementById('send_comment').addEventListener('click', () => {
  $.ajax({
    url: '../classes/teacherAddReview/createComment.php',
    method: 'post',
    data: {
      comment: all_comments,
      contentId: contentId,
      creatorId: 11,
      commentType: 'courses',
      contentLink: current.id,
    },
    dataType: 'JSON',
    success: (response) => {
      document.getElementById('all_comments').innerHTML = '';
      all_comments = '';
      if (response.error) {
        document.getElementById(
          'message'
        ).innerHTML = `<p class="text-danger">${response.error}</p>`;
      } else {
        document.getElementById(
          'message'
        ).innerHTML = `<p class="text-success">${response.message}</p>`;
      }
    },
  });
});
const generatePages = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
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
const changePageHandler = (page) => {
  data.infoPage = page;
  filterCourses(data);
};
const prevNextHandler = (action) => {
  if (
    action === 'next' &&
    data.infoPage < Math.ceil(totalPaginationPages / 5)
  ) {
    data.infoPage = data.infoPage + 1;
    filterCourses(data);
  }
  if (action === 'prev' && data.infoPage > 1) {
    data.infoPage = data.infoPage - 1;
    filterCourses(data);
  }
};
