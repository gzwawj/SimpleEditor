<?php
//定义当前文件的路径常量
define('DIR', dirname(__FILE__));
//自动加载文件
function __autoload($className){
    $fileName=str_replace('\\', DIRECTORY_SEPARATOR, DIR . '\\db\\'. $className).'.php';
    if(is_file($fileName)){
        require  $fileName;
    }else{
        echo $fileName.' is not exist';die;
    }
}


if($_FILES){
    $data= file_get_contents($_FILES['md']['tmp_name']);
    echo htmlspecialchars($data);
}


$model=mysql::init();
$model->getAllData();