# Background music

Drop the wedding song here as:

```
public/audio/wedding-song.mp3
```

That exact filename is what the site plays (see `components/music-player.tsx`,
constant `SRC`). Until the file exists, the floating music button stays hidden —
no dead control.

Notes
- **Format:** MP3 is safest (universal browser support). If you have m4a/wav,
  convert it to mp3, or ask and I'll convert + wire it up.
- **Size:** keep it reasonable (a 3–5 MB clip is fine). The player uses
  `preload="metadata"`, so the audio streams on play rather than downloading up
  front.
- **Behavior:** starts on the visitor's first tap/click/scroll (browsers block
  autoplay-with-sound until then), loops, and can be toggled with the button.
  Volume defaults to 55%.
- **Licensing:** make sure you have the right to use the track on a public site.
