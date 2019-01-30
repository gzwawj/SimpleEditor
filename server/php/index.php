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
/**
 * 文章列表
 */
function articleLst($model)
{
    $res = $model->getAllData('article');
    if ($res) {
        $data = array();
        foreach ($res as $k => $v) {
            $data[] = array(
                "title" => scapehtml($v['title']),
                "categories" => scapehtml($v['categories']),
                "keywords" => scapehtml($v['keywords']),
                "content" => scapehtml($v['content'])
            );
        }
        echo returnData(2001, '查询成功', $data);
    } else {
        echo returnData(2002, '查询错误');
    }
}
/**
 * 添加文章
 */
function articleAdd($model, $data)
{
    $ins_data = array(
        "title" => htmlscape($data['title']),
        "categories" => htmlscape($data['categories']),
        "keywords" => htmlscape($data['keywords']),
        "content" => htmlscape($data['content'])
    );
    $res = $model->add('article', $ins_data);
    if ($res) {
        echo returnData(2001, '添加成功');
    } else {
        echo returnData(2002, '添加失败');
    }
}
/**
 * 删除文章
 * 根据id进行删除
 */
function articleDel($model, $data)
{
    $where=array(
        'id'=>$data['id']
    );
    $res = $model->del('article', $where);
    if ($res) {
        echo returnData(2001, '删除成功');
    } else {
        echo returnData(2002, '删除失败');
    }
}
/**
 * 修改文章
 */
function articleEdit($model,  $data)
{
    $res = $model->edit('article', $where, $data);
    if ($res) {
        echo returnData(2001, '更新成功');
    } else {
        echo returnData(2002, '更新失败');
    }
}
/**
 * 查询指定文章
 */
function articleQuery($model, $where)
{
    $res = $model->getOneData('article', $where);
    if ($res) {
        echo returnData(2001, '查询成功');
    } else {
        echo returnData(2002, '查询失败');
    }
}
/**
 * html代码转义
 */
function htmlscape($data)
{
    return htmlspecialchars($data);
}
function scapehtml($data)
{
    return htmlspecialchars_decode($data);
}
/**
 * 返回数据格式
 * 2001=>成功
 * 2002=>错误
 */
function returnData($code, $msg, $data = array())
{
    $array = array(
        'code' => $code,
        'msg' => $msg,
        'data' => $data
    );
    return json_encode($array);
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
            articleLst($model);
        } elseif ($req['fun'] == 'add') {
            //添加数据
            articleAdd($model, $req);
        } elseif ($req['fun'] == 'del') {
            //删除
            articleDel($model,$req);
        } elseif ($req['fun'] == 'edit') {
            //修改
            articleEdit($model,$req);
        } elseif ($req['fun'] == 'query') {
            //查询
            articleQuery($model,$req);
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