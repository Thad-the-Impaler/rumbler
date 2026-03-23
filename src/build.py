#!/usr/bin/env python3
"""Build script: concatenates source files into index.html"""
import os

SRC_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SRC_DIR)
OUTPUT = os.path.join(ROOT_DIR, 'index.html')

# Source files in dependency order.
# During Phase 0, this is just all.js (the full monolith).
# As files are extracted, they replace sections of all.js.
SOURCE_FILES = [
    # Data (pure declarations, no logic dependencies)
    'data/assets.js',
    'data/difficulties.js',
    'data/levels.js',
    'data/characters.js',
    'data/assists.js',
    'data/attacks.js',
    'data/rumble-defs.js',
    'data/combos.js',
    # Remaining monolith (shrinks as more files are extracted)
    'all.js',
]

def build():
    # Read template (HTML head + opening <script> tag)
    with open(os.path.join(SRC_DIR, 'template.html'), 'r') as f:
        html = f.read()

    # Concatenate source files
    for src_file in SOURCE_FILES:
        path = os.path.join(SRC_DIR, src_file)
        with open(path, 'r') as f:
            html += f.read()

    # Close script and HTML
    html += '</script>\n</body>\n</html>\n'

    with open(OUTPUT, 'w') as f:
        f.write(html)

    print(f'Built {OUTPUT} ({len(html):,} bytes)')

if __name__ == '__main__':
    build()
