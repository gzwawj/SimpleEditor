<?php

class Mongodb
{
    static private $conn = null;
    private $mongodb = null;


    private function __construct()
    {
        $conn = new MongoClient();
        $mongodb = $conn->test;
        return $mongodb;
    }
    /**
     * 初始化
     */
    static public function init()
    {
        if (!isset(self::$conn)) {
            self::$conn = new self();
        }
        return self::$conn;
    }
    public function getAllData()
    {

    }
    public function getOneData()
    {

    }
    /**
     * 添加数据
     */
    public function add()
    {

    }
    /**
     * 删除数据
     */
    public function del()
    {

    }
    /**
     * 修改数据
     */
    public function edit()
    {

    }

    /**
     * 防止用户复制对象
     */
    private function __clone()
    {

    }

}