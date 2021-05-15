<?php
class ConnectAdmin extends DB
{
    public function getCourses($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sql = "SELECT DISTINCT(classes.subject) FROM panda_comments INNER JOIN classes ON panda_comments.content_id = classes.id WHERE panda_comments.comment_type = 'courses'";
            $result = $mysqli->query($sql);
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = $row[0];
            }

            echo json_encode($output);
        }
    }
    public function getUnits($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $sql = "SELECT DISTINCT(classes.units) FROM panda_comments INNER JOIN classes ON panda_comments.content_id = classes.id WHERE classes.subject = ? AND classes.level = ? AND panda_comments.comment_type = 'courses'";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('ss', $subject, $level);
            $statement->execute();
            $result = $statement->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = $row[0];
            }

            echo json_encode($output);
        }
    }
    public function getCourseInfos($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['infoPage'])));
            $limit = 5;
            $start = ($page - 1) * $limit;
            $units = isset($_POST['units']) ? $_POST['units'] : [];
            $unit_select_format = '';
            $unit_bind_format = '';
            $all_units = [];
            foreach ($units as $unit) {
                $unit_select_format .= '?, ';
                $unit_bind_format .= 's';
                array_push($all_units, $unit);
            }
            $unit_select_format = $unit_select_format . '"undefined"';
            $sql_total = "SELECT COUNT(*) FROM (SELECT panda_comments.comment_id FROM panda_comments INNER JOIN classes ON panda_comments.content_id = classes.id WHERE classes.subject = ? AND classes.level = ? AND classes.units IN ($unit_select_format) AND panda_comments.comment_type = 'courses' GROUP BY panda_comments.content_id) AS subquery";
            $stmt_total = $mysqli->prepare($sql_total);
            $stmt_total->bind_param("ss" . $unit_bind_format, $subject, $level, ...$all_units);
            $stmt_total->execute();
            $result_total = $stmt_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            array_push($all_units, $start);
            $sql = "SELECT classes.id, classes.name, classes.subject, classes.units FROM panda_comments INNER JOIN classes ON panda_comments.content_id = classes.id WHERE classes.subject = ? AND classes.level = ? AND classes.units IN ($unit_select_format) AND panda_comments.comment_type = 'courses' GROUP BY panda_comments.content_id LIMIT ? ,5";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param("ss" . $unit_bind_format . "s", $subject, $level, ...$all_units);
            $stmt->execute();
            $result = $stmt->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array(
                    'totalPages' => $total_pages,
                    'id' => $row[0],
                    'name' => $row[1],
                    'subject' => $row[2],
                    'units' => $row[3]
                );
            }

            echo json_encode($output);
        }
    }
    public function getContentById($mysqli)
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $sql = "SELECT html_content FROM classes WHERE id = ?";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('s', $id);
            $statement->execute();
            $result = $statement->get_result();
            $html_content = '';
            while ($row = mysqli_fetch_array($result)) {
                $html_content = $row[0];
            }
            $sql2 = "SELECT panda_comments.comment_id, panda_comments.comment_body, users.names, panda_comments.status FROM panda_comments INNER JOIN classes ON panda_comments.content_id = classes.id INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.content_link = 0 AND panda_comments.comment_type = 'courses'";
            $statement2 = $mysqli->prepare($sql2);
            $statement2->bind_param('s', $id);
            $statement2->execute();
            $result2 = $statement2->get_result();
            $comments = [];
            while ($row = mysqli_fetch_array($result2)) {
                $comments[] = array('commentId' => $row[0], 'commentBody' => $row[1], 'username' => $row[2], 'status' => $row[3]);
            }
            $summary = array('htmlContent' => $html_content, 'comments' => $comments);
            $sql_get_pages = "SELECT panda_comments.content_link, course_pages.course_pages_book FROM panda_comments INNER JOIN course_pages ON panda_comments.content_link = course_pages.course_pages_id WHERE panda_comments.content_id = ? GROUP BY course_pages.course_pages_book";
            $statement_get_pages = $mysqli->prepare($sql_get_pages);
            $statement_get_pages->bind_param('s', $id);
            $statement_get_pages->execute();
            $result_get_pages = $statement_get_pages->get_result();
            $pages = [];
            while ($row = mysqli_fetch_array($result_get_pages)) {
                $pages[] = array('pageId' => $row[0], 'pageNumber' => $row[1]);
            }
            $output = array('summary' => $summary, 'pages' => $pages);

            echo json_encode($output);
        }
    }
    public function getCoursePages($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $sql = "SELECT course_pages_data FROM course_pages WHERE course_pages_id = ?";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('s', $id);
            $statement->execute();
            $result = $statement->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output = $row[0];
            }

            echo json_encode($output);
        }
    }
    public function getCommentsPerePage($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $content_id = strip_tags(trim(htmlspecialchars($_POST['contentId'])));
            $page_id = strip_tags(trim(htmlspecialchars($_POST['pageId'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['page'])));
            $limit = 5;
            $start = ($page - 1) * $limit;
            $sql_total = "SELECT COUNT(*) FROM panda_comments INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.content_link = ? AND panda_comments.comment_type = 'courses'";
            $statement_total = $mysqli->prepare($sql_total);
            $statement_total->bind_param('ss', $content_id, $page_id);
            $statement_total->execute();
            $result_total = $statement_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            $sql = "SELECT panda_comments.comment_id, panda_comments.comment_body, users.names, panda_comments.status FROM panda_comments INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.content_link = ? AND panda_comments.comment_type = 'courses' LIMIT ?, 5";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('sss', $content_id, $page_id, $start);
            $statement->execute();
            $result = $statement->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array('totalComments' => $total_pages, 'commentId' => $row[0], 'commentBody' => $row[1], 'username' => $row[2], 'status' => $row[3]);
            }

            echo json_encode($output);
        }
    }
    public function approveReview($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $sql = "UPDATE panda_comments SET status = 'approved' WHERE comment_id = ?";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('s', $id);
            $statement->execute();
            if ($statement->affected_rows == 1) {
                echo json_encode(array('message' => 'Review approved'));
            }
        }
    }
    public function getCoursesEx($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sql = "SELECT DISTINCT(panda_questions_auto.panda_questions_auto_subject) FROM panda_comments INNER JOIN panda_questions_auto ON panda_comments.content_id = panda_questions_auto.panda_questions_auto_id WHERE panda_comments.comment_type = 'exercises'";
            $result = $mysqli->query($sql);
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = $row[0];
            }

            echo json_encode($output);
        }
    }
    public function getUnitsEx($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $sql = "SELECT DISTINCT(panda_questions_auto.panda_questions_auto_academic_units) FROM panda_comments INNER JOIN panda_questions_auto ON panda_comments.content_id = panda_questions_auto.panda_questions_auto_id WHERE panda_comments.comment_type = 'exercises' AND panda_questions_auto_subject = ? AND panda_questions_auto_academic_level = ?";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('ss', $subject, $level);
            $statement->execute();
            $result = $statement->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = $row[0];
            }

            echo json_encode($output);
        }
    }
    public function getExerciseInfo($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['infoPage'])));
            $limit = 5;
            $start = ($page - 1) * $limit;
            $units = isset($_POST['units']) ? $_POST['units'] : [];
            $unit_select_format = '';
            $unit_bind_format = '';
            $all_units = [];
            foreach ($units as $unit) {
                $unit_select_format .= '?, ';
                $unit_bind_format .= 's';
                array_push($all_units, $unit);
            }
            $unit_select_format = $unit_select_format . '"undefined"';
            $sql_total = "SELECT COUNT(*) FROM (SELECT panda_comments.comment_id FROM panda_comments INNER JOIN panda_questions_auto ON panda_comments.content_id = panda_questions_auto.panda_questions_auto_id WHERE panda_questions_auto.panda_questions_auto_subject = ? AND panda_questions_auto.panda_questions_auto_academic_level = ? AND panda_questions_auto.panda_questions_auto_academic_units IN ($unit_select_format) AND panda_comments.comment_type = 'exercises' GROUP BY panda_comments.content_id) AS subquery";
            $stmt_total = $mysqli->prepare($sql_total);
            $stmt_total->bind_param("ss" . $unit_bind_format, $subject, $level, ...$all_units);
            $stmt_total->execute();
            $result_total = $stmt_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            array_push($all_units, $start);
            $sql = "SELECT panda_questions_auto.panda_questions_auto_id, panda_questions_auto.panda_questions_auto_subject, panda_questions_auto.panda_questions_auto_academic_level, panda_questions_auto.panda_questions_auto_academic_units, panda_questions_auto.panda_questions_auto_question_data FROM panda_comments INNER JOIN panda_questions_auto ON panda_comments.content_id = panda_questions_auto.panda_questions_auto_id WHERE panda_questions_auto.panda_questions_auto_subject = ? AND panda_questions_auto.panda_questions_auto_academic_level = ? AND panda_questions_auto.panda_questions_auto_academic_units IN ($unit_select_format) AND panda_comments.comment_type = 'exercises' GROUP BY panda_comments.content_id LIMIT ? ,5";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param("ss" . $unit_bind_format . 's', $subject, $level, ...$all_units);
            $stmt->execute();
            $result = $stmt->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array(
                    'totalPages' => $total_pages,
                    'id' => $row[0],
                    'subject' => $row[1],
                    'level' => $row[2],
                    'units' => $row[3],
                    'summary' => $row[4]
                );
            }

            echo json_encode($output);
        }
    }
    public function getExerciseContent($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $sql = "SELECT panda_questions_auto_question_data, panda_answer_explanation FROM panda_questions_auto WHERE panda_questions_auto_id = ?";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('s', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $question_data = '';
            $explanation = '';
            while ($row = mysqli_fetch_array($result)) {
                $question_data =  $row[0];
                $explanation =  $row[1];
            }
            $sql_answers = "SELECT panda_auto_questions_answers_id, panda_auto_questions_answers_ans_data, panda_auto_questions_answers_isanswer FROM panda_auto_questions_answers WHERE panda_auto_questions_answers_question_id = ?";
            $stmt_answers = $mysqli->prepare($sql_answers);
            $stmt_answers->bind_param('s', $id);
            $stmt_answers->execute();
            $result_answers = $stmt_answers->get_result();
            $output_answers = array();
            while ($row = mysqli_fetch_array($result_answers)) {
                $output_answers[] = array(
                    'id' => $row[0],
                    'answerData' => $row[1],
                    'isAnswer' => $row[2]
                );
            }
            $output = array(
                'questionData' => $question_data,
                'explanations' => $explanation,
                'answers' => $output_answers
            );

            echo json_encode($output);
        }
    }
    public function getCommentsExercises($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $content_id = strip_tags(trim(htmlspecialchars($_POST['contentId'])));
            $link_id = strip_tags(trim(htmlspecialchars($_POST['link'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['page'])));
            $limit = 5;
            $start = ($page - 1) * $limit;
            $sql_total = "SELECT COUNT(*) FROM panda_comments INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.content_link = ? AND panda_comments.comment_type = 'exercises'";
            $statement_total = $mysqli->prepare($sql_total);
            $statement_total->bind_param('ss', $content_id, $link_id);
            $statement_total->execute();
            $result_total = $statement_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            $sql = "SELECT panda_comments.comment_id, panda_comments.comment_body, users.names, panda_comments.status FROM panda_comments INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.content_link = ? AND panda_comments.comment_type = 'exercises' LIMIT ?, 5";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('sss', $content_id, $link_id, $start);
            $statement->execute();
            $result = $statement->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array('totalComments' => $total_pages, 'commentId' => $row[0], 'commentBody' => $row[1], 'username' => $row[2], 'status' => $row[3]);
            }

            echo json_encode($output);
        }
    }
    public function getCoursesBook($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sql = "SELECT DISTINCT(panda_books.panda_books_subject) FROM panda_comments INNER JOIN panda_books ON panda_comments.content_id = panda_books.panda_books_id WHERE panda_books_book_type = 1";
            $result = $mysqli->query($sql);
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = $row[0];
            }

            echo json_encode($output);
        }
    }
    public function getInfoBook($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['page'])));
            $limit = 5;
            $start = ($page - 1) * $limit;
            $sql_total = "SELECT panda_books.panda_books_id, panda_books.panda_books_name, panda_books.panda_books_subject, panda_books.panda_books_level FROM panda_comments INNER JOIN panda_books ON panda_comments.content_id = panda_books.panda_books_id WHERE panda_books.panda_books_subject = ? AND panda_books.panda_books_level = ? AND panda_books.panda_books_book_type = 1 GROUP BY panda_comments.content_id";
            $stmt_total = $mysqli->prepare($sql_total);
            $stmt_total->bind_param('ss', $subject, $level);
            $stmt_total->execute();
            $result_total = $stmt_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            $sql = "SELECT panda_books.panda_books_id, panda_books.panda_books_name, panda_books.panda_books_subject, panda_books.panda_books_level FROM panda_comments INNER JOIN panda_books ON panda_comments.content_id = panda_books.panda_books_id WHERE panda_books.panda_books_subject = ? AND panda_books.panda_books_level = ? AND panda_books.panda_books_book_type = 1 GROUP BY panda_comments.content_id LIMIT ?,5";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('sss', $subject, $level, $start);
            $stmt->execute();
            $result = $stmt->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array(
                    'totalPages' => $total_pages,
                    'id' => $row[0],
                    'name' => $row[1],
                    'subject' => $row[2],
                    'level' => $row[3],
                );
            }

            echo json_encode($output);
        }
    }
    public function getBookContent($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $sql = "SELECT panda_books_file_src FROM panda_books WHERE panda_books_id = ?";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('s', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $bookContent = '';
            while ($row = mysqli_fetch_array($result)) {
                $bookContent = $row[0];
            }
            $sql_comments = "SELECT panda_comments.comment_id, panda_comments.comment_body, users.names, panda_comments.status FROM panda_comments INNER JOIN panda_books ON panda_comments.content_id = panda_books.panda_books_id INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.content_link = 0 AND panda_comments.comment_type = 'written books'";
            $stmt_comments = $mysqli->prepare($sql_comments);
            $stmt_comments->bind_param('s', $id);
            $stmt_comments->execute();
            $result_comments = $stmt_comments->get_result();
            $comments = [];
            while ($row = mysqli_fetch_array($result_comments)) {
                $comments[] = array('commentId' => $row[0], 'commentBody' => $row[1], 'username' => $row[2], 'status' => $row[3]);
            }
            $sql_get_pages = "SELECT panda_pages_id FROM panda_pages WHERE panda_pages_book_id = ?  ORDER BY panda_pages.panda_pages_id ASC";
            $statement_get_pages = $mysqli->prepare($sql_get_pages);
            $statement_get_pages->bind_param('s', $id);
            $statement_get_pages->execute();
            $result_get_pages = $statement_get_pages->get_result();
            $pages = [];
            $summary = array('content' => $bookContent, 'comments' => $comments);
            while ($row = mysqli_fetch_array($result_get_pages)) {
                $pages[] = array($row[0]);
            }
            $output = array('summary' => $summary, 'pages' => $pages);

            echo json_encode($output);
        }
    }
    public function getCommentsPerePageBook($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $content_id = strip_tags(trim(htmlspecialchars($_POST['contentId'])));
            $page_id = strip_tags(trim(htmlspecialchars($_POST['pageId'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['page'])));
            $limit = 5;
            $start = ($page - 1) * $limit;
            $sql_total = "SELECT COUNT(*) FROM panda_comments INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.content_link = ? AND panda_comments.comment_type = 'written books'";
            $statement_total = $mysqli->prepare($sql_total);
            $statement_total->bind_param('ss', $content_id, $page_id);
            $statement_total->execute();
            $result_total = $statement_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            $sql = "SELECT panda_comments.comment_id, panda_comments.comment_body, users.names, panda_comments.status FROM panda_comments INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.content_link = ? AND panda_comments.comment_type = 'written books' LIMIT ?, 5";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('sss', $content_id, $page_id, $start);
            $statement->execute();
            $result = $statement->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array('totalComments' => $total_pages, 'commentId' => $row[0], 'commentBody' => $row[1], 'username' => $row[2], 'status' => $row[3]);
            }

            echo json_encode($output);
        }
    }
    public function getCoursesDocument($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sql = "SELECT DISTINCT(panda_books.panda_books_subject) FROM panda_comments INNER JOIN panda_books ON panda_comments.content_id = panda_books.panda_books_id WHERE panda_books_book_type = 0";
            $result = $mysqli->query($sql);
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = $row[0];
            }

            echo json_encode($output);
        }
    }
    public function getInfoDocument($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $subject = strip_tags(trim(htmlspecialchars($_POST['subject'])));
            $level = strip_tags(trim(htmlspecialchars($_POST['level'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['page'])));
            $limit = 5;
            $start = ($page - 1) * $limit;
            $sql_total = "SELECT panda_books.panda_books_id, panda_books.panda_books_name, panda_books.panda_books_subject, panda_books.panda_books_level FROM panda_comments INNER JOIN panda_books ON panda_comments.content_id = panda_books.panda_books_id WHERE panda_books.panda_books_subject = ? AND panda_books.panda_books_level = ? AND panda_books.panda_books_book_type = 1 GROUP BY panda_comments.content_id";
            $stmt_total = $mysqli->prepare($sql_total);
            $stmt_total->bind_param('ss', $subject, $level);
            $stmt_total->execute();
            $result_total = $stmt_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            $sql = "SELECT panda_books.panda_books_id, panda_books.panda_books_name, panda_books.panda_books_subject, panda_books.panda_books_level FROM panda_comments INNER JOIN panda_books ON panda_comments.content_id = panda_books.panda_books_id WHERE panda_books.panda_books_subject = ? AND panda_books.panda_books_level = ? AND panda_books.panda_books_book_type = 0 GROUP BY panda_comments.content_id LIMIT ?,5";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('sss', $subject, $level, $start);
            $stmt->execute();
            $result = $stmt->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array(
                    'totalPages' => $total_pages,
                    'id' => $row[0],
                    'name' => $row[1],
                    'subject' => $row[2],
                    'level' => $row[3],
                );
            }

            echo json_encode($output);
        }
    }
    public function getDocumentContent($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $sql = "SELECT panda_books_summary, panda_books_file_src FROM panda_books WHERE panda_books_id = ?";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('s', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $bookContent = '';
            while ($row = mysqli_fetch_array($result)) {
                $bookContent = array('summary' => $row[0], 'file' => $row[1]);
            }

            echo json_encode($bookContent);
        }
    }
    public function getCommentsPerePageDoc($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $content_id = strip_tags(trim(htmlspecialchars($_POST['contentId'])));
            $page = strip_tags(trim(htmlspecialchars($_POST['page'])));
            $limit = 5;
            $start = ($page - 1) * $limit;
            $sql_total = "SELECT COUNT(*) FROM panda_comments INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.comment_type = 'document'";
            $statement_total = $mysqli->prepare($sql_total);
            $statement_total->bind_param('s', $content_id);
            $statement_total->execute();
            $result_total = $statement_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            $sql = "SELECT panda_comments.comment_id, panda_comments.comment_body, users.names, panda_comments.status FROM panda_comments INNER JOIN users ON panda_comments.creator_id = users.id WHERE panda_comments.content_id = ? AND panda_comments.comment_type = 'document' LIMIT ?, 5";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('ss', $content_id, $start);
            $statement->execute();
            $result = $statement->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array('totalComments' => $total_pages, 'commentId' => $row[0], 'commentBody' => $row[1], 'username' => $row[2], 'status' => $row[3]);
            }

            echo json_encode($output);
        }
    }
}
