## 3초마다 특정 작업을 반복 수행하는 코드  
```
import threading
import time
 
def intervalTimer():
    print("intervalTimer " + str(time.time()))
    threading.Timer(3, intervalTimer).start()

if __name__ == '__main__':
    intervalTimer()
```
