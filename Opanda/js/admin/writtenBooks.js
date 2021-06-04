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
let contentIdBook = null,
  totalPaginationPagesBook = 0;
const filterBooks = () => {
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
        totalPaginationPagesBook = response[0].totalPages;
        response.forEach((res) => {
          const ele = `
            <div class="mb-3 pb-2 border-bottom border-secondary">
              <div class="d-flex flex-column p-2 mx-3">
                <strong class="mb-2 h3">${res.name}</strong>
                <span class="mb-2">${res.subject}</span>
                <span class="mb-2">${res.level}</span>
                <div class="text-start">
                  <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="dispalyContentBook(${res.id})">Add Feedback</button>
                </div>
              </div>
            </div>`;
          wrapperElement.innerHTML += ele;
        });
        generatePagesBook(response[0].totalPages, data_book.page);
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
  .getElementById('filter_book')
  .addEventListener('click', () => filterBooks());
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
            <div class="p-3 border-bottom border-secondary">
            ${summary.commentBody}
            <div class="d-flex justify-content-between mb-0" style="font-size: 13px;"><span class="primary-color">By ${
              summary.username
            }</span> <span class="text-end">${summary.time}</span></div>
            <span class="mb-0" style="font-size: 13px;">Status: ${
              summary.status
            }</span>
          <div class="${summary.status == 'approved' ? 'd-none' : ''} mb-0">
            <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReviewBook(${
              summary.commentId
            })">Approve Review</button>
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
      const pagesElement_1 = document.getElementById('pages_book_1');
      pagesElement.innerHTML = '<option>SELECT</option>';
      pagesElement_1.innerHTML = '<option>SELECT</option>';
      bookTotalPages = response.pages.length;
      response.pages.forEach((page, index) => {
        const option = `<option value="${page}">Page ${index + 1}</option>`;
        pagesElement.innerHTML += option;
        pagesElement_1.innerHTML += option;
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
  document.getElementById('pages_book_1').selectedIndex =
    document.getElementById('pages_book').selectedIndex;
  getBookPageContent(e.target.value);
});
document.getElementById('pages_book_1').addEventListener('change', (e) => {
  bookCurrent.page = document
    .getElementById('pages_book_1')
    .options[document.getElementById('pages_book_1').selectedIndex].text.split(
      ' '
    )[1];
  bookCurrent.id = e.target.value;
  document.getElementById('pages_book').selectedIndex =
    document.getElementById('pages_book_1').selectedIndex;
  getBookPageContent(e.target.value);
});
Array.prototype.forEach.call(
  document.getElementsByClassName('prev-page-books'),
  (btn) => {
    btn.addEventListener('click', () => {
      if (bookCurrent.page > 1) {
        document.getElementById('pages_book').selectedIndex--;
        document.getElementById('pages_book_1').selectedIndex--;
        var event = new Event('change');
        document.getElementById('pages_book').dispatchEvent(event);
        document.getElementById('pages_book_1').dispatchEvent(event);
      }
    });
  }
);
Array.prototype.forEach.call(
  document.getElementsByClassName('next-page-books'),
  (btn) => {
    btn.addEventListener('click', () => {
      if (bookCurrent.page < bookTotalPages) {
        document.getElementById('pages_book').selectedIndex++;
        document.getElementById('pages_book_1').selectedIndex++;
        var event = new Event('change');
        document.getElementById('pages_book').dispatchEvent(event);
        document.getElementById('pages_book_1').dispatchEvent(event);
      }
    });
  }
);
const getCommentsPerPageBook = () => {
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
            <div class="p-3 border-bottom border-secondary">
            ${comment.commentBody}
            <div class="d-flex justify-content-between mb-0" style="font-size: 13px;"><span class="primary-color">By ${
              comment.username
            }</span> <span class="text-end">${comment.time}</span></div>
            <span class="mb-0" style="font-size: 13px;">Status: ${
              comment.status
            }</span>
          <div class="${comment.status == 'approved' ? 'd-none' : ''} mb-0">
            <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReviewBook(${
              comment.commentId
            })">Approve Review</button>
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
const generatePagesBook = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    document.getElementById(
      'pagination_book'
    ).innerHTML = `<span class="btn" onclick="prevNextHandlerBook('prev')"><i class="fas fa-step-backward"></i></span> ${page} of ${pages}<span class="btn" onclick="prevNextHandlerBook('next')"><i class="fas fa-step-forward"></i></span>`;
  }
};
const prevNextHandlerBook = (action) => {
  if (
    action === 'next' &&
    data_book.page < Math.ceil(totalPaginationPagesBook / 5)
  ) {
    data_book.page = data_book.page + 1;
    filterBooks();
  }
  if (action === 'prev' && data_book.page > 1) {
    data_book.page = data_book.page - 1;
    filterBooks();
  }
};
const generatePagesCommentsBook = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    document.getElementById(
      'pagination_book_comment'
    ).innerHTML = `<span class="btn" onclick="prevNextHandlerCommentsBook('prev')"><i class="fas fa-step-backward"></i></span> ${page} of ${pages}<span class="btn" onclick="prevNextHandlerCommentsBook('next')"><i class="fas fa-step-forward"></i></span>`;
  }
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
