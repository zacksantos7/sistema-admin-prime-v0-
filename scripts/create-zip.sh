#!/bin/bash
# Script to create a ZIP file of the project for deployment

# Create a temporary directory for the zip contents
TEMP_DIR=$(mktemp -d)
PROJECT_DIR=$(pwd)

# Copy all project files except node_modules, .next, and .git
rsync -a \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='dist' \
  --exclude='.env.local' \
  --exclude='.env*.local' \
  "$PROJECT_DIR/" "$TEMP_DIR/prime-life-admin/"

# Add .gitignore to the zip
if [ -f "$PROJECT_DIR/.gitignore" ]; then
  cp "$PROJECT_DIR/.gitignore" "$TEMP_DIR/prime-life-admin/.gitignore"
fi

# Create the ZIP file
cd "$TEMP_DIR"
zip -r "prime-life-admin.zip" "prime-life-admin/" -q

# Move ZIP to project root
mv "prime-life-admin.zip" "$PROJECT_DIR/prime-life-admin.zip"

# Clean up
rm -rf "$TEMP_DIR"

echo "✅ ZIP criado com sucesso: prime-life-admin.zip"
echo "📦 Tamanho do arquivo: $(du -h $PROJECT_DIR/prime-life-admin.zip | cut -f1)"
