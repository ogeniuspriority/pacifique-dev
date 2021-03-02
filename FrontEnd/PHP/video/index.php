<?php
$title = 'START - VIDEO';
$style = '../css/starting.css';
require_once "../partials/header.php";
?>

<div class="container">
    <video id="video" src="" autoplay></video>
    <div class="start-container">
        <div class="start">
            <input type="text" placeholder="Enter the user link here" />
            <a href="../call/video"><button>Call</button></a>
        </div>
    </div>
    <div class="buttons">
        <div class="first">
            <div class="button"><i class="fas fa-microphone-slash"></i></div>
            <div class="button"><i class="fas fa-video"></i></div>
            <div class="button" id="share">
                <img src="../assets/images/screen_share.svg" alt="" />
            </div>
            <a href="../userpage">
                <div class="button end"><i class="fas fa-phone"></i></div>
            </a>
        </div>
        <div class="second button">
            <i class="fas fa-cog"></i>
            <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>
</div>
<script src="../js/video.js"></script>
</body>

</html>