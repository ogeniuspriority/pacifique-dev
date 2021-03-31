<?php
$title = 'START - AUDIO';
$style = '../css/audioStarting.css';
require_once "../partials/header.php"; ?>

<div class="container">
    <div class="start-container">
        <div class="audio-start">
            <div class="audio">
                <img src="../assets/images/Ellipse 3.svg" alt="">
            </div>
            <div class="start">
                <input type="text" placeholder="Enter the user link here" />
                <a href="../call/audio/"><button>Call</button></a>
            </div>
        </div>
    </div>
    <div class="buttons">
        <div class="first">
            <div class="button"><i class="fas fa-microphone-slash"></i></div>
            <div class="button"><i class="fas fa-video"></i></div>
            <a href="../userpage">
                <div class="button end"><i class="fas fa-phone"></i></div>
            </a>
        </div>
        <div class="second button">
            <i class="fas fa-cog"></i>
        </div>
    </div>
</div>
</body>
</body>

</html>