# Docker Multi Container Example

도커를 이용해서 frontend 서버와 backend 서버, mongodb database 서버를 구축하는 예제입니다.

## Network

콘테이너끼리 통신할 수 있도록 네트워크를 먼저 생성한다.\
여기서는 `example-network`이라는 이름으로 생성한다.

```
docker network create example-network
```

## Frontend

### 이미지 생성

`./frontend` 에 있는 Dockerfile을 참고해서 `frontend-image`라는 이미지를 빌드한다.

```
docker build -t frontend-image ./frontend
```

### 콘테이너 실행

```
docker run --rm -d -p 3000:3000 --name frontend-app frontend-image
```

## Backend

### 이미지 생성

`./backend` 에 있는 Dockerfile을 참고해서 `backend-image`라는 이미지를 빌드한다.

```
docker build -t backend-image ./backend
```

### 콘테이너 실행

frontend에서 기본 포트(80)로 요청이 들어오기 때문에 80 포트를 설정하고\
mongodb database와 연결하기 위해 동일한 network를 설정한다.

```
docker run --rm -d -p 80:80 --network example-network --name backend-app backend-image
```

## Mongodb Database

### 콘테이너 실행

official 이미지인 `mongo`를 이용한다.\
코드를 보면 backend에서 mongodb에 접속시 `mongodb-app`이라는 이름을 사용한다.

```
docker run --rm -d --network example-network --name mongodb-app mongo
```
