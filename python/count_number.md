# Count number

```
def countNumbers(numberList_):
    result = [0] * 10
    for n in numberList_:
        num = str(n)
        for s in num:
            result[int(s)] += 1
    return result

if __name__ == "__main__":
    numberList = [ i for i in range(100) ]
    numberCount = countNumbers(numberList)
    for n in range(10):
        print(str(n) + " : " + str(numberCount[n]))
```