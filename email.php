<?php

## CONFIG ##

# LIST EMAIL ADDRESS
$recipient = "a.modaressanavi@ucc.on.ca";

# SUBJECT (Subscribe/Remove)
$subject = "Subscribe form";

# RESULT PAGE
$location = "index.html";
header( "Location: $location" );
## FORM VALUES ##

# SENDER - WE ALSO USE THE RECIPIENT AS SENDER IN THIS SAMPLE
# DON'T INCLUDE UNFILTERED USER INPUT IN THE MAIL HEADER!
$sender = $recipient;

# MAIL BODY
$body .= "Email: ".$_REQUEST['Email']." \n";
# add more fields here if required

## SEND MESSGAE ##

mail( $recipient, $subject, $body, "From: $sender" ) or die ("Mail could not be sent.");

## SHOW RESULT PAGE ##


?>
