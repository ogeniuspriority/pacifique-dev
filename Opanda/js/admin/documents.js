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
  totalCommentsDoc = 0,
  totalPaginationPagesDoc = 0;
const filterDoc = () => {
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
      totalPaginationPagesDoc = response[0].totalPages;
      if (response.length !== 0) {
        response.forEach((res) => {
          const ele = `
            <div class="mb-3 pb-2 border-bottom border-secondary">
              <div class="d-flex flex-column p-2 mx-3">
                <strong class="mb-2 h3">${res.name}</strong>
                <span class="mb-2">${res.subject}</span>
                <span class="mb-2">Level ${res.level}</span>
                <div class="text-start">
                  <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="dispalyContentDoc(${res.id})">Add Feedback</button>
                </div>
              </div>
            </div>`;
          wrapperElement.innerHTML += ele;
        });
        generatePagesDoc(response[0].totalPages, data_doc.page);
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
  .getElementById('filter_doc')
  .addEventListener('click', () => filterDoc());

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
            <div class="p-3 border-bottom border-secondary">
            ${comment.commentBody}
            <div class="d-flex justify-content-between mb-0" style="font-size: 13px;"><span class="primary-color">By ${
              comment.username
            }</span> <span class="text-end">${comment.time}</span></div>
            <span class="mb-0" style="font-size: 13px;">Status: ${
              comment.status
            }</span>
          <div class="${comment.status == 'approved' ? 'd-none' : ''} mb-0">
            <button type="submit" name="submit" class="btn input-color py-1 mt-2" onclick="approveReviewDoc(${
              comment.commentId
            })">Approve Review</button>
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
const generatePagesDoc = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    document.getElementById(
      'pagination_doc'
    ).innerHTML = `<span class="btn" onclick="prevNextHandlerDoc('prev')"><i class="fas fa-step-backward"></i></span> ${page} of ${pages}<span class="btn" onclick="prevNextHandlerDoc('next')"><i class="fas fa-step-forward"></i></span>`;
  }
};
const prevNextHandlerDoc = (action) => {
  if (
    action === 'next' &&
    data_doc.page < Math.ceil(totalPaginationPagesDoc / 5)
  ) {
    data_doc.page = data_doc.page + 1;
    getCommentsPerPagedoc();
  }
  if (action === 'prev' && data_doc.page > 1) {
    data_doc.page = data_doc.page - 1;
    getCommentsPerPagedoc();
  }
};
const generatePagesCommentsDoc = (total, page) => {
  if (total > 5) {
    const pages = Math.ceil(total / 5);
    document.getElementById(
      'pagination_doc_comment'
    ).innerHTML = `<span class="btn" onclick="prevNextHandlerCommentsDoc('prev')"><i class="fas fa-step-backward"></i></span> ${page} of ${pages}<span class="btn" onclick="prevNextHandlerCommentsDoc('next')"><i class="fas fa-step-forward"></i></span>`;
  }
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
