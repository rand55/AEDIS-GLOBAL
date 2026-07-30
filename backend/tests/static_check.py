from __future__ import annotations

import ast
from pathlib import Path

root = Path("/app")
files = sorted(path for path in root.rglob("*.py") if "__pycache__" not in path.parts)
for path in files:
    ast.parse(path.read_text(encoding="utf-8"), filename=str(path))
print(f"Parsed {len(files)} Python files without syntax errors.")
