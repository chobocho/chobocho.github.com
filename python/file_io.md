## 파일 읽기 예제
```
def readfile(filename):
    with open(filename, "rt", encoding="UTF-8",  errors="surrogatepass") as targetFile:
        for line in targetFile:
            print(line)
```
