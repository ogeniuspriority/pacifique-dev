$.ajax({
  url: '../classes/teacherAddReview/document/getSubjectsDocument.php',
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
};
document.getElementById('subject_doc').addEventListener('change', () => {
  data_doc.subject = document.getElementById('subject_doc').value;
});
document.getElementById('level_doc').addEventListener('change', () => {
  data_doc.level = document.getElementById('level_doc').value;
});
let contentIdDoc = null;
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
    url: '../classes/teacherAddReview/document/getInfoDocument.php',
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
                  <span class="fw-bold">Units:</span>
                  <span class="text-end">${res.units}</span>
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
    url: '../classes/teacherAddReview/document/getContentDocument.php',
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
const all_comments_docs_element = document.getElementById('all_comments_doc');
let all_comments_doc = '';
document.getElementById('add_comment_doc').addEventListener('click', () => {
  const comment_doc = CKEDITOR.instances.comment_doc.getData();
  all_comments_docs_element.innerHTML += comment_doc;
  all_comments_doc += comment_doc;
  CKEDITOR.instances.comment_doc.setData('');
});
document.getElementById('send_comment_doc').addEventListener('click', () => {
  $.ajax({
    url: '../classes/teacherAddReview/createComment.php',
    method: 'post',
    data: {
      comment: all_comments_doc,
      contentId: contentIdDoc,
      creatorId: 922,
      commentType: 'document',
      contentLink: 0,
    },
    dataType: 'JSON',
    success: (response) => {
      all_comments_doc = '';
      if (response.error) {
        document.getElementById(
          'message_doc'
        ).innerHTML = `<p class="text-danger">${response.error}</p>`;
      } else {
        document.getElementById('all_comments_doc').innerHTML = '';
        document.getElementById(
          'message_doc'
        ).innerHTML = `<p class="text-success">${response.message}</p>`;
      }
    },
  });
});
document.getElementById('view_document').addEventListener('click', () => {
  $.ajax({
    url: '../classes/teacherAddReview/document/getContentDocument.php',
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
