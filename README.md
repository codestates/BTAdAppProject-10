# BTAdAppProject-10

## Project 소개

> 추후 작성 예정

## Getting Stared

### 프로젝트 클론

```shell
git clone https://github.com/codestates/BTAdAppProject-10.git
```

### 의존성 설치

```shell
# client쪽 package.json에 있는 module들 설치
cd client && npm install

# truffle folder로 이동 후 smart contract 관련 module 설치
cd ../truffle && npm install
```

### Ganache 실행

> 개발을 위해 [truffle 설정 파일](https://github.com/codestates/BTAdAppProject-10/blob/main/truffle/truffle-config.js)에
> 로컬 RPC Server는 http://127.0.0.1:7545, network id는 5777로 세팅해 두었습니다.

### Metamask에서 account import

* 학습 자료 참고

### client web dev server 실행

```shell
cd client && npm start
```

## Branch 전략

> 아래 이미지와 같이 main branch로부터 feature 브랜치를 따서 작업한 뒤  
> main branch로 Pull Request를 날린 후 merge하는 방식을 따릅니다.


![image](docs/github-flow.png)

## Team Members

| 이름  | Github ID                                 |
|-----|-------------------------------------------|
| 노승남 | [samrho](https://github.com/samrho)       |
| 박효근 | [hyogeunn](https://github.com/hyogeunn)   |
| 윤종승 | [beetles86](https://github.com/beetles86) |

## References

* [Truffle + react box](https://trufflesuite.com/boxes/)