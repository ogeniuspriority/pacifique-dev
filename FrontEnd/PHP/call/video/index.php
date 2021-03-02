<?php
$title = 'CALL - VIDEO';
$style = '../../css/starting.css';
require_once "../../partials/header.php";
?>

<div class="container">
    <div class="users">
        <img src="../../assets/images/view_comfy.svg" alt="" />
    </div>
    <div class="plus">
        <i class="fas fa-user-plus"></i>
    </div>
    <video id="video" src="" autoplay></video>
    <div class="participants show">
        <div class="title">
            <p>Participants</p>
            <div>
                <img src="../../assets/images/view_list.svg" alt="" />
                <img src="../../assets/images/view_comfy.svg" alt="" />
            </div>
        </div>
        <div class="participant">
            <i class="fas fa-ellipsis-v"></i>
            <img src="../../assets/images/Rectangle 18.svg" alt="" />
        </div>
        <div class="participant">
            <i class="fas fa-ellipsis-v"></i>
            <img src="../../assets/images/user2.svg" alt="" />
        </div>
        <div class="participant">
            <i class="fas fa-ellipsis-v"></i>
            <img src="../../assets/images/Rectangle 20.svg" alt="" />
        </div>
        <div class="down"><i class="fas fa-angle-down"></i></div>
    </div>
    <div class="participants_2">
        <p class="title">Participants</p>
        <div class="participant_2">
            <img src="../../assets/images/Ellipse 2.svg" alt="" />
            <p>Jakob Botosh</p>
            <div class="btn">
                <div><i class="fas fa-microphone-slash"></i></div>
                <div><i class="fas fa-video-slash"></i></div>
            </div>
        </div>
        <div class="participant_2">
            <img src="../../assets/images/Ellipse 2.svg" alt="" />
            <p>Jakob Botosh</p>
            <div class="btn">
                <div><i class="fas fa-microphone-slash"></i></div>
                <div><i class="fas fa-video-slash"></i></div>
            </div>
        </div>
        <div class="participant_2">
            <img src="../../assets/images/Ellipse 2.svg" alt="" />
            <p>Jakob Botosh</p>
            <div class="btn">
                <div><i class="fas fa-microphone-slash"></i></div>
                <div><i class="fas fa-video-slash"></i></div>
            </div>
        </div>
        <div class="participant_2">
            <img src="../../assets/images/Ellipse 2.svg" alt="" />
            <p>Jakob Botosh</p>
            <div class="btn">
                <div><i class="fas fa-microphone-slash"></i></div>
                <div><i class="fas fa-video-slash"></i></div>
            </div>
        </div>
        <div class="participant_2">
            <img src="../../assets/images/Ellipse 2.svg" alt="" />
            <p>Jakob Botosh</p>
            <div class="btn">
                <div><i class="fas fa-microphone-slash"></i></div>
                <div><i class="fas fa-video-slash"></i></div>
            </div>
        </div>
        <div class="participant_2">
            <img src="../../assets/images/Ellipse 2.svg" alt="" />
            <p>Jakob Botosh</p>
            <div class="btn">
                <div><i class="fas fa-microphone-slash"></i></div>
                <div><i class="fas fa-video-slash"></i></div>
            </div>
        </div>
    </div>
    <div class="buttons">
        <div class="first">
            <div class="button"><i class="fas fa-microphone-slash"></i></div>
            <div class="button"><i class="fas fa-video"></i></div>
            <div class="button" id="participants_2">
                <i class="fas fa-user-friends"></i>
            </div>
            <div class="button"><i class="fas fa-comment-alt"></i></div>
            <div class="button"><i class="fas fa-record-vinyl"></i></div>
            <a href="../../userpage">
                <div class="button end"><i class="fas fa-phone"></i></div>
            </a>
        </div>
        <button class="share">
            Share screen <img src="../../assets/images/screen_share.svg" alt="" />
        </button>
        <div class="second button">
            <i class="fas fa-cog"></i>
        </div>
    </div>
</div>
<script src="../../js/starting.js"></script>
<script src="../../js/video.js"></script>
</body>

</html>