## 安装Jenkins
第一次接触Jenkins 可能会有很多疑问，Jenkins 是什么？能完成什么事情？我为什么要使用Jenkins 等诸如此类。很难讲清楚Jenkins 是什么东西，所以这里简单介绍一下Jenkins 可以做什么。简单来讲，你在任何一台服务器上进行的任何操作命令，Jenkins 都可以帮你完成，只要你提前在Jenkins上创建好任务，指定任务内容和触发时机，比如定时触发或者在特定的情况下触发。
### 安装
Jenkins稳定版本list：http://pkg.jenkins-ci.org/redhat-stable/
```
// 科学上网会快一些，记得留意网站上java和jenkins版本匹配信息，别下错了
wget http://pkg.jenkins-ci.org/redhat-stable/jenkins-2.204.5-1.1.noarch.rpm
rpm -ivh jenkins-2.7.3-1.1.noarch.rpm
```

修改Jenkins端口，不冲突可不修改
```
// line 56 JENKINS_PORT
vi /etc/sysconfig/jenkins
```
#### 启动
启动jenkins
```
service jenkins start/stop/restart
// 密码位置
/var/lib/jenkins/secrets/initialAdminPassword
```
#### 访问
访问服务器的8080端口，输入从上述位置获取的密码，点击继续
![jenkins-login](./img/jenkins-login.jpg)

创建一个账户然后登录
![jenkins-account](./img/jenkins-account.jpg)

开始使用Jenkins
![jenkins-start](./img/jenkins-start.jpg)


### 可能问题
Jenkins版本和Java版本不匹配，会导致一下问题，无法登录，解决方法按上面说的寻找匹配版本
![jenkins-error](./img/jenkins-error.jpg)