<?php
//定义当前文件的路径常量
define('DIR', dirname(__FILE__));
//自动加载文件
function __autoload($className)
{
    $fileName = str_replace('\\', DIRECTORY_SEPARATOR, DIR . '\\db\\' . $className) . '.php';
    if (is_file($fileName)) {
        require $fileName;
    } else {
        echo $fileName . ' is not exist';
        die;
    }
}
function articleAdd($model, $data)
{
    $ins_data=array(
        "title"=>$data['title'],
        "categories"=>$data['categories'],
        "keywords"=>$data['keywords'],
        "content"=>htmlspecialchars($data['content'])
    );
    $res=$model->add('article',$ins_data);
    if($res){
        echo json_encode('添加成功');
    }else{
        echo json_encode('添加失败'); 
    }
}

try {
    $req = $_REQUEST;
    if ($req) {
        //实例化数据库
        if ($req['db'] == 'mysql') {
            $model = MysqlModel::init('article');
        } elseif ($req['db'] == 'mongodb') {
            $model = MongodbModel::init('article');
        }
        //执行方法
        if ($req['fun'] == 'lst') {
            //获取列表
            echo json_encode('adsf');//测试数据
        } elseif ($req['fun'] == 'add') {
            //添加数据
            articleAdd($model,$req);
        } elseif ($req['fun'] == 'del') {
            //删除

        } elseif ($req['fun'] == 'edit') {
            //修改

        } elseif ($req['fun'] == 'query') {
            //查询

        }
        //markdown文件内容
        if ($req['fun'] == 'mdfile') {
            $data = file_get_contents($_FILES['md']['tmp_name']);
            echo json_encode($data);
        }
    } else {
        echo '请求错误！';
    }
} catch (Exception $exception) {
    echo $exception->getMessage();
}