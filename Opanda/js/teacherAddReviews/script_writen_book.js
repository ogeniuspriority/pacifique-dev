$.ajax({
  url: '../classes/teacherAddReview/writtenBooks/getSubjectsBook.php',
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
    url: '../classes/teacherAddReview/writtenBooks/getInfoBook.php',
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
  bookTotalPages = 0;
const dispalyContentBook = (id) => {
  contentIdBook = id;
  bookTotalPages = 0;
  $.ajax({
    url: '../classes/teacherAddReview/writtenBooks/getContentBook.php',
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
      contentElement.innerHTML += response.summary;
      addReviewContentElement.innerHTML += response.summary;
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
  document.getElementById('all_comments_book').innerHTML = '';
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
const all_comments_books_element = document.getElementById('all_comments_book');
let all_comments_book = '';
document.getElementById('add_comment_book').addEventListener('click', () => {
  const comment_book = CKEDITOR.instances.comment_book.getData();
  all_comments_books_element.innerHTML += comment_book;
  all_comments_book += comment_book;
  CKEDITOR.instances.comment_book.setData('');
});
document.getElementById('send_comment_book').addEventListener('click', () => {
  $.ajax({
    url: '../classes/teacherAddReview/createComment.php',
    method: 'post',
    data: {
      comment: all_comments_book,
      contentId: contentIdBook,
      creatorId: 922,
      commentType: 'written books',
      contentLink: bookCurrent.id,
    },
    dataType: 'JSON',
    success: (response) => {
      all_comments_book = '';
      document.getElementById('all_comments_book').innerHTML = '';
      if (response.error) {
        document.getElementById(
          'message_book'
        ).innerHTML = `<p class="text-danger">${response.error}</p>`;
      } else {
        document.getElementById(
          'message_book'
        ).innerHTML = `<p class="text-success">${response.message}</p>`;
      }
    },
  });
});
