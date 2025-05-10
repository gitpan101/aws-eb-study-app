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
