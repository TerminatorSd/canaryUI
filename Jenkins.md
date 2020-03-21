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

### 创建Jenkins任务
在创建Jenkins任务之前我们先梳理一下要达到灰度发布的目标需要哪几个任务，以及每个任务负责完成什么事情。灰度发布一般遵循这样的流程（假设我们有AB两台服务器用于提供生产环境的服务，我们称之为AB边）：
（1）新代码部署到A边
（2）符合灰度策略的小部分流量切到A边，剩余大部分流量仍去往B边
（3）手动验证A边功能是否正常可用
（4）验证无误后，大部分流量转到A边，灰度流量去往B边
（5）手动验证B边功能是否正常可用
（6）验证无误后，流量像往常一样均分到AB边

#### 任务拆解
通过上述的拆解，我们得出灰度发布的6个步骤，其中（3）和（5）是需要手动验证的环节，所以我们以这两个任务为分割点，建立三个Jenkins 任务（Jenkins 任务建立在A 边机器上）如下：
（1）灰度测试A，这个任务又包含两个部分，更新A边的代码，然后修改流量分发策略使得灰度流量到达A，其他流量到达B
（2）上线A灰度测试B，更新B边代码，灰度流量达到B，其他流量到达A
（3）上线B，所有流量均分到AB

![jenkins-create](./img/jenkins-create.jpg)

#### 创建任务
先按照任务拆解部分的设定创建三个FreeStyle 类型的Jenkins 任务。任务详情信息可以不填，直接保存就好，下一步我们再来配置每个任务的具体信息。
![jenkins-free](./img/jenkins-free.jpg)

#### 配置任务
现在已经创建好了三个任务，先点击进入每一个任务进行一次空的构建（否则后面可能导致修改后的构建任务无法启动），然后我们来对每个任务进行信息的配置。

![jenkins-task-ok](./img/jenkins-task-ok.jpg)

首先是灰度测试A
![jenkins-a](./img/jenkins-a.jpg)

灰度测试A要做的事情是下载最新代码到Jenkins 所在的服务器，然后修改流量分发策略（A 边机器的Nginx 配置），使得灰度流量访问A 边的最新代码，其余流量访问B 边的代码。

现代前端项目都要进行构建打包这一步。但是廉价的1核2G的云服务器在完成构建方面有些力不从心，CPU 经常爆表。**所以我们在这里把打包出得出的生产包纳入git 管理，每次的代码更新会同步最新的生产包到github，因此Jenkins 任务把生产包拉下来，放在指定位置即可完成一次新代码的部署。**

讲到这里，灰度测试A 的任务内容也基本讲清楚了，开始对任务进行配置，首先要关联该任务到远程的github 仓库让它知道可以去哪里拉取最新代码。

![jenkins-no-git](./img/jenkins-no-git.jpg)

执行一次构建任务（第一次构建，在git fetch 那一步可能会耗费比较久的时间），然后点击本次构建进去查看Console 输出，可以确定执行Jenkins 任务的位置是位于服务器上的/var/lib/jenkins/workspace/your_task_name。

![jenkins-build](./img/jenkins-build.jpg)

![jenkins-loc](./img/jenkins-loc.jpg)

继续编辑灰度测试A 任务，添加build shell，也就是每次任务执行时要执行的命令
```
git pull
scp -r dist /var/canaryDemo
```

![jenkins-shell](./img/jenkins-shell.jpg)


### 可能问题
Jenkins版本和Java版本不匹配，会导致一下问题，无法登录，解决方法按上面说的寻找匹配版本
![jenkins-error](./img/jenkins-error.jpg)