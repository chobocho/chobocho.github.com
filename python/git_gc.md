#### [Home](../index.md)  
---

# [Python] Git 폴더 최적화  

```
import os

def main():
   folder_list = next(os.walk('.'))[1]
   for folder in folder_list:
       message = "git -C " + folder + " rev-list --count master"
       print(message)
       os.system(message)
       message = "git -C " + folder + " gc --prune=now --aggressive"
       print(message)
       os.system(message)

   
if __name__ == '__main__':
    main()
```
---
#### [Home](../index.md)  
