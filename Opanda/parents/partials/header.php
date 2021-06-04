<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $title ?></title>

    <link rel="stylesheet" href="../../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha512-xA6Hp6oezhjd6LiLZynuukm80f8BoZ3OpcEYaqKoCV3HKQDrYjDE1Gu8ocxgxoXmwmSzM4iqPvCsOkQNiu41GA==" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/css/select2.min.css">
    <link rel="stylesheet" href="<?php echo $style ?>" />
</head>

<body>
    <div class="d-flex flex-column justify-content-center w-100 align-items-center my-3 mx-auto">
        <div class="d-flex first rounded w-sm-75 px-3 py-2 justify-content-around">
            <span>Welcome to Ogenius Panda Parent Dashboard, Mr/Ms Eric</span>
            <a href="#" class="text-decoration-none ml-5">log out</a>
        </div>
        <p class="header btn rounded px-4 py-2 m-2" data-toggle="modal" data-target="#exampleModal">My Children</p>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Link child</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Student’s O’Genius Panda ID</label>
                        <input id="refId" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="O’Genius Panda Student’s ID of the child you want to link">
                        <p id="link_message" class="p-1"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button id="linkBtn" type="button" class="btn btn-primary">Link child</button>
                </div>
            </div>
        </div>
    </div>