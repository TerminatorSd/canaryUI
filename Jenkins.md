#### 安装Jenkins
jenkins稳定版本list：http://pkg.jenkins-ci.org/redhat-stable/
```
// 科学上网会快一些，记得留意网站上java和jenkins版本匹配信息，别下错了
wget http://pkg.jenkins-ci.org/redhat-stable/jenkins-2.204.5-1.1.noarch.rpm
rpm -ivh jenkins-2.7.3-1.1.noarch.rpm
```

修改jenkins端口，不冲突可不修改
```
vi /etc/sysconfig/jenkins
```

启动jenkins
```
service jenkins start/stop/restart
// 密码位置
/var/lib/jenkins/secrets/initialAdminPassword
```

##### 可能问题
jenkins版本和java版本不匹配，会导致一下问题，无法登录，解决方法按上面说的寻找匹配版本
![jenkins-error](./img/jenkins-error.jpg)