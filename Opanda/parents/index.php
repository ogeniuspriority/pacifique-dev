<?php
$title = 'OPANDA | PARENT';
$style = '../css/parents.css';
require_once("partials/header.php");
require_once('../helpers/connect.php');
$con = new Connect();
$subjects = $con->getSubjects();
$children = $con->getChildren('250787374821', 'student');
?>
<div class="mainDiv d-flex m-2 p-2 rounded">
    <div class="students w-25 rounded p-1 m-1 vh-100 overflow-scroll overflow-scroll">
        <?php
        while ($row_children = mysqli_fetch_array($children)) {
            echo "<div class='student rounded mx-1 my-2 p-1 rounded m-1 p-1'>
                    <input type='hidden' class='user_id' value=$row_children[0] />
                    <p>Names: $row_children[1]</p>
                    <p>School: $row_children[8]</p>
                    <p>Level: Senior $row_children[11]</p>
                </div>";
        }
        ?>
    </div>
    <div class="stats rounded p-2 m-2 w-100">
        <div class="choose">
            <button class="statsBtn focus btn px-4 py-1 m-2">Forum</button>
            <button class="statsBtn btn px-4 py-1 m-2">Reading</button>
            <button class="statsBtn btn px-4 py-1 m-2">Simulations</button>
            <div class="dropdown d-inline-block">
                <button class="btn dropdown-toggle px-4 py-1 m-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    More...
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <p class="statsBtn dropdown-item">Library</p>
                    <p class="statsBtn dropdown-item">Feedback</p>
                    <p class="statsBtn dropdown-item">Notifications</p>
                    <p class="statsBtn dropdown-item">Settings</p>
                    <p class="statsBtn dropdown-item">Help</p>
                    <p class="statsBtn dropdown-item">Renew Payment</p>
                    <p class="statsBtn dropdown-item">Online Classes</p>
                    <p class="statsBtn dropdown-item">General Tests</p>
                </div>
            </div>
        </div>
        <div class="stats_container rounded mt-2 p-2">
            <div class="time">
                <button class="date_btns focus btn rounded px-2 py-1 m-2">All the time</button>
                <button class="date_btns btn rounded px-2 py-1 m-2">This year</button>
                <button class="date_btns btn rounded px-2 py-1 m-2">This month</button>
                <button class="date_btns btn rounded px-2 py-1 m-2">this week</button>
                <button class="date_btns btn rounded px-2 py-1 m-2">Yesterday</button>
                <button class="date_btns btn rounded px-2 py-1 m-2">Today</button>
                <input id="picker" type="date" class="btn bg-white">
            </div>
            <div class="total w-25 text-center bg-white rounded px-3 py-1 m-2">Total: 0</div>
            <div class="d-flex justify-content-center">
                <div id="spinner" class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="content rounded p-2 m-2 d-flex">
                <div id="content" class="w-50"></div>
                <div id="chart_area" class="w-50"></div>
            </div>
            <div id="pagination" aria-label="Page navigation example">
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="../js/parents.js"></script>
</body>

</html>