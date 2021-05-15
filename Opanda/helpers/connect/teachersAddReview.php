<?php
class ConnectTeacherAddReview extends DB
{
    public function getCourses($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sql = "SELECT DISTINCT(subject) FROM classes";
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
            $sql = "SELECT DISTINCT(units) FROM classes WHERE subject = ? AND level = ?";
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
            $sql_total = "SELECT count(*)  FROM classes WHERE subject= ? AND level= ? AND units IN ($unit_select_format)";
            $stmt_total = $mysqli->prepare($sql_total);
            $stmt_total->bind_param("ss" . $unit_bind_format, $subject, $level, ...$all_units);
            $stmt_total->execute();
            $result_total = $stmt_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            array_push($all_units, $start);
            $sql = "SELECT id, name, subject, units  FROM classes WHERE subject= ? AND level= ? AND units IN ($unit_select_format) LIMIT ? ,5";
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
            $sql = "SELECT html_content  FROM classes WHERE id= ?";
            $statement = $mysqli->prepare($sql);
            $statement->bind_param('s', $id);
            $statement->execute();
            $result = $statement->get_result();
            $sql_get_pages = "SELECT course_pages_id FROM `course_pages` WHERE course_pages_book_id = ? ORDER BY `course_pages`.`course_pages_regdate`  ASC";
            $statement_get_pages = $mysqli->prepare($sql_get_pages);
            $statement_get_pages->bind_param('s', $id);
            $statement_get_pages->execute();
            $result_get_pages = $statement_get_pages->get_result();
            $output = array();
            $content = '';
            $pages = [];
            while ($row = mysqli_fetch_array($result)) {
                $content = $row[0];
            }
            while ($row = mysqli_fetch_array($result_get_pages)) {
                $pages[] = array($row[0]);
            }
            $output = array('html_content' => $content, 'pages' => $pages);

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
    public function getCoursesEx($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sql = "SELECT DISTINCT(panda_questions_auto_subject) FROM panda_questions_auto";
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
            $sql = "SELECT DISTINCT(panda_questions_auto_academic_units) FROM panda_questions_auto WHERE panda_questions_auto_subject = ? AND panda_questions_auto_academic_level = ?";
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
            $sql_total = "SELECT COUNT(*) FROM panda_questions_auto WHERE panda_questions_auto_subject = ? AND panda_questions_auto_academic_level = ? AND panda_questions_auto_academic_units IN ($unit_select_format)";
            $stmt_total = $mysqli->prepare($sql_total);
            $stmt_total->bind_param("ss" . $unit_bind_format, $subject, $level, ...$all_units);
            $stmt_total->execute();
            $result_total = $stmt_total->get_result();
            $total_pages = 0;
            while ($row = mysqli_fetch_array($result_total)) {
                $total_pages = $row[0];
            }
            array_push($all_units, $start);
            $sql = "SELECT panda_questions_auto_id, panda_questions_auto_subject, panda_questions_auto_academic_level, panda_questions_auto_academic_units, panda_questions_auto_question_data FROM panda_questions_auto WHERE panda_questions_auto_subject = ? AND panda_questions_auto_academic_level = ? AND panda_questions_auto_academic_units IN ($unit_select_format) LIMIT ? ,5";
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
    public function getCoursesBook($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sql = "SELECT DISTINCT(panda_books_subject) FROM panda_books WHERE panda_books_book_type = 1";
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
            $sql = "SELECT panda_books_id, panda_books_name, panda_books_subject, panda_books_level FROM `panda_books` WHERE panda_books_subject = ? AND panda_books_level = ? AND panda_books_book_type = 1";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('ss', $subject, $level);
            $stmt->execute();
            $result = $stmt->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array(
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
            $sql_get_pages = "SELECT panda_pages_id FROM panda_pages WHERE panda_pages_book_id = ?  ORDER BY panda_pages.panda_pages_id ASC";
            $statement_get_pages = $mysqli->prepare($sql_get_pages);
            $statement_get_pages->bind_param('s', $id);
            $statement_get_pages->execute();
            $result_get_pages = $statement_get_pages->get_result();
            $pages = [];
            while ($row = mysqli_fetch_array($result)) {
                $bookContent = $row[0];
            }
            while ($row = mysqli_fetch_array($result_get_pages)) {
                $pages[] = array($row[0]);
            }
            $output = array('summary' => $bookContent, 'pages' => $pages);

            echo json_encode($output);
        }
    }
    public function getBookPages($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $sql = "SELECT panda_pages_data FROM panda_pages WHERE panda_pages_id = ?";
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
    public function getCoursesDocument($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $sql = "SELECT DISTINCT(panda_books_subject) FROM panda_books WHERE panda_books_book_type = 0";
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
            $sql = "SELECT panda_books_id, panda_books_name, panda_books_subject, panda_books_level FROM `panda_books` WHERE panda_books_subject = ? AND panda_books_level = ? AND panda_books_book_type = 0";
            $stmt = $mysqli->prepare($sql);
            $stmt->bind_param('ss', $subject, $level);
            $stmt->execute();
            $result = $stmt->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = array(
                    'id' => $row[0],
                    'name' => $row[1],
                    'subject' => $row[2],
                    'units' => $row[3],
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
    public function insertComment($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $comment = $_POST['comment'];
            if ($comment === '') {
                echo json_encode(array('error' => 'Start by adding comment'));
                exit();
            }
            $content_id = strip_tags(trim(htmlspecialchars($_POST['contentId'])));
            if (!$content_id || $content_id == 0) {
                echo json_encode(array('error' => 'You did not choose the course'));
                exit();
            }
            $creator_id = strip_tags(trim(htmlspecialchars($_POST['creatorId'])));
            $comment_type = strip_tags(trim(htmlspecialchars($_POST['commentType'])));
            $content_link = strip_tags(trim(htmlspecialchars($_POST['contentLink'])));
            //define sql to be executed
            $sql = "INSERT INTO panda_comments (creator_id, comment_body, comment_type, content_id, content_link) VALUES (?, ?, ?, ?, ?)";

            //prepare sql statetement for executed
            $stmt = $mysqli->prepare($sql);

            //bind all placeholder to actual values
            $stmt->bind_param('sssss', $creator_id, $comment, $comment_type, $content_id, $content_link);
            $stmt->execute();
            echo json_encode(array('message' => 'Comment sent successfully'));
        }
    }

    public function getComments($mysqli)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            // $id = strip_tags(trim(htmlspecialchars($_POST['id'])));
            $sql = "SELECT comment_body FROM panda_comments WHERE comment_id=?";
            $stmt = $mysqli->prepare($sql);
            $id = 18;
            $stmt->bind_param('s', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $output = array();
            while ($row = mysqli_fetch_array($result)) {
                $output[] = $row[0];
            }
            echo json_encode($output);
        }
    }
}
