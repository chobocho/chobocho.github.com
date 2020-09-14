# fisher-yates shuffle   

```
import random

number = [1, 2, 3, 4, 5, 7, 8]

def shuffle(number):
   for i in range (len(number)-1, 0, -1):
       j = random.randint(0, i)
       number[j], number[i] = number[i], number[j]
    
soshufflert(number)
```

# result
```
[1, 2, 3, 4, 5, 7, 8]
[1, 8, 3, 4, 5, 7, 2]
[1, 8, 3, 4, 5, 7, 2]
[1, 8, 3, 4, 5, 7, 2]
[1, 8, 3, 4, 5, 7, 2]
[3, 8, 1, 4, 5, 7, 2]
[3, 8, 1, 4, 5, 7, 2]
```