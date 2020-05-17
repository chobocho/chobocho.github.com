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

## Font
```
# Monospaced font

# wx.FONTFAMILY_MODERN  
# wx.FONTFAMILY_TELETYPE

font = wx.Font(14, wx.FONTFAMILY_TELETYPE, wx.NORMAL, wx.NORMAL)

self.filename = wx.TextCtrl(self, style = wx.TE_PROCESS_ENTER, size=(WINDOW_SIZE-70,30))
self.filename.SetValue("")
self.filename.SetBackgroundColour(wx.Colour(255, 255, 204))
self.filename.SetFont(font)
```