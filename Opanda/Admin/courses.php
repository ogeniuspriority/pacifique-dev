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
    <div class="col-lg-4 sidebar rounded hei65 mb-2 p-1">
        <div class="p-2 mb-2 overflow-auto hei55" id="wrapper">
            <div class="card sidebar-card-color">
                <div class="card-body">
                    Start By Choosing The Course
                </div>
            </div>
        </div>
        <div id="pagination" class="m-3" aria-label="Page navigation example">
        </div>
    </div>
    <div class="col-lg-8 sidebar rounded content-size p-1">
        <div class="content-header d-flex justify-content-between py-2">
            <div class="form-group d-block col-md-6">
                <button id="add_review" type="submit" name="submit" class="btn btn-light" data-toggle="modal" data-target="#coursesModal">See Reviews On This Page</button>
            </div>
            <div class="form-group col-md-3">
                <select id="pages" name="pages" class="form-control input-color">
                    <option value="">SELECT</option>
                </select>
            </div>
        </div>

        <div id="content" class="page-content rounded overflow-auto hei40 scroll bg-light p-2 mb-3">

        </div>

        <div class="d-flex justify-content-between pb-3">
            <button id="previous" type="submit" name="submit" class="btn btn-light">Previous</button>
            <button id="next" type="submit" name="submit" class="btn btn-light">Next</button>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="coursesModal" tabindex="-1" aria-labelledby="coursesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="coursesModalLabel">See Reviews</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-7 col-12">
                        <p id="modalPageNumber" class="text-center"></p>
                        <div id="add_review_content" class="page-content rounded overflow-auto hei65 hei65-sm scroll bg-light p-2 mb-3">
                        </div>
                    </div>
                    <div class="col-md-5 col-12">
                        <p class="text-center">Comments on this review</p>
                        <div id="all_comments" class="page-content rounded overflow-auto hei55 scroll bg-light p-2 mb-3">
                        </div>
                        <p class="text-center" id="message"></p>
                        <div id="pagination_comments" class="m-3" aria-label="Page navigation example">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../js/admin/courses.js" defer></script>