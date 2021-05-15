<div class="search-container row p-2 m-2">
    <div class="col-md-7 col-12 search-select p-0 flex-column flex-md-row">
        <div class="form-group col-md-5">
            <label for="subject_ex">Subject</label>
            <select class="form-control" id="subject_ex" name="subject_ex">
                <option value="">SELECT</option>
            </select>
        </div>

        <div class="form-group col-md-3">
            <label for="level_ex">Level</label>
            <select class="form-control" id="level_ex" name="level_ex">
                <option value="1">Senior 1</option>
                <option value="2">Senior 2</option>
                <option value="3">Senior 3</option>
                <option value="4">Senior 4</option>
                <option value="5">Senior 5</option>
                <option value="6">Senior 6</option>
            </select>
        </div>
        <div id="spinner" class="form-group" style="display: none;">
            <label class="d-md-block d-none" for="search">&nbsp;</label>
            <div class="d-flex justify-content-center">
                <div id="spinner" class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-3">
            <label for="unit_ex">Unit</label>
            <select class="form-control unit" id="unit_ex" name="unit_ex">
            </select>
        </div>
    </div>
    <div class="col-md-5 col-12 search-select justify-content-center">
        <div class="form-group">
            <label class="d-md-block d-none" for="search">&nbsp;</label>
            <button id="filter_exercises" class="btn input-color px-5">Filter</button>
        </div>
    </div>
</div>

<div class="row m-2">
    <div class="col-lg-4 sidebar rounded hei65 mb-2 p-1">
        <div class="p-2 mb-2 overflow-auto hei55" id="wrapper_exercises">
            <div class="card sidebar-card-color">
                <div class="card-body">
                    Start By Choosing The Course
                </div>
            </div>
        </div>
        <div id="pagination_ex" class="m-3" aria-label="Page navigation example">
        </div>
    </div>
    <div class="col-lg-8 sidebar rounded content-size d-flex p-1">
        <div class="mar-l p-2">
            <div class="mb-3">
                <div class="h6">Question data:</div>
                <div class="row mar-y-o">
                    <div class="card col-md-8 col-12 exercise-color">
                        <div id="question" class="card-body">
                        </div>
                    </div>
                    <div class="col-md-4 col-12 question-btn">
                        <button id="question_see_review" class="btn input-color" data-toggle="modal" data-target="#questionModal">See Reviews</button>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <div class="h6">Explanation data:</div>
                <div class="row mar-y-o">
                    <div class="card col-md-8 col-12 exercise-color">
                        <div id="explanation" class="card-body">
                        </div>
                    </div>
                    <div class="col-md-4 col-12 question-btn">
                        <button id="explanation_see_review" class="btn input-color" data-toggle="modal" data-target="#questionModal">See Reviews</button>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <div class="h6">Answer Options</div>
                <div class="row mar-y-o">
                    <div id="options" class="card col-md-8 col-12 exercise-color">
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="questionModal" tabindex="-1" aria-labelledby="questionModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-7 col-12">
                                <div class="d-flex justify-content-around" id="ex_type"></div>
                                <div id="see_review__el" class="page-content rounded overflow-auto hei65 hei65-sm scroll bg-light p-2 mb-3">

                                </div>
                            </div>
                            <div class="col-md-5 col-12">
                                <div id="all_comments_ex" class="page-content rounded overflow-auto hei55 scroll bg-light p-2 mb-3">
                                </div>
                                <p class="text-center" id="message_ex"></p>
                                <div id="pagination_comments_ex" class="m-3" aria-label="Page navigation example">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../js/admin/exercises.js" defer></script>