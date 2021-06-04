<div class="search-container row p-2 m-2">
    <div class="col-md-7 col-12 search-select p-0 flex-column flex-md-row">
        <div class="form-group col-md-5">
            <label for="subject_book">Subject</label>
            <select class="form-control" id="subject_book" name="subject_book">
                <option value="">SELECT</option>
            </select>
        </div>

        <div class="form-group col-md-3">
            <label for="level_book">Level</label>
            <select class="form-control" id="level_book" name="level_book">
                <option value="1">Senior 1</option>
                <option value="2">Senior 2</option>
                <option value="3">Senior 3</option>
                <option value="4">Senior 4</option>
                <option value="5">Senior 5</option>
                <option value="6">Senior 6</option>
            </select>
        </div>
    </div>
    <div class="col-md-5 col-12 search-select justify-content-center">
        <div class="form-group">
            <label class="d-md-block d-none" for="search">&nbsp;</label>
            <button id="filter_book" class="btn input-color px-5">Filter</button>
        </div>
    </div>
</div>

<div class="row m-2">
    <div class="col-lg-4 p-2 border-right border-secondary d-lg-block" id="wrapper_book">
        <div class="overflow-auto hei63 scroll">
            <div class="card sidebar-card-color">
                <div class="card-body">
                    Start By Choosing The Course
                </div>
            </div>
        </div>
        <div id="pagination_book" class="m-3 text-center" aria-label="Page navigation example">
        </div>
    </div>
    <div class="col-lg-8 sidebar rounded content-size">
        <div class="content-header d-flex justify-content-between m-3">

            <div class="form-group d-block">
                <button id="add_review_book" type="submit" name="submit" class="btn input-color" data-toggle="modal" data-target="#book_review">Add your review</button>
            </div>
            <div class="d-flex">
                <span class="btn prev-page-books"><i class="fas fa-step-backward"></i> Previous</span>
                <div class="form-group">
                    <select id="pages_book" name="units" class="form-control">
                        <option selected>SELECT</option>
                    </select>
                </div>
                <span class="btn next-page-books"><i class="fas fa-step-forward"></i> Next</span>
            </div>
        </div>

        <div id="content_book" class="page-content rounded overflow-auto hei40 scroll bg-white p-2 m-3">

        </div>

        <div class="d-flex justify-content-center">
            <span class="btn prev-page-books"><i class="fas fa-step-backward"></i> Previous</span>
            <div class="form-group">
                <select id="pages_book_1" name="pages" class="form-control">
                    <option value="">SELECT</option>
                </select>
            </div>
            <span class="btn next-page-books"><i class="fas fa-step-forward"></i> Next</span>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="book_review" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content sidebar">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add your review</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-7 col-12">
                        <p class="text-center" id="modalPageNumberBook"></p>
                        <div id="add_review_content_book" class="page-content rounded overflow-auto hei65 scroll bg-white p-2 mb-3">

                        </div>
                    </div>
                    <div class="col-md-5 col-12">
                        <div id="all_comments_book" class="page-content rounded overflow-auto hei30 scroll bg-white p-2 mb-3">

                        </div>
                        <div>
                            <div class="form-group">
                                <textarea id="comment_book" class="form-control ckeditor" name="comment_book" placeholder="your comment"></textarea>
                            </div>
                            <div class="form-group d-flex justify-content-between">
                                <button id="add_comment_book" name="add_comment" class="btn input-color">Add</button>
                                <button id="send_comment_book" class="btn input-color">Send Your Review</button>
                            </div>
                            <p class="text-center" id="message_book"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../js/teacherAddReviews/script_writen_book.js" defer></script>