<?php
$title = 'LOGIN';
$style = '../css/login.css';
require_once "../partials/header.php"; ?>
<div class="container">
    <div class="login-signup">
        <div class="login">
            <p>LOG IN</p>
            <div class="line"></div>
        </div>
        <div class="signup">
            <a href="../">
                <p>SIGN UP</p>
                <div class="line"></div>
            </a>
        </div>
    </div>
    <div class="inputs">
        <div class="field">
            <span>Email</span>
            <input type="text" placeholder="Email" />
        </div>
        <div class="field">
            <span>Password</span>
            <input type="password" placeholder="Password" />
        </div>
        <section class="submit">
            <a href="../userpage"><button>LOG IN</button></a>
            <p>Don't have an account? <a href="../">Create one</a></p>
        </section>
    </div>
</div>
</body>

</html>