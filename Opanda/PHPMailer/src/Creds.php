
<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

class SendMailv2
{

    // Static variable and static function 
    // using static keyword 


    public static function mailv2($from, $to, $subject, $body)
    {
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->CharSet = "UTF-8";
        $mail->SMTPSecure = 'tls';
        //$mail->SMTPDebug = 2;
        $mail->Host = 'smtp.ipage.com';
        $mail->Port = 587;
        $mail->Username = 'sender@ogeniuspriority.com';
        $mail->Password = '@Panda_2019';
        $mail->SMTPAuth = true;

        //$mail->Host = 'smtp.gmail.com';
        //$mail->Port = 587;
        //$mail->Username = 'ogeniusbusiness@gmail.com';
        //$mail->Password = '@Panda_2019';
        //$mail->SMTPAuth = true;

        $mail->From = $from;
        $mail->FromName = 'OPANDA';
        $allMailso = explode(",", $to);
        foreach ($allMailso as $tom) {
            $mail->AddAddress($tom);
        }

        $mail->AddReplyTo('help@ogeniuspriority.com', 'OGENIUS PANDA');

        $mail->IsHTML(true);
        $mail->Subject    = $subject;
        $mail->AltBody    = "To view the message, please use an HTML compatible email viewer!";
        $mail->Body    = $body;

        if (!$mail->Send()) {
            return false;
        } else {
            return true;
        }
    }
    public static function sendSms($numbers, $message)
    {

        // send sms
        # Our new data
        $emailOrPhone_Data_local = $numbers;

        $msg = $message;
        $from = "OPANDA";
        $datas = array(
            'recipient' => $emailOrPhone_Data_local,
            'message' => $msg,
            "from"  => $from
        );
        // echo $emailOrPhone_Data_local;

        # Create a connection
        $url = 'https://smsboolax.herokuapp.com/sendSms';
        $ch = curl_init($url);
        # Form data string
        $postString = http_build_query($datas, '', '&');
        # Setting our options
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        # Get the response
        $response = curl_exec($ch);
        echo $response;
    }
}
