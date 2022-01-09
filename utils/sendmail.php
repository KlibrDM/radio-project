<?php

header('Access-Control-Allow-Origin: *');

if(isset($_POST['action']) && !empty($_POST['action'])) {
	$data = $_POST['action'];
	$decoded = json_decode($data);
	$action = $decoded->{'atype'};
	switch($action) {
		case 'sendmail': sendmail($decoded); break;
	}
}

function sendmail($data){
	$to = $data->{'to'};
	$from = $data->{'from'};
	$name = $data->{'name'};
	$subject = $data->{'subject'};
	$message = $data->{'message'};
	$headers = 'From: proiectpiu@gmail.com';
	$headers = 'Reply-To: proiectpiu@gmail.com';
	$headers = 'MIME-Version: 1.0\r\n';
	$headers = 'Content-Type: text/html; charset=UTF-8\r\n';
    $emailcontent .= '<div style="background-color:#f5b942; padding: 20px;"><p style="font-size: 24px; color: white;">'.$subject.'</p></div>';
    $emailcontent .= '<div style="border: 1px solid lightgray; padding: 20px;">';
    $emailcontent .= '<p style="font-size: 20px;">De la: '.$name.'</p>';
    $emailcontent .= '<p style="font-size: 20px;">E-mail: '.$from.'</p>';
    $emailcontent .= '<p style="font-size: 16px;">Mesaj: '.$message.'</p>';
    $emailcontent .= '</div>';

	mail($to,$subject,$emailcontent,$headers);
	$returnmsg = 'Email sent to '.$to;
	echo $returnmsg;
}

?>
