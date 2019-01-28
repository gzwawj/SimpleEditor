## Mognodb数据库连接
#### 默认格式
```php
$m = new Mongo();
//这里采用默认连接本机的27017端口，当然也可以连接远程主机如  192.168.0.4:27017,如果端口是27017，端口可以省略。
```
#### 标准连接
```php
$m = new Mongo("mongodb://${username}:${password}@localhost");
```
实例：
```php
$m = new Mongo("mongodb://127.0.0.1:27017/admin:admin");
```
数据库的用户名和密码都是admin
## 数据库操作
#### 插入数据
```php
<?php
//这里采用默认连接本机的27017端口，当然你也可以连接远程主机如192.168.0.4:27017
//如果端口是27017，端口可以省略
$m = new Mongo("mongodb://127.0.0.1:27017/admin:admin");
//选择comedy数据库，如果以前没该数据库会自动创建，也可以用$m->selectDB("comedy");
$db = $m->comedy;
//选择comedy里面的collection集合，相当于RDBMS里面的表，也可以使用
$collection = $db->collection;
$db->selectCollection("collection");
/*********添加一个元素**************/
$obj = array("title" => "php1", "author" => "Bill Watterson");
//将$obj 添加到$collection 集合中
$collection->insert($obj);
/*********添加另一个元素**************/
$obj = array("title" => "huaibei", "online" => true);
$collection->insert($obj);
//$query = array("title" => "huaibei");
$query = array( "_id" => $obj['_id'] );
$cursor = $collection->find($query);
//遍历所有集合中的文档
foreach ($cursor as $obj) {
   echo $obj["title"] . "\n";
   echo $obj["_id"] . "\n";
}
//断开MongoDB连接
$m->close();
```
#### 带条件的查询
```text
mysql: id = 123
mongo: array(‘id’=>123)
mysql: name link ’%bar%’
mongo: array(‘name’ => new MongoRegex(‘/.*bar.*/i’))
mysql: where id > 10
mongo: array(‘id’ => array(‘$gt’ => 10))
mysql: where id >= 10
mongo: array(‘id’ => array(‘$gte’ => 10))
mysql: where id < 10
mongo: array(‘id’ => array(‘$lt’ => 10))
mysql: where id <= 10
mongo: array(‘id’ => array(‘$lte’ => 10))
mysql: where id > 1 and id < 10
mongo: array(‘id’ => array(‘$gt’ => 1,’$lt’ => 10))
mysql: where id <> 10
mongo: array(‘id’ => array(‘$ne’ => 10))
mysql: where id in(123)
mongo: array(‘id’ => array(‘$in’ => array(1,2,3)))
mysql: where id not in(123)
mongo: array(‘id’ => array(‘$nin’ => array(1,2,3)))
mysql: where id = 2 or id = 9
mongo: array(‘id’ => array(‘$or’ => array(array(‘id’=>2),array(‘id’=>9))))
mysql: order by name asc
mongo: array(‘sort’=>array(‘name’=>1))
mysql: order by name desc
mongo: array(‘sort’=>array(‘name’=>-1))
mysql: limit 0,2
mongo: array(‘limit’=>array(‘offset’=>0,’rows’=>2))
mysql: select name,email
mongo: array(‘name’,'email’)
mysql: select count(name)
mongo: array(‘COUNT’) //注意：COUNT为大写
```
查询时，每个Object插入时都会自动生成一个独特的_id,它相当于RDBMS中的主键，用于查询时非常方便 （_id每一都不同，很像自动增加的id）
```php
<?php
$param = array("name" => "joe");
$collection->insert($param);
$joe = $collection->findOne(array("_id" => $param['_id']));
print_R($joe);
$m->close();
```
返回结果：Array ( [_id] => MongoId Object ( [$id] => 4fd30e21870da83416000002 ) [name] => joe )
#### 更改字段值
```php
<?php
$sign = array("title" => 'php1');
$param = array("title" => 'php1','author'=>'test');
$joe = $collection->update($sign, $param);
```
#### 删除一个数据库
```php
$m -> dropDB(“comedy”);
```
#### 列出所有可用数据库
```php
$m->listDBs();   //无返回值
```


#### 创建一个MongoDB对象
```php
<?php
$mo = new Mongo();
$db = new MongoDB($mo,’dbname’);//通过创建方式获得一个MongoDB对象
```
#### 删除当前DB
```php
<?php
$db = $mo->dbname;
$db->drop();
```
#### 获得当前数据库名
```php
<?php
$db = $mo->dbname;
$db->_tostring();
```
#### 选择想要的collection:
```php
//A:
$mo = new Mongo();
$coll = $mo->dbname->collname;//获得一个collection对象
//B：
$db = $mo->selectDB(’dbname’);
$coll = $db->collname;
//C:
$db = $mo->dbname;
$coll = $db->collname;
//D:
$db = $mo->dbname;
$coll = $db->selectCollectoin(’collname’);//获得一个collection对象
```
#### 插入数据（MongoCollection对象
```php
$coll = $mo->db->foo;
$a = array(’a’=>’b’);
$options = array(’safe’=>true);
$rs  =$coll->insert($a,$options);
```
#### 删除数据库中的记录（MongoCollection对象）
```php
$coll = $mo->db->coll;
$c = array(’a’=>1,’s’=>array(’$lt’=>100));
$options = array(’safe’=>true);
$rs = $coll->remove($c,$options);
```
#### 更新数据库中的记录（MongoCollection对象）
```php
$coll = $mo->db->coll;
$c = array(’a’=>1,’s’=>array(’$lt’=>100));
$newobj = array(’e’=>’f’,’x’=>’y’);
$options = array(’safe’=>true,’multiple’=>true);
$rs = $coll->remove($c,$newobj,$options);
```
#### 查询collection获得单条记录（MongoCollection类）
```php
$coll = $mo->db->coll;
$query = array(’s’=>array(’$lt’=>100));
$fields = array(’a’=>true,’b’=>true);
$rs = $coll->findOne($query,$fields);
```
#### 查询collection获得多条记录（MongoCollection类）
```php
$coll = $mo->db->coll;
$query = array(’s’=>array(’$lt’=>100));
$fields = array(’a’=>true,’b’=>true);
$cursor = $coll->find($query,$fields);
//排序
$cursor->sort(array(‘字段’=>-1));(-1倒序，1正序)
//跳过部分记录
$cursor->skip(100);跳过100行
//只显示部分记录
$cursor->limit(100);只显示100行
返回一个游标记录对象MongoCursor。
```
#### 针对游标对象MongoCursor的操作(MongoCursor类)
```php
$cursor = $coll->find($query,$fields);
while($cursor->hasNext()){
$r = $cursor->getNext();
var_dump($r);
}
//或者
$cursor = $coll->find($query,$fields);
foreache($cursor as $k=>$v){
var_dump($v);
}
//或者
$cursor = $coll->find($query,$fields);
$array= iterator_to_array($cursor);
```






