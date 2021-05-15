$(document).ready(function () {
  $('#unit').select2({
    placeholder: 'SELECT',
    multiple: true,
  });
});
$.ajax({
  url: '../classes/admin/courses/getSubjects.php',
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
    url: '../classes/admin/courses/getUnits.php',
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
  totalPaginationPages = 0,
  totalPaginationPagesComments = 0;
const filterCourses = (data) => {
  if (document.querySelector('.pagination1')) {
    document
      .getElementById('pagination')
      .removeChild(document.querySelector('.pagination1'));
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
    url: '../classes/admin/courses/getContent.php',
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
                    <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="dispalyContent(${res.id})">See Feedback</button>
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
  totalPaginationPages = 0;
  data.infoPage = 1;
});
document
  .getElementById('filter')
  .addEventListener('click', () => filterCourses(data));
let current = { page: 0, id: 0, pageNumber: 0 },
  totalPages = 0,
  paginationPage = 1;
const dispalyContent = (id) => {
  window.scrollTo(0, document.body.scrollHeight);
  contentId = id;
  totalPages = 0;
  current.page = 0;
  current.pageNumber = 0;
  paginationPage = 1;
  $.ajax({
    url: '../classes/admin/courses/getContentById.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      const contentElement = document.getElementById('content');
      const addReviewContentElement =
        document.getElementById('add_review_content');
      const commentsElement = document.getElementById('all_comments');
      contentElement.innerHTML = '';
      addReviewContentElement.innerHTML = '';
      commentsElement.innerHTML = '';
      contentElement.innerHTML += response.summary.htmlContent;
      addReviewContentElement.innerHTML += response.summary.htmlContent;
      if (response.summary.comments[0]) {
        response.summary.comments.forEach((summary) => {
          const ele = `
          <div class="card mb-1 sidebar-card-color">
            <div class="card-body p-2">
            ${summary.commentBody}
            <p class="text-center mb-0">Comment by teacher ${
              summary.username
            }</p>
            <p class="text-center mb-0">Status: ${summary.status}</p>
            <p class="text-center ${
              summary.status == 'approved' ? 'd-none' : ''
            } mb-0">
              <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReview(${
                summary.commentId
              })">Approve Review</button>
            </p>
            </div>
          </div>`;
          commentsElement.innerHTML += ele;
        });
      } else {
        commentsElement.innerHTML = `
        <div class="card mb-1 sidebar-card-color">
          <div class="card-body p-2">
            No comments for this content!!!
          </div>
        </div>`;
      }
      const pagesElement = document.getElementById('pages');
      pagesElement.innerHTML = '<option>SELECT</option>';
      totalPages = response.pages.length;
      response.pages.forEach((page) => {
        const option = `<option value="${page.pageId}">Page ${page.pageNumber}</option>`;
        pagesElement.innerHTML += option;
      });
      document.getElementById('modalPageNumber').innerHTML = 'Summary';
    },
  });
};
const getPageContent = (id) => {
  $.ajax({
    url: '../classes/admin/courses/getCoursePages.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      const contentElement = document.getElementById('content');
      const addReviewContentElement =
        document.getElementById('add_review_content');
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
  document.getElementById('all_comments').innerHTML = '';
  paginationPage = 1;
  current.page = document
    .getElementById('pages')
    .options[document.getElementById('pages').selectedIndex].text.split(' ')[1];
  current.id = e.target.value;
  current.pageNumber = document.getElementById('pages').selectedIndex;
  getPageContent(e.target.value);
});
document.getElementById('previous').addEventListener('click', () => {
  if (current.pageNumber > 1) {
    document.getElementById('pages').selectedIndex--;
    var event = new Event('change');
    document.getElementById('pages').dispatchEvent(event);
  }
});
document.getElementById('next').addEventListener('click', () => {
  if (current.pageNumber < totalPages) {
    document.getElementById('pages').selectedIndex++;
    var event = new Event('change');
    document.getElementById('pages').dispatchEvent(event);
  }
});
const getCommentsPerPage = () => {
  if (document.querySelector('.pagination2')) {
    document
      .getElementById('pagination_comments')
      .removeChild(document.querySelector('.pagination2'));
  }
  document.getElementById('message').innerHTML = '';
  if (current.id != 0) {
    $.ajax({
      url: '../classes/admin/courses/getCommentsPerPage.php',
      method: 'post',
      data: {
        contentId: contentId,
        pageId: current.id,
        page: paginationPage,
      },
      dataType: 'JSON',
      success: (response) => {
        document.getElementById('all_comments').innerHTML = '';
        const commentsElement = document.getElementById('all_comments');
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
            <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReview(${
              comment.commentId
            })">Approve Review</button>
          </p>
            </div>
          </div>`;
            commentsElement.innerHTML += ele;
          });
          totalPaginationPagesComments = response[0].totalComments;
          generatePagesComments(response[0].totalComments ?? 0, paginationPage);
        } else {
          commentsElement.innerHTML = `
          <div class="card mb-1 sidebar-card-color">
            <div class="card-body p-2">
              No Comments!!!
            </div>
          </div>
          `;
        }
      },
    });
  }
};
document.getElementById('add_review').addEventListener('click', () => {
  paginationPage = 1;
  if (document.querySelector('.pagination2')) {
    document
      .getElementById('pagination_comments')
      .removeChild(document.querySelector('.pagination2'));
  }
  if (current.page != 0) {
    getCommentsPerPage();
  }
});
const approveReview = (id) => {
  document.getElementById('message').innerHTML = '';
  $.ajax({
    url: '../classes/admin/courses/approveReview.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      if (current.page == 0) {
        dispalyContent(contentId);
      } else {
        getCommentsPerPage();
      }
      document.getElementById(
        'message'
      ).innerHTML = `<p class="text-success">${response.message}</p>`;
    },
  });
};
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
      ).innerHTML = `<ul class="pagination pagination1 justify-content-center">
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
      ).innerHTML = `<ul class="pagination pagination1 justify-content-center">
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
const generatePagesComments = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    if (pages <= 5) {
      let pageBtns = '';
      for (let i = 1; i <= pages; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerComments(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerComments(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_comments'
      ).innerHTML = `<ul class="pagination pagination2 justify-content-center">
                  <li class="page-item" onclick="prevNextHandlerComments('prev')">
                      <button class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                      </button>
                  </li>
                  ${pageBtns}
                  <li class="page-item" onclick="prevNextHandlerComments('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </button>
                  </li>
              </ul>`;
    } else {
      let pageBtns = '';
      for (let i = 1; i < 4; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerComments(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerComments(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_comments'
      ).innerHTML = `<ul class="pagination pagination2 justify-content-center">
                  <li class="page-item" onclick="prevNextHandlerComments('prev')">
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
                  <li class="page-item" onclick="prevNextHandlerComments('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">${pages}</span>
                      </button>
                  </li>
                  <li class="page-item" onclick="prevNextHandlerComments('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </button>
                  </li>
              </ul>`;
    }
  }
};
const changePageHandlerComments = (page) => {
  paginationPage = page;
  getCommentsPerPage();
};
const prevNextHandlerComments = (action) => {
  if (
    action === 'next' &&
    paginationPage < Math.ceil(totalPaginationPagesComments / 5)
  ) {
    paginationPage = paginationPage + 1;
    getCommentsPerPage();
  }
  if (action === 'prev' && paginationPage > 1) {
    paginationPage = paginationPage - 1;
    getCommentsPerPage();
  }
};