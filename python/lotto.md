# Lotto

```
import random

def getLotto():
    lottoNumbers = random.sample(range(1,46), 6)
    return sorted(lottoNumbers)

if __name__ == "__main__":
    print (getLotto())
```