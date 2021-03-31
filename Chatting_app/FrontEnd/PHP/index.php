<?php
$title = 'SIGNUP';
$style = './css/Style.css';
require_once "partials/header.php"; ?>
<div class="container">
    <div class="login-signup">
        <div class="login">
            <a href="login">
                <p>LOG IN</p>
                <div class="line"></div>
            </a>
        </div>
        <div class="signup">
            <p>SIGN UP</p>
            <div class="line"></div>
        </div>
    </div>
    <div class="inputs">
        <div class="field">
            <span>Names</span>
            <input type="text" placeholder="Names" />
        </div>
        <div class="field">
            <span>Email</span>
            <input type="text" placeholder="Email" />
        </div>
        <div class="field">
            <span>Phone</span>
            <input type="text" placeholder="Phone" />
        </div>
        <div class="field">
            <span>Gender</span>
            <select>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </select>
        </div>
        <div class="field">
            <span>Password</span>
            <input type="password" placeholder="Password" />
        </div>
        <div class="field">
            <span>Profile Picture</span>
            <input id="upload" type="button" value="UPLOAD" />
            <input id="upload-file" type="file" accept=".gif,.jpg,.jpeg,.png" />
        </div>
        <section>
            <input type="checkbox" value="accept" /> Accept terms and policy
        </section>
        <section class="submit">
            <a href="userpage"><button>SIGN UP</button></a>
            <p>Already have an account? <a href="login">Log in</a></p>
        </section>
    </div>
</div>
<script>
    let upload = document.querySelector('#upload');
    let upload_file = document.querySelector('#upload-file');
    upload.addEventListener('click', () => upload_file.click());
</script>
</body>

</html>