1、云服务器，相关端口开放  ✅

2、服务器安装jenkins，记得要安装相应的插件  ✅

3、github新建一个项目，与jenkins打通代码提交即发布  ✅

4、服务器配置nginx，nginx包含几项内容
* nginx负载均衡，转发到同一台服务器的两个接口  ✅
* 灰度规则，及流量符合什么条件的情况下判定为灰度（比如说特定账号的访问）
* 至少两台灰度机器，或者同一台机器的不同端口

5、如何实现灰度操作
* 一般流程，灰度测试A、灰度测试B
* 通过更改nginx配置文件实现上述流程
* 【Q】如何配置复杂的灰度规则

6、其他问题
* 【Q】如何用代码调用jenkins任务执行
curl -X POST http://39.108.163.91:6066/job/firstTry/build?delay=0sec --user jenkins:aeb03087284b4d5d867ac340f29b0f5a

```
【Q】：Error 403 No valid crumb was included in the request
【A】
curl -X GET http://39.108.163.91:6066/crumbIssuer/api/json --user jenkins:aeb03087284b4d5d867ac340f29b0f5a
curl -X POST http://39.108.163.91:6066/job/firstTry/build?delay=0sec --user jenkins:aeb03087284b4d5d867ac340f29b0f5a --header "Jenkins-Crumb:ccfee3ce2edab78ebebe4c4578320673ee18bb71fd2ec60083ab857bb692c643”
【A】：安装Strict Crumb Issuer Plugin插件，暂时关掉sessionId
```




# 正常
map $COOKIE_canary $group {
    # canary account
    ~*aaa$ server_canary;
    default server_default;
}

upstream server_canary {
    server 127.0.0.1:6002 weight=1 max_fails=1 fail_timeout=30s;
    server 127.0.0.1:6004 weight=1 max_fails=1 fail_timeout=30s;
}

upstream server_default {
    server 127.0.0.1:6002 weight=1 max_fails=1 fail_timeout=30s;
    server 127.0.0.1:6004 weight=1 max_fails=1 fail_timeout=30s;
}

\# 灰度A
map $COOKIE_canary $group {
    # canary account
    ~*aaa$ server_canary;
    default server_default;
}

upstream server_canary {
    server 127.0.0.1:6002 weight=1 max_fails=1 fail_timeout=30s;
    # server 127.0.0.1:6004 weight=1 max_fails=1 fail_timeout=30s;
}

upstream server_default {
    # server 127.0.0.1:6002 weight=1 max_fails=1 fail_timeout=30s;
    server 127.0.0.1:6004 weight=1 max_fails=1 fail_timeout=30s;
}

\# 灰度B
map $COOKIE_canary $group {
    # canary account
    ~*aaa$ server_canary;
    default server_default;
}

upstream server_canary {
    # server 127.0.0.1:6002 weight=1 max_fails=1 fail_timeout=30s;
    server 127.0.0.1:6004 weight=1 max_fails=1 fail_timeout=30s;
}

upstream server_default {
    server 127.0.0.1:6002 weight=1 max_fails=1 fail_timeout=30s;
    # server 127.0.0.1:6004 weight=1 max_fails=1 fail_timeout=30s;
}

Q: Invalid Host header
A: https://blog.csdn.net/qq_36451496/article/details/99712925

Q: /etc/profile.d/lang.sh: line 19: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory

Ng serve --host 0.0.0.0 --port 6002
