<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ADD REVIEW</title>
  <link rel="stylesheet" href="../css/bootstrap/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha512-xA6Hp6oezhjd6LiLZynuukm80f8BoZ3OpcEYaqKoCV3HKQDrYjDE1Gu8ocxgxoXmwmSzM4iqPvCsOkQNiu41GA==" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css">
  <link rel="stylesheet" href="../css/teacherAddReview.css">
</head>

<body>
  <div class="text-center">
    <p>Contribute to O'Genius Panda content</p>
  </div>
  <nav class="navbar navbar-expand-lg navbar-light">
    <ul class="navbar-nav wrapper border-bottom border-secondary">
      <li class="nav-item wrapper-item mybutton nav-bg">
        <a class="btn nav-link">Evaluate on courses</a>
      </li>
      <li id="ex" class="nav-item wrapper-item mybutton">
        <a class="btn nav-link">Evaluate on exercises</a>
      </li>
      <li class="nav-item wrapper-item mybutton">
        <a class="btn nav-link">Evaluate on written books</a>
      </li>
      <li class="nav-item wrapper-item mybutton">
        <a class="btn nav-link">Evaluate on documents</a>
      </li>
    </ul>
  </nav>
  <div id='1' class="divs focus">
    <?php require_once  'evaluate_courses.php'; ?>
  </div>
  <div id="2" class="divs" style="display: none;">
    <?php require_once  'evaluate_exercises.php'; ?>
  </div>
  <div id="3" class="divs" style="display: none;">
    <?php require_once  'evaluate_written_books.php'; ?>
  </div>

  <div id="4" class="divs" style="display: none;">
    <?php require_once  'evaluate_documents.php'; ?>
  </div>



  <script>
    const btns = document.querySelectorAll('.mybutton')
    const divs = document.querySelectorAll('.divs')

    btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        divs.forEach((div) => {
          div.style.display = 'none';
        });
        btns.forEach((btn) => {
          btn.classList.remove('nav-bg');
        });
        btn.classList.add('nav-bg');
        document.getElementById(`${index + 1}`).style.display = 'block';
        if (index == 2) {
          $('#unit_ex').select2({
            placeholder: 'SELECT',
            multiple: true,
          });
        }
      });
    });
  </script>

  <script src="../js/bootstrap/jquery.min.js"></script>
  <script src="../js/bootstrap/popper.min.js"></script>
  <script src="../js/bootstrap/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>
  <script src="../js/checkeditor/ckeditor.js"></script>
</body>

</html>