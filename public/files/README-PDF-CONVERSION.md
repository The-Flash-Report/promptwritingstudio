# Prompt Vault PDF Conversion Guide

## Quick Conversion Options

### Option 1: Online Converter (Fastest)
1. Go to https://www.markdowntopdf.com/
2. Upload `prompt-vault-content.md`
3. Download the generated PDF
4. Rename to `prompt-vault.pdf`
5. Place in `/public/files/` directory

### Option 2: Pandoc (Professional)
```bash
# Install pandoc if not already installed
# macOS: brew install pandoc
# Windows: Download from pandoc.org

# Convert markdown to PDF
pandoc prompt-vault-content.md -o prompt-vault.pdf --pdf-engine=xelatex

# With custom styling (optional)
pandoc prompt-vault-content.md -o prompt-vault.pdf \
  --pdf-engine=xelatex \
  --variable=geometry:margin=1in \
  --variable=fontsize:11pt \
  --toc \
  --highlight-style=tango
```

### Option 3: VS Code Extension
1. Install "Markdown PDF" extension in VS Code
2. Open `prompt-vault-content.md`
3. Press `Ctrl+Shift+P` (Cmd+Shift+P on Mac)
4. Type "Markdown PDF: Export (pdf)"
5. Save as `prompt-vault.pdf`

## File Placement
Once converted, place the PDF at:
```
/public/files/prompt-vault.pdf
```

This matches the download link in the download page.

## Testing
1. Navigate to `/prompt-vault/download`
2. Click the download button
3. Verify PDF opens and contains all 50 prompts

## Notes
- The markdown contains 977 lines of carefully formatted content
- Includes all 50 business prompts organized in 5 sections
- Ready for immediate use after PDF conversion
- File size should be approximately 2-3 MB when converted 