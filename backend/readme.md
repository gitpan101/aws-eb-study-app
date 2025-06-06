## AWS Elastic Beanstalk tutorial Todo App project

### Notes

The frontend is create using **vite-react-typescript** and the frontend build folder output directory is set inside **backend/build** folder. Before deploying EB App make sure to build first from the frontend app.

### Setup AWS EB Configs

```sh
eb init
```

Use platform as Docker not Node.js

### Create AWS EB Application

```sh
eb create --single
```

`--single` flag to not use loadbalancer.

### Run Application

```sh
en open
```

### New Version Deployment

```sh
eb deploy
```

### Use below ngixn config if app is not working in browser

#### First check if nginx is active on instance or not

```sh
sudo systemctl status nginx
```

If not active then -

```sh
sudo systemctl start nginx
```

#### Setup SSH on ec2 instance if not setup

```sh
eb ssh --setup
```

#### Connect to ec2 instance

```sh
eb ssh
```

#### Update nginx config

```sh
sudo nano /etc/nginx/nginx.conf
```

Use below text -

```sh
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }

        location / {
                proxy_pass http://localhost:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
    }
}
```

#### Check nginx config

```sh
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl status nginx
```

Now it should work.
