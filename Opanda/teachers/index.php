<?php
require_once('../helpers/connect.php');
$con = new Connect();
$subjects = $con->getSubjects();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEACHERS | STATS</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha512-xA6Hp6oezhjd6LiLZynuukm80f8BoZ3OpcEYaqKoCV3HKQDrYjDE1Gu8ocxgxoXmwmSzM4iqPvCsOkQNiu41GA==" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css">
    <link rel="stylesheet" href="../css/style.css">
</head>

<body>
    <div class="mainDiv">
        <div class="d-flex">
            <div class="m-3 w-25 form-group">
                <label for="subject">Subject</label>
                <select class="form-control" id="subject" name="subject">
                    <option value="">SELECT</option>
                    <?php
                    while ($row_subject = mysqli_fetch_array($subjects)) {
                        echo "<option value='$row_subject[0]'>$row_subject[0]</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="m-3 w-25 form-group">
                <label for="level">Level</label>
                <select class="form-control" id="level" name="level">
                    <option value="1">Senior 1</option>
                    <option value="2">Senior 2</option>
                    <option value="3">Senior 3</option>
                    <option value="4">Senior 4</option>
                    <option value="5">Senior 5</option>
                    <option value="6">Senior 6</option>
                </select>
            </div>
            <div class="m-3 w-25 form-group">
                <label for="unit">Unit</label>
                <select class="form-control unit" id="unit" multiple name="unit">
                </select>
            </div>
            <div class="m-3 w-25 form-group">
                <label for="search">&nbsp;</label>
                <input class="form-control" id="search" type="text" placeholder="search query here">
            </div>
        </div>
        <div class="d-flex m-3 p-3 rounded view">
            <div class="form-check mx-3">
                <input class="form-check-input" type="radio" name="view" id="summary" value=2 checked>
                <label class="form-check-label" for="summary">Summary notes</label>
            </div>
            <div class="form-check mx-3">
                <input class="form-check-input" type="radio" name="view" id="live" value=10>
                <label class="form-check-label" for="live">Live classes</label>
            </div>
            <div class="form-check mx-3">
                <input class="form-check-input" type="radio" name="view" id="quiz" value=12>
                <label class="form-check-label" for="quiz">Quiz/Tests</label>
            </div>
            <div class="form-check mx-3">
                <input class="form-check-input" type="radio" name="view" id="books" value=4>
                <label class="form-check-label" for="books">Digital books</label>
            </div>
            <div class="form-check mx-3">
                <input class="form-check-input" type="radio" name="view" id="document" value=4>
                <label class="form-check-label" for="document">Documents</label>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <div class="d-flex m-3 p-2 rounded first align-items-center">
                <div class="form-check mx-3">
                    <input class="form-check-input" type="radio" name="time" id="alltime" value=1 checked>
                    <label class="form-check-label" for="alltime">All time</label>
                </div>
                <div class="form-check mx-3">
                    <input class="form-check-input" type="radio" name="time" id="thisyear" value=2>
                    <label class="form-check-label" for="thisyear">This Year</label>
                </div>
                <div class="form-check mx-3">
                    <input class="form-check-input" type="radio" name="time" id="thismonth" value=3>
                    <label class="form-check-label" for="thismonth">This Month</label>
                </div>
                <div class="form-check mx-3">
                    <input class="form-check-input" type="radio" name="time" id="thisweek" value=4>
                    <label class="form-check-label" for="thisweek">This Week</label>
                </div>
                <div class="form-check mx-3">
                    <input class="form-check-input" type="radio" name="time" id="yesterday" value=5>
                    <label class=" form-check-label" for="yesterday">Yesterday</label>
                </div>
                <div class="form-check mx-3">
                    <input class="form-check-input" type="radio" name="time" id="today" value=6>
                    <label class="form-check-label" for="today">Today</label>
                </div>
                <input id="picker" type="date" class="btn bg-white">
            </div>
            <button class="btn px-5 py-2 filter">
                <a class="text-dark text-decoration-none" href="#card">Filter</a>
            </button>
        </div>
        <div id="card" class="m-3">
            <span>Unique Views</span>
            <div class="d-flex p-2 rounded card_container">
                <div class="summary w-50 rounded m-3 px-5 py-2">
                    <p class="subject m-2">Subject</p>
                    <p class="level m-2">Level</p>
                    <p class="units m-2">Unit(s)</p>
                    <a href="#" class="text-decoration-none text-dark">Summary notes</a>
                </div>
                <div class="students w-25 rounded m-3 p-2 text-center">
                    <p>Students</p>
                    <p class="unique_students_views number display-4">0</p>
                </div>
                <div class="teachers w-25 rounded m-3 p-2 text-center">
                    <p>Teachers</p>
                    <p class="unique_teachers_views number display-4">0</p>
                </div>
            </div>
        </div>
        <div class="m-3">
            <span>All Views</span>
            <div class="d-flex p-2 rounded card_container">
                <div class="summary w-50 rounded m-3 px-5 py-2">
                    <p class="subject m-2">Subject</p>
                    <p class="level m-2">Level</p>
                    <p class="units m-2">Unit(s)</p>
                    <a href="#" class="text-decoration-none text-dark">Summary notes</a>
                </div>
                <div class="students w-25 rounded m-3 p-2 text-center">
                    <p>Students</p>
                    <p class="all_students_views number display-4">0</p>
                </div>
                <div class="teachers w-25 rounded m-3 p-2 text-center">
                    <p>Teachers</p>
                    <p class="all_teachers_views number display-4">0</p>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>
    <script>

    </script>
    <script defer src="../js/teachers.js"></script>
</body>

</html>