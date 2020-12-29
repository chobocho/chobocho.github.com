#### [Home](../index.md)  
---

# Awk

> awk 'pattern {action}'

> awk '{ print }' ./file.txt  
> → file.txt의 모든 내용 출력

```
$0 : 현재 줄 전체
$1 : 현재 줄 1번째 단어
$2 : 현재 줄 2번째 단어
```
> awk '/CHO/' ./file.txt   
> → CHO 포함하는 줄만 출력

```
length($0) 
-> 줄 길이

NR == 2 
-> 2번째 줄
```
---
#### [Home](../index.md)  