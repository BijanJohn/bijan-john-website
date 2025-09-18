#!/usr/bin/env bash
set -euo pipefail

IN_DIR="../static/media"
OUT_DIR="../static/videos"    # served at /videos/...

mkdir -p "$OUT_DIR"

for f in "$IN_DIR"/*; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  name="${base%.*}"

  echo "Processing: $base"

  # 1) H.264 MP4 (widely supported)
  ffmpeg -y -i "$f" -vf "scale=960:-2:flags=lanczos,fps=24" \
    -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p \
    -movflags +faststart -an "$OUT_DIR/$name.mp4"

  # 2) VP9 WebM (great compression)
  ffmpeg -y -i "$f" -vf "scale=960:-2:flags=lanczos,fps=24" \
    -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -tile-columns 1 -an \
    "$OUT_DIR/$name.webm"

  # 3) Poster frame (first frame)
  ffmpeg -y -i "$f" -vf "scale=960:-2:flags=lanczos" -vframes 1 "$OUT_DIR/$name.jpg"
done

echo "Done. Files in $OUT_DIR"