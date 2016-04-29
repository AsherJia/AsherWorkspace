# Yii framework里调用存储过程

$command = Yii::app()->db->createCommand('call myproc("yourname")');
$command->execute();


# RestfulAPI rules
```ruby
[
    'PUT,PATCH users/<id>' => 'user/update',
    'DELETE users/<id>' => 'user/delete',
    'GET,HEAD users/<id>' => 'user/view',
    'POST users' => 'user/create',
    'GET,HEAD users' => 'user/index',
    'users/<id>' => 'user/options',
    'users' => 'user/options',
]
```

* GET /users: List all users page by page;
* HEAD /users: Show the overview information of user listing;
* POST /user: Create a new user;
* GET /user/123: Return the detail of user 123;
* HEAD /user/123: Show the overview information of user 123;
* PATCH /user/123, PATCH /user/123: Update the user 123;
* DELETE /users/123: Delete the user 123;
* OPTIONS /users: Show the supported verbs regarding endpoint of /users;
* OPTIONS /users/123: Show the supported verbs regarding endpoint of /Users/123;

