# About box

```
def OnAbout(self, event):
    msg = 'Simeple GUI Template V0.1\nhttp://chobocho.com'
    title = 'About'
    wx.MessageBox(msg, title, wx.OK | wx.ICON_INFORMATION)
```