<div class="search-container row p-2 m-2">
    <div class="col-md-7 col-12 search-select p-0 flex-column flex-md-row">
        <div class="form-group col-md-5">
            <label for="subject">Subject</label>
            <select class="form-control" id="subject" name="subject">
                <option value="">SELECT</option>
            </select>
        </div>

        <div class="form-group col-md-3">
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

        <div class="form-group col-md-3">
            <label for="unit">Unit</label>
            <select class="form-control unit" id="unit" name="unit">
            </select>
        </div>
    </div>
    <div class="col-md-5 col-12 search-select justify-content-center">
        <div class="form-group">
            <label class="d-md-block d-none" for="search">&nbsp;</label>
            <button id="filter" class="btn input-color px-5">Filter</button>
        </div>
    </div>
</div>

<div class="row m-2">
    <div class="col-lg-4 border-right border-secondary hei65 mb-2 p-1">
        <div class="p-2 mb-2 overflow-auto hei55" id="wrapper">
            <div class="card sidebar-card-color">
                <div class="card-body">
                    Start By Choosing The Course
                </div>
            </div>
        </div>
        <div id="pagination" class="m-3 text-center" aria-label="Page navigation example">
        </div>
    </div>
    <div class="col-lg-8 sidebar rounded content-size p-1">
        <div class="content-header d-flex justify-content-between m-3">
            <div class="form-group d-block">
                <button id="add_review" type="submit" name="submit" class="btn input-color" data-toggle="modal" data-target="#coursesModal">Add your review</button>
            </div>
            <div class="d-flex">
                <span class="btn prev-page-courses"><i class="fas fa-step-backward"></i> Previous</span>
                <div class="form-group">
                    <select id="pages" name="pages" class="form-control">
                        <option value="">SELECT</option>
                    </select>
                </div>
                <span class="btn next-page-courses"><i class="fas fa-step-forward"></i> Next</span>
            </div>
        </div>

        <div id="content" class="page-content rounded overflow-auto hei40 bg-white scroll p-2 m-3">

        </div>

        <div class="d-flex justify-content-center">
            <span class="btn prev-page-courses"><i class="fas fa-step-backward"></i> Previous</span>
            <div class="form-group">
                <select id="pages_1" name="pages" class="form-control">
                    <option value="">SELECT</option>
                </select>
            </div>
            <span class="btn next-page-courses"><i class="fas fa-step-forward"></i> Next</span>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="coursesModal" tabindex="-1" aria-labelledby="coursesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="coursesModalLabel">Add your review</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-7 col-12">
                        <p id="modalPageNumber" class="text-center"></p>
                        <div id="add_review_content" class="page-content rounded overflow-auto hei65 hei65-sm scroll bg-white p-2 mb-3">
                        </div>
                    </div>
                    <div class="col-md-5 col-12">
                        <div id="all_comments" class="page-content rounded overflow-auto hei30 scroll bg-white p-2 mb-3">
                        </div>
                        <div>
                            <div class="form-group">
                                <textarea id="comment" class="form-control ckeditor" name="comment"></textarea>
                            </div>
                            <div class="form-group d-flex justify-content-between">
                                <button id="add_comment" name="add_comment" class="btn input-color">Add</button>
                                <button id="send_comment" class="btn input-color">Send Your Review</button>
                            </div>
                            <p class="text-center" id="message"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../js/teacherAddReviews/script.js" defer></script>