<?php    
    $code = $_GET["code"];
     //  启动 Session
    session_start();
    $_SESSION["code"] = $code;

?>
