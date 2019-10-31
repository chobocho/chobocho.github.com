# Make folder

```
package main

import (
   "fmt"
   "os"
   "log"
)

func main() {
    dir, err := os.Getwd()
    if err != nil {
        log.Fatal(err)
    }
    makeDir(dir, "", 2020, 2025)
}

func makeDir(curDir, newName string, from, to int) {
    fmt.Println(curDir)

    for i := from; i <= to; i++ {
        newFolder := fmt.Sprintf("%s/%s%d", curDir, newName, i)

        err := os.MkdirAll(newFolder, os.ModePerm)
        if err != nil {
           log.Fatal("MakeAll %s %s", err, newFolder)
        }
    }
}
```