# Json

### Write json to file

```
import json

sampleJson = {
    'name' : 'chenghe',
    'age' : 27,
    'salary' : 100000000
}

def saveAsJson(data, filename, jsonIndent=2):
    with open(filename, 'w') as jsonfile:
        json.dump(data, jsonfile, indent=jsonIndent)

def main():
    saveAsJson(sampleJson, "./person.json")

if __name__ == '__main__':
    main()
```