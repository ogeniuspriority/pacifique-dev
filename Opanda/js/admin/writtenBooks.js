$.ajax({
  url: '../classes/admin/writtenBooks/getSubjectsBook.php',
  method: 'post',
  data: {},
  dataType: 'JSON',
  success: (response) => {
    const subjectElement = document.getElementById('subject_book');
    subjectElement.innerHTML = '<option selected>SELECT</option>';
    response.forEach((res) => {
      const option = `<option value="${res}">${res}</option>`;
      subjectElement.innerHTML += option;
    });
  },
});
const data_book = {
  subject: '',
  level: '1',
  page: 1,
};
document.getElementById('subject_book').addEventListener('change', () => {
  data_book.subject = document.getElementById('subject_book').value;
});
document.getElementById('level_book').addEventListener('change', () => {
  data_book.level = document.getElementById('level_book').value;
});
let contentIdBook = null;
document.getElementById('filter_book').addEventListener('click', () => {
  contentIdBook = null;
  const wrapperElement = document.getElementById('wrapper_book');
  wrapperElement.innerHTML = `
    <div class="d-flex justify-content-center">
      <div id="spinner" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>`;
  $.ajax({
    url: '../classes/admin/writtenBooks/getInfoBook.php',
    method: 'post',
    data: data_book,
    dataType: 'JSON',
    success: (response) => {
      wrapperElement.innerHTML = '';
      if (response.length !== 0) {
        response.forEach((res) => {
          const ele = `
          <div class="card mb-1 p-2 sidebar-card-color">
            <div class="card-body p-0">
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold">Name:</span>
                    <span class="text-end">${res.name}</span>
                </div>
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold">Subject:</span>
                    <span class="text-end">${res.subject}</span>
                </div>
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold">Level:</span>
                    <span class="text-end">${res.level}</span>
                </div>
                <div class="text-center">
                  <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="dispalyContentBook(${res.id})">Add Feedback</button>
                </div>
            </div>
          </div>`;
          wrapperElement.innerHTML += ele;
        });
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
});
let bookCurrent = { page: 0, id: 0 },
  bookTotalPages = 0,
  totalComments = 0,
  paginationPageBook = 1;
const dispalyContentBook = (id) => {
  contentIdBook = id;
  bookTotalPages = 0;
  bookCurrent.page = 0;
  bookCurrent.id = 0;
  $.ajax({
    url: '../classes/admin/writtenBooks/getContentBook.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      const contentElement = document.getElementById('content_book');
      const addReviewContentElement = document.getElementById(
        'add_review_content_book'
      );
      contentElement.innerHTML = '';
      addReviewContentElement.innerHTML = '';
      contentElement.innerHTML += response.summary.content;
      addReviewContentElement.innerHTML += response.summary.content;
      const commentsElement = document.getElementById('all_comments_book');
      commentsElement.innerHTML = '';
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
              <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReviewBook(${
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
      const pagesElement = document.getElementById('pages_book');
      pagesElement.innerHTML = '<option>SELECT</option>';
      bookTotalPages = response.pages.length;
      response.pages.forEach((page, index) => {
        const option = `<option value="${page}">Page ${index + 1}</option>`;
        pagesElement.innerHTML += option;
      });
      document.getElementById('modalPageNumberBook').innerHTML = 'Summary';
      window.scrollTo(0, document.body.scrollHeight);
    },
  });
};
document.getElementById('add_review_book').addEventListener('click', () => {
  document.getElementById('message_book').innerHTML = '';
});
const getBookPageContent = (id) => {
  $.ajax({
    url: '../classes/teacherAddReview/writtenBooks/getBookPages.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      const contentElement = document.getElementById('content_book');
      const addReviewContentElement = document.getElementById(
        'add_review_content_book'
      );
      contentElement.innerHTML = '';
      addReviewContentElement.innerHTML = '';
      contentElement.innerHTML += response;
      addReviewContentElement.innerHTML += response;
      if (bookCurrent.page && bookCurrent.page != undefined) {
        document.getElementById(
          'modalPageNumberBook'
        ).innerHTML = `Page ${bookCurrent.page}`;
      } else {
        document.getElementById('modalPageNumberBook').innerHTML = '';
      }
    },
  });
};
document.getElementById('pages_book').addEventListener('change', (e) => {
  bookCurrent.page = document
    .getElementById('pages_book')
    .options[document.getElementById('pages_book').selectedIndex].text.split(
      ' '
    )[1];
  bookCurrent.id = e.target.value;
  getBookPageContent(e.target.value);
});

document.getElementById('previous_book').addEventListener('click', () => {
  if (bookCurrent.page > 1) {
    document.getElementById('pages_book').selectedIndex--;
    var event = new Event('change');
    document.getElementById('pages_book').dispatchEvent(event);
  }
});
document.getElementById('next_book').addEventListener('click', () => {
  if (bookCurrent.page < bookTotalPages) {
    document.getElementById('pages_book').selectedIndex++;
    var event = new Event('change');
    document.getElementById('pages_book').dispatchEvent(event);
  }
});
const getCommentsPerPageBook = () => {
  if (document.querySelector('.pagination2')) {
    document
      .getElementById('pagination_book')
      .removeChild(document.querySelector('.pagination2'));
  }
  document.getElementById('message_book').innerHTML = '';
  if (bookCurrent.id != 0) {
    $.ajax({
      url: '../classes/admin/writtenBooks/getCommentsPerPage.php',
      method: 'post',
      data: {
        contentId: contentIdBook,
        pageId: bookCurrent.id,
        page: paginationPageBook,
      },
      dataType: 'JSON',
      success: (response) => {
        document.getElementById('all_comments_book').innerHTML = '';
        const commentsElement = document.getElementById('all_comments_book');
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
              <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReviewBook(${
                comment.commentId
              })">Approve Review</button>
            </p>
              </div>
            </div>`;
            commentsElement.innerHTML += ele;
          });
          totalComments = response[0].totalComments;
          generatePagesCommentsBook(
            response[0].totalComments ?? 0,
            paginationPageBook
          );
        } else {
          commentsElement.innerHTML = `
          <div class="card mb-1 sidebar-card-color">
            <div class="card-body p-2">
            No comments
            </div>
          </div>`;
        }
      },
    });
  }
};
document.getElementById('add_review_book').addEventListener('click', () => {
  totalComments = 0;
  if (document.querySelector('.pagination2')) {
    document
      .getElementById('pagination_book')
      .removeChild(document.querySelector('.pagination2'));
  }
  if (bookCurrent.page != 0) {
    getCommentsPerPageBook();
  }
});
const approveReviewBook = (id) => {
  document.getElementById('message_book').innerHTML = '';
  $.ajax({
    url: '../classes/admin/courses/approveReview.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      if (bookCurrent.page == 0) {
        dispalyContentBook(contentIdBook);
      } else {
        getCommentsPerPageBook();
      }
      document.getElementById(
        'message_book'
      ).innerHTML = `<p class="text-success">${response.message}</p>`;
    },
  });
};
const generatePagesCommentsBook = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    if (pages <= 5) {
      let pageBtns = '';
      for (let i = 1; i <= pages; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerCommentsBook(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerCommentsBook(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_book'
      ).innerHTML = `<ul class="pagination pagination2 justify-content-center">
                  <li class="page-item" onclick="prevNextHandlerCommentsBook('prev')">
                      <button class="page-link" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                      </button>
                  </li>
                  ${pageBtns}
                  <li class="page-item" onclick="prevNextHandlerCommentsBook('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </button>
                  </li>
              </ul>`;
    } else {
      let pageBtns = '';
      for (let i = 1; i < 4; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerCommentsBook(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerCommentsBook(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_book'
      ).innerHTML = `<ul class="pagination pagination2 justify-content-center">
                  <li class="page-item" onclick="prevNextHandlerCommentsBook('prev')">
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
                  <li class="page-item" onclick="prevNextHandlerCommentsBook('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">${pages}</span>
                      </button>
                  </li>
                  <li class="page-item" onclick="prevNextHandlerCommentsBook('next')">
                      <button class="page-link" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </button>
                  </li>
              </ul>`;
    }
  }
};
const changePageHandlerCommentsBook = (page) => {
  paginationPageBook = page;
  getCommentsPerPageBook();
};
const prevNextHandlerCommentsBook = (action) => {
  if (action === 'next' && paginationPageBook < Math.ceil(totalComments / 5)) {
    paginationPageBook = paginationPageBook + 1;
    getCommentsPerPageBook();
  }
  if (action === 'prev' && paginationPageBook > 1) {
    paginationPageBook = paginationPageBook - 1;
    getCommentsPerPageBook();
  }
};
