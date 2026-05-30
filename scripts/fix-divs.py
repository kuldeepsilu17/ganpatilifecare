import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1] / "src"

REPLACEMENTS = [
    ('<motion.div className="mt-10', '<div className="mt-10'),
    ('<motion.div className="relative aspect', '<motion.div className="relative aspect'),
    ('<motion.div className="relative aspect', '<div className="relative aspect'),
    ('<motion.div className="flex flex-1', '<motion.div className="flex flex-1'),
    ('<motion.div className="flex flex-1', '<div className="flex flex-1'),
    (
        '<motion.div className="relative mx-auto flex max-w-7xl flex-col items-center',
        '<div className="relative mx-auto flex max-w-7xl flex-col items-center',
    ),
    ('        </motion.div>\n\n        <ul', '        </div>\n\n        <ul'),
    (
        '                </motion.div>\n                <motion.div className="flex flex-1',
        '                </div>\n                <div className="flex flex-1',
    ),
    ('                </motion.div>\n              </motion.li>', '                </motion.div>\n              </motion.li>'),
    ('                </motion.div>\n              </motion.li>', '                </div>\n              </motion.li>'),
    ('      </motion.div>\n    </section>', '      </div>\n    </section>'),
]

# Build replacements without accidental same strings - use chr to build tags
o = "<"
c = "/"
m = "motion."
d = "div"
mo_open = o + m + d
div_open = o + d
mo_close = o + c + m + d + ">"
motion_close = o + c + m + d + ">"
motion_close = o + c + m + d + ">"
div_close = o + c + d + ">"

REPLACEMENTS = [
    (mo_open + ' className="mt-10', div_open + ' className="mt-10'),
    (mo_open + ' className="relative aspect', div_open + ' className="relative aspect'),
    (mo_open + ' className="flex flex-1', div_open + ' className="flex flex-1'),
    (
        mo_open + ' className="relative mx-auto flex max-w-7xl flex-col items-center',
        div_open + ' className="relative mx-auto flex max-w-7xl flex-col items-center',
    ),
    ("        " + motion_close + "\n\n        <ul", "        " + div_close + "\n\n        <ul"),
    (
        "                " + motion_close + "\n                " + mo_open + ' className="flex flex-1',
        "                " + div_close + "\n                " + div_open + ' className="flex flex-1',
    ),
    ("                " + motion_close + "\n              </motion.li>", "                " + div_close + "\n              </motion.li>"),
    ("      " + motion_close + "\n    </section>", "      " + div_close + "\n    </section>"),
    ("                " + motion_close + "\n                <div className=\"flex flex-1", "                " + div_close + "\n                <div className=\"flex flex-1"),
    ("      " + motion_close + "\n\n      <WaveDivider", "      " + div_close + "\n\n      <WaveDivider"),
]

for path in ROOT.rglob("*.tsx"):
    text = path.read_text(encoding="utf-8")
    original = text
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding="utf-8")
        print("fixed", path.relative_to(ROOT.parent))
