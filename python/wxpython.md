# wxPython

```
wx.TextCtrl(self, style = wx.TE_PROCESS_ENTER|wx.TE_MULTILINE, size=(640,480))
```

```
filterBox = wx.BoxSizer(wx.HORIZONTAL)

filterBox.Add(self.filterText, 1, wx.ALIGN_CENTRE|wx.ALL, 1)

# Add (self, window, proportion=0, flag=0, border=0, userData=None)
```

## Clipboard  
```
# Copy to clipboard

if wx.TheClipboard.Open():
    wx.TheClipboard.SetData(wx.TextDataObject(text)))
    wx.TheClipboard.Close()
```