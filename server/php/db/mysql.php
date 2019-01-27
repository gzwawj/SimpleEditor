<?php

class mysql
{
    private $host = "127.0.0.1";
    private $name = "root";
    private $pwd = "root";
    private $port = "3306";
    private $dbname = "test";

    static private $conn = null;
    private $mysqli = null;

    private $field = "title,categories,keywords,content";
    /**
     * 防止直接创建对象
     */
    private function __construct()
    {
        $conn = new mysqli($this->host, $this->name, $this->pwd, $this->dbname);
         // 检测连接
        if ($conn->connect_error) {
            die("连接失败: " . $conn->connect_error);
        } else {
            $this->mysqli = $conn;
            return $conn;
        }
    }
    /**
     * 初始化类
     */
    static public function init()
    {
        if (!isset(self::$conn)) {
            self::$conn = new self();
        }
        return self::$conn;
    }
    /**
     * 获取所有数据
     */
    public function getAllData($table)
    {
        //查询语句
        $sql = "select id," . $this->field . " from " . $table;

        $result = $this->mysqli->query($sql);
        $data = array();
        while ($ros = $result->fetch_assoc()) {
            $data[] = $ros;
        }
        return $data;
    }
    /**
     * 获取一条数据
     */
    public function getOneData($table, $where)
    {
        $sql = "select id," . $this->field . " from " . $table . " where " . $where;
        $data = array();
        $result = $this->mysqli->query($sql);
        while ($ros = $result->fetch_assoc()) {
            $data[] = $ros;
        }
        return $data;
    }
    /**
     * 数据添加
     */
    public function add($table, $data)
    {
        $title = $data['title'];
        $categories = $data['categories'];
        $keywords = $data['keywords'];
        $content = $data['content'];

        $sql = "insert into " . $table . " (" . $this->field . ") values('{$title}','{$categories}','{$keywords}','{$content}')";
        var_dump($this->mysqli->query($sql));
        if ($this->mysqli->query($sql) === true) {
            return 1;
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

    }
    /**
     * 删除数据
     */
    public function del($table, $where)
    {
        $sql = "delete from " . $table . " where " . $where;
        if ($where) {
            if ($this->mysqli->query($sql) === true) {
                return 1;
            } else {
                echo "Error: " . $sql . "<br>" . $this->mysqli->error;
            }
        }
    }
    /**
     * 修改数据
     */
    public function edit($table, $where, $data)
    {
        $str = '';
        foreach ($data as $k => $v) {
            if ($v == "") {
                continue;
            }
            $str .= $k . "='{$v}',";
        }
        //去除多余的，号
        $str = substr($str, 0, -1);
        $sql = "update " . $table . " set " . $str . " where " . $where;

        if ($this->mysqli->query($sql) === true) {
            return 1;
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    /**
     * 防止用户复制对象
     */
    private function __clone()
    {

    }
}