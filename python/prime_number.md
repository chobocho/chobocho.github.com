# 소인수 분해

```
import math

def get_prime_factor(number):
    result = []

    if number < 2:
        return result

    while number % 2 == 0:
        result.append('2')
        number /= 2

    for i in range (3, int(math.sqrt(number)) + 1, 2):
        if number % i == 0:
            result.append(str(i))
            number /= i

    if number > 2:
        result.append(str(int(number)))

    return result

def testPrimeFactor():
    assert len(get_prime_factor(-1)) == 0
    assert "2x2x3" == 'x'.join(get_prime_factor(12))
    assert "2x2x5x5" == 'x'.join(get_prime_factor(100))
    assert "67x337x2797x14251" == 'x'.join(get_prime_factor(900000001213))
```