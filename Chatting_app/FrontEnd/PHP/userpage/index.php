<?php
$title = 'USERPAGE';
$style = '../css/userpage.css';
require_once "../partials/header.php"; ?>
<div class="info">
    <div class="information">
        <div class="profile">
            <img src="../assets/images/Ellipse 1.png" alt="" />
        </div>
        <div class="userInfo">
            <strong>Jean Paul Munyemana</strong>
            <p>munyemanajpaul@gmail.com</p>
            <p>+250784329869</p>
        </div>
        <a href="../update"><button>Edit Profile</button></a>
        <div class="btns">
            <button>Copy Link</button>
            <button>Invite People</button>
        </div>
        <i class="fas fa-cog"></i>
    </div>
</div>
<div class="call">
    <div class="call-container">
        <div class="startCall">
            <a href="../video"><button>Video call</button></a>
            <a href="../audio"><button>Audio call</button></a>
        </div>
        <div class="join">
            <p>Join an ongoing metting</p>
            <div class="joinMetting">
                <input type="text" placeholder="Enter the metting link" />
                <a href="../call/video"><button>Join</button></a>
            </div>
        </div>
    </div>
</div>
</body>

</html>