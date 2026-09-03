#!/usr/bin/env python3
"""Generate the resume PDF from resume.html using headless Chrome."""

from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "resume.html"
OUT = ROOT / "Jorge_Ruiz_Software_Developer_Resume.pdf"
ARTIFACT = Path("/opt/cursor/artifacts/Jorge_Ruiz_Software_Developer_Resume.pdf")


def main() -> None:
    chrome = shutil.which("google-chrome") or shutil.which("chromium") or shutil.which("chromium-browser")
    if not chrome:
        raise SystemExit("Chrome/Chromium not found")

    with tempfile.TemporaryDirectory(prefix="chrome-resume-") as tmp:
        cmd = [
            chrome,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            f"--user-data-dir={tmp}",
            "--no-pdf-header-footer",
            f"--print-to-pdf={OUT}",
            HTML.as_uri(),
        ]
        # Chrome sometimes hangs after writing the PDF; treat a written file as success.
        try:
            subprocess.run(cmd, check=False, timeout=45)
        except subprocess.TimeoutExpired:
            pass
    if not OUT.exists() or OUT.stat().st_size < 1000:
        raise SystemExit(f"PDF was not generated: {OUT}")
    ARTIFACT.parent.mkdir(parents=True, exist_ok=True)
    ARTIFACT.write_bytes(OUT.read_bytes())
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
    print(f"Copied to {ARTIFACT}")


if __name__ == "__main__":
    main()
