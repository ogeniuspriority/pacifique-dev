<?php
$title = 'OPANDA | PARENT';
$style = '../css/parents.css';
require_once("partials/header.php");
?>
<div class="mainDiv row m-2 p-2 rounded">
    <div class="col-md-2 students rounded p-1 m-1 vh-md-100 overflow-scroll">

    </div>
    <div class="col-md stats rounded p-2 m-1">
        <div class="row choose justify-content-center justify-content-xl-start">
            <button class="col-md-2 col-10 statsBtn focus btn px-4 py-1 m-md-3 m-1">Forum</button>
            <button class="col-md-2 col-10 statsBtn btn px-4 py-1 m-md-3 m-1">Reading</button>
            <button class="col-md-2 col-10 statsBtn btn px-4 py-1 m-md-3 m-1">Simulations</button>
            <div class="col-md-2 dropdown d-inline-block m-2">
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
                    <p class="statsBtn dropdown-item">Evaluation Tests</p>
                </div>
            </div>
        </div>
        <div class="stats_container rounded mt-2 p-1">
            <div class="time">
                <button class="date_btns focus btn rounded px-2 py-1 m-1">All the time</button>
                <button class="date_btns btn rounded px-2 py-1 m-1">This year</button>
                <button class="date_btns btn rounded px-2 py-1 m-1">This month</button>
                <button class="date_btns btn rounded px-2 py-1 m-1">this week</button>
                <button class="date_btns btn rounded px-2 py-1 m-1">Yesterday</button>
                <button class="date_btns btn rounded px-2 py-1 m-1">Today</button>
                <div class="py-1 m-1">
                    <input id="picker" type="date" class="btn bg-white">
                </div>
            </div>
            <div class="total d-inline text-center bg-white rounded px-3 py-1 m-1">Total: 0</div>
            <div class="d-flex justify-content-center">
                <div id="spinner" class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="content rounded p-1 m-1 row">
                <div id="content" class="col-md-4 p-0"></div>
                <div id="chart_area" class="col-md-8 p-1"></div>
            </div>
            <div id="pagination" aria-label="Page navigation example">
            </div>
        </div>
        <div class="lastBtns d-flex justify-content-center">
            <button id="view_scheduled_classes" class="btn rounded px-2 py-1 m-2" data-toggle="modal" data-target="#scheduledClassesModal">View scheduled classes</button>
            <button id="ask_teachers_help" class="btn rounded px-2 py-1 m-2" data-toggle="modal" data-target="#teacherHelpModal">Ask teacher's help</button>
        </div>
    </div>
</div>
<div class="modal fade" id="scheduledClassesModal" tabindex="-1" aria-labelledby="scheduledClassesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="scheduledClassesModalLabel">Scheduled classes for the selected child</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="scheduked_classes" class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="teacherHelpModal" tabindex="-1" aria-labelledby="teacherHelpModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="teacherHelpModalLabel">List of teachers</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="list_of_teachers" class="modal-body">

            </div>
            <div id="modal_pagination" aria-label="Page navigation example"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<script src="../js/bootstrap/jquery.min.js"></script>
<script src="../js/bootstrap/popper.min.js"></script>
<script src="../js/bootstrap/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="../js/parents.js"></script>
</body>

</html>