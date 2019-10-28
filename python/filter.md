# Filter

```
def getFilteredFileList(filelist, filter):
    print ("getFilteredFileList")

    if len(filter) == 0:
        return filelist

    if filter[0] == '&':
        return getAndFilteredFileList(filelist, filter)

    filterList = []
    tmpFilterList = filter.split('|')

    for it in tmpFilterList:
        if len(it) == 0:
            continue
        filterList.append(it.lower())

    if len(filterList) == 0:
        return filelist

    filteredFile = []

    for f in filelist:
        fn = f.lower()
        for it in filterList:
            if it in fn:
                filteredFile.append(f)
                break
    
    return filteredFile


def getAndFilteredFileList(filelist, filter):
    print ("getAndFilteredFileList")

    if len(filter) == 0:
        return filelist

    filterList = []
    tmpFilterList = filter.split('&')
    print (tmpFilterList)
    for it in tmpFilterList:
        if len(it) == 0:
            continue
        filterList.append(it.lower())

    if len(filterList) == 0:
        return filelist

    filteredFile = []

    for f in filelist:
        fn = f.lower()
        isMatch = True
        for it in filterList:
            if it not in fn:
                isMatch = False
                break
        if isMatch:
            filteredFile.append(f)
    
    return filteredFile
```