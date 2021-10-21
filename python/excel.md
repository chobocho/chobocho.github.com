# Excel

### Load & Save as excel file

```
import os
import pandas as pd

class ExcelManager:
    def __init__(self):
        pass

    def load(self, filename=""):
        if len(filename) < 5:
            return []
        if not os.path.exists(filename):
            return []

        item_list_df = pd.read_excel(filename, engine='openpyxl')
        items = item_list_df.iloc[:, 0].items()
        item_list = []
        for item in items:
            item_list.append(item[1])

        return item_list

    def save(self, data, filename="result.xlsx"):
        print("Save to ", filename)
        df = pd.DataFrame(data)
        df.to_excel(filename)


if __name__ == '__main__':
    excelManager = ExcelManager()
```