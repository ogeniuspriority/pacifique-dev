$.ajax({
  url: '../classes/admin/document/getSubjectsDocument.php',
  method: 'post',
  data: {},
  dataType: 'JSON',
  success: (response) => {
    const subjectElement = document.getElementById('subject_doc');
    subjectElement.innerHTML = '<option selected> Select</option>';
    response.forEach((res) => {
      const option = `<option value="${res}">${res}</option>`;
      subjectElement.innerHTML += option;
    });
  },
});
const data_doc = {
  subject: '',
  level: '1',
  page: 1,
};
document.getElementById('subject_doc').addEventListener('change', () => {
  data_doc.subject = document.getElementById('subject_doc').value;
});
document.getElementById('level_doc').addEventListener('change', () => {
  data_doc.level = document.getElementById('level_doc').value;
});
let contentIdDoc = null,
  paginationPageDoc = 1,
  totalCommentsDoc = 0;
document.getElementById('filter_doc').addEventListener('click', () => {
  contentIdDoc = null;
  const wrapperElement = document.getElementById('wrapper_doc');
  wrapperElement.innerHTML = `
    <div class="d-flex justify-content-center">
      <div id="spinner" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>`;
  $.ajax({
    url: '../classes/admin/document/getInfoDocument.php',
    method: 'post',
    data: data_doc,
    dataType: 'JSON',
    success: (response) => {
      wrapperElement.innerHTML = '';
      if (response.length !== 0) {
        response.forEach((res) => {
          const ele = `
          <div class="card mb-3 sidebar-card-color">
            <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                    <span class="fw-bold">Name:</span>
                    <span class="text-end">${res.name}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="fw-bold">Subject:</span>
                    <span class="text-end">${res.subject}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="fw-bold">Level:</span>
                    <span class="text-end">${res.level}</span>
                </div>
                <div class="text-center">
                  <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="dispalyContentDoc(${res.id})">Add Feedback</button>
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

const dispalyContentDoc = (id) => {
  contentIdDoc = id;
  $.ajax({
    url: '../classes/admin/document/getContentDocument.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      const contentElement = document.getElementById('content_doc');
      const addReviewContentElement = document.getElementById(
        'add_review_content_doc'
      );
      contentElement.innerHTML = '';
      addReviewContentElement.innerHTML = '';
      contentElement.innerHTML += response.summary;
      addReviewContentElement.innerHTML += response.summary;
      document.getElementById('modalPageNumberDoc').innerHTML = 'Summary';
      window.scrollTo(0, document.body.scrollHeight);
    },
  });
};
document.getElementById('add_review_doc').addEventListener('click', () => {
  document.getElementById('all_comments_doc').innerHTML = '';
  document.getElementById('message_doc').innerHTML = '';
});
document.getElementById('view_document').addEventListener('click', () => {
  $.ajax({
    url: '../classes/admin/document/getContentDocument.php',
    method: 'post',
    data: {
      id: contentIdDoc,
    },
    dataType: 'JSON',
    success: (response) => {
      window.open(`${response.file}`, '_blank');
    },
  });
});
const getCommentsPerPagedoc = () => {
  if (document.querySelector('.pagination2')) {
    document
      .getElementById('pagination_doc')
      .removeChild(document.querySelector('.pagination2'));
  }
  document.getElementById('message_doc').innerHTML = '';
  $.ajax({
    url: '../classes/admin/document/getCommentsPerPage.php',
    method: 'post',
    data: {
      contentId: contentIdDoc,
      page: paginationPageDoc,
    },
    dataType: 'JSON',
    success: (response) => {
      document.getElementById('all_comments_doc').innerHTML = '';
      const commentsElement = document.getElementById('all_comments_doc');
      if (response[0]) {
        totalCommentsDoc = response[0].totalComments;
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
                <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReviewDoc(${
                  comment.commentId
                })">Approve Review</button>
              </p>
                </div>
              </div>`;
          commentsElement.innerHTML += ele;
        });
        generatePagesCommentsDoc(totalCommentsDoc, paginationPageDoc);
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
};
document.getElementById('add_review_doc').addEventListener('click', () => {
  getCommentsPerPagedoc();
});
const approveReviewDoc = (id) => {
  document.getElementById('message_doc').innerHTML = '';
  $.ajax({
    url: '../classes/admin/courses/approveReview.php',
    method: 'post',
    data: {
      id: id,
    },
    dataType: 'JSON',
    success: (response) => {
      getCommentsPerPagedoc();
      document.getElementById(
        'message_doc'
      ).innerHTML = `<p class="text-success">${response.message}</p>`;
    },
  });
};
const generatePagesCommentsDoc = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    if (pages <= 5) {
      let pageBtns = '';
      for (let i = 1; i <= pages; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerCommentsDoc(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerCommentsDoc(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_doc'
      ).innerHTML = `<ul class="pagination pagination2 justify-content-center">
                    <li class="page-item" onclick="prevNextHandlerCommentsDoc('prev')">
                        <button class="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    ${pageBtns}
                    <li class="page-item" onclick="prevNextHandlerCommentsDoc('next')">
                        <button class="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>`;
    } else {
      let pageBtns = '';
      for (let i = 1; i < 4; i++) {
        if (i === page) {
          pageBtns += `<li class="page-item active"><button class="page-link" onclick="changePageHandlerCommentsDoc(${i})">${i}</button></li>`;
        } else {
          pageBtns += `<li class="page-item"><button class="page-link" onclick="changePageHandlerCommentsDoc(${i})">${i}</button></li>`;
        }
      }
      document.getElementById(
        'pagination_doc'
      ).innerHTML = `<ul class="pagination pagination2 justify-content-center">
                    <li class="page-item" onclick="prevNextHandlerCommentsDoc('prev')">
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
                    <li class="page-item" onclick="prevNextHandlerCommentsDoc('next')">
                        <button class="page-link" aria-label="Next">
                            <span aria-hidden="true">${pages}</span>
                        </button>
                    </li>
                    <li class="page-item" onclick="prevNextHandlerCommentsDoc('next')">
                        <button class="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>`;
    }
  }
};
const changePageHandlerCommentsDoc = (page) => {
  paginationPageDoc = page;
  getCommentsPerPagedoc();
};
const prevNextHandlerCommentsDoc = (action) => {
  if (
    action === 'next' &&
    paginationPageDoc < Math.ceil(totalCommentsDoc / 5)
  ) {
    paginationPageDoc = paginationPageDoc + 1;
    getCommentsPerPagedoc();
  }
  if (action === 'prev' && paginationPageDoc > 1) {
    paginationPageDoc = paginationPageDoc - 1;
    getCommentsPerPagedoc();
  }
};
