#### [Home](../index.md)  
---
# LFSR  

```
num = {}
for i in range(16):
    if i < 10:
        num[i] = str(i)
    else:
        num[i] = chr(ord('a') + i - 10)
    

for j in range(1, 16):
    rnd_value = 1
    result = []
    for i in range(30):
        result.append(rnd_value)
        xor = rnd_value & 1
        rnd_value >>= 1
        if xor == 1:
            rnd_value ^= j
    print(num[j], list(set(result)))
```

~~~
1 [1]
2 [1, 2]
3 [1, 2, 3]
4 [1, 2, 4]
5 [1, 2, 3, 4, 5, 6, 7]
6 [1, 2, 3, 4, 5, 6, 7]
7 [1, 2, 4, 7]
8 [8, 1, 2, 4]
9 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
a [1, 2, 4, 5, 8, 10]
b [1, 2, 4, 7, 8, 11, 14]
c [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
d [1, 2, 4, 8, 11, 13]
e [1, 2, 4, 7, 8, 13, 14]
f [1, 2, 4, 8, 15]
~~~

---
#### [Home](../index.md)  