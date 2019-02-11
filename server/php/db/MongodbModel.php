<?php

class MongodbModel
{
    static private $conn = null;
    private $mongodb = null;

    private function __construct($db)
    {
        $conn = new MongoClient();
        $this->mongodb = $conn->$db;
        return $conn->$db;
    }
    /**
     * 初始化
     */
    static public function init($db)
    {
        if (!isset(self::$conn)) {
            self::$conn = new self($db);
        }
        return self::$conn;
    }
    /**
     * 获取所有数据
     */
    public function getAllData($table)
    {
        $res = $this->mongodb->$table->find();
        $data = array();
        foreach ($res as $k => $v) {
            $data[$k] = $v;
            $data[$k]['id']=(string) $v['_id'];//类型强制转换
        }
        return $data;
    }
    /**
     * 获取一条数据
     */
    public function getOneData($table, $where = array())
    {
        $where_q=array(
            '_id'=>new MongoId($where['id'])
        );
        $res = $this->mongodb->$table->find($where_q);
        $data = array();
        foreach ($res as $k => $v) {
            $data[$k] = $v;
            $data[$k]['id']=(string) $v['_id'];//类型强制转换
        }
        return $data;
    }
    /**
     * 添加数据
     */
    public function add($table, $data)
    {
        $ins_data = array(
            "title" => $data['title'],
            "categories" => $data['categories'],
            "keywords" => $data['keywords'],
            "content" => $data['content']
        );

        $res = $this->mongodb->$table->insert($ins_data);
        //返回执行结果
        if ($res) {
            return 1;
        } else {
            return 0;
        }
    }
    /**
     * 删除数据
     */
    public function del($table, $where = array())
    {
        $where_d=array(
            '_id'=>new MongoId($where['id'])
        );
        $res = $this->mongodb->$table->remove($where_d, array('justOne' => true));

        //返回执行结果
        if ($res) {
            return 1;
        } else {
            return 0;
        }
    }
    /**
     * 修改数据
     */
    public function edit($table, $where = array(), $data = array())
    {
        $where_e=array(
            '_id'=>new MongoId($where['id'])
        );
        $res = $this->mongodb->$table->update($where_e, array('$set' => $data));
        
        //返回执行结果
        if ($res) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * 防止用户复制对象
     */
    private function __clone()
    {

    }

}