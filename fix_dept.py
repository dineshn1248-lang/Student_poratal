"""
Clean Dashboard.jsx:
1. Remove everything after line 974 (the inline deptData/DInfoRow/DCard/DepartmentDetailView junk)
2. Add the import for DepartmentDetailView at the top
"""
path = "src/pages/principal/Dashboard.jsx"
with open(path, encoding="utf-8") as f:
    lines = f.readlines()

print(f"Before: {len(lines)} lines")

# ── Step 1: Trim file to line 974 ────────────────────────────────────────────
# Line 974 (index 973) should be blank; line 975 (index 974) is `\n` before deptData
# We want to keep up to the true end of the last proper component.
# Find the blank line just before `const deptData`
dept_data_idx = None
for i, l in enumerate(lines):
    if l.strip().startswith("const deptData"):
        dept_data_idx = i
        break

if dept_data_idx is None:
    print("deptData not found in Dashboard.jsx — already clean!")
else:
    # Remove from (dept_data_idx - 2) onward to strip the blank + comment + everything after
    # But we need to keep the final `}` that closes the last real component before deptData
    # Walk backwards from dept_data_idx to find the comment line "// ── Department data"
    comment_idx = dept_data_idx - 1
    while comment_idx >= 0 and lines[comment_idx].strip() in ("", "//"):
        comment_idx -= 1
    # comment_idx now points to the last real code line before the deptData block
    # The line after it to dept_data_idx-1 is blank/comment — cut from dept_data_idx-1
    cut_from = dept_data_idx - 1
    # Make sure we preserve the final newline of the last real component
    lines = lines[:cut_from]
    # Ensure file ends with newline
    if lines and not lines[-1].endswith("\n"):
        lines[-1] += "\n"
    print(f"Trimmed to {len(lines)} lines (removed inline deptData and components)")

# ── Step 2: Add import at top ─────────────────────────────────────────────────
import_line = 'import DepartmentDetailView from "./DepartmentDetailView";\n'
already_imported = any("DepartmentDetailView" in l for l in lines[:10])
if not already_imported:
    # Insert after line 4 (after the principalApi import block)
    insert_at = 0
    for i, l in enumerate(lines[:15]):
        if l.startswith("import"):
            insert_at = i + 1
    lines.insert(insert_at, import_line)
    print(f"Import added at line {insert_at + 1}")
else:
    print("Import already present")

with open(path, "w", encoding="utf-8") as f:
    f.writelines(lines)

print(f"Done. Final file: {len(lines)} lines")
