#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Field Service SDK publishing process...${NC}"

# Check if user is logged in to npm
if ! npm whoami &> /dev/null; then
    echo -e "${RED}Error: You must be logged in to npm to publish.${NC}"
    echo "Please run 'npm login' first."
    exit 1
fi

# Clean the dist directory
echo "Cleaning dist directory..."
rm -rf dist

# Install dependencies
echo "Installing dependencies..."
npm install

# Run the build process
echo "Building the SDK..."
npm run prepare

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}Error: Build failed. dist directory not found.${NC}"
    exit 1
fi

# Get the current version
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Get all published versions
echo "Checking published versions..."
PUBLISHED_VERSIONS=$(npm view field-service-sdk versions --json 2>/dev/null || echo "[]")
PUBLISHED_VERSIONS=$(echo $PUBLISHED_VERSIONS | tr -d '[]' | tr ',' '\n' | tr -d '"' | tr -d ' ')

# Check if current version exists in published versions
VERSION_EXISTS=false
for version in $PUBLISHED_VERSIONS; do
    if [ "$version" = "$CURRENT_VERSION" ]; then
        VERSION_EXISTS=true
        break
    fi
done

if [ "$VERSION_EXISTS" = true ]; then
    echo -e "${YELLOW}Version ${CURRENT_VERSION} already exists on npm.${NC}"
    echo "Please choose how to bump the version:"
    echo "1) Patch (0.0.x) - for backwards-compatible bug fixes"
    echo "2) Minor (0.x.0) - for new backwards-compatible functionality"
    echo "3) Major (x.0.0) - for breaking changes"
    read -p "Enter your choice (1-3): " VERSION_CHOICE

    case $VERSION_CHOICE in
        1)
            npm version patch --no-git-tag-version
            ;;
        2)
            npm version minor --no-git-tag-version
            ;;
        3)
            npm version major --no-git-tag-version
            ;;
        *)
            echo -e "${RED}Invalid choice. Exiting.${NC}"
            exit 1
            ;;
    esac

    NEW_VERSION=$(node -p "require('./package.json').version")
    echo -e "${GREEN}Version bumped to ${NEW_VERSION}${NC}"
fi

# Get the current version (might have been updated)
VERSION=$(node -p "require('./package.json').version")

# Double check the new version doesn't exist
for version in $PUBLISHED_VERSIONS; do
    if [ "$version" = "$VERSION" ]; then
        echo -e "${RED}Error: Version ${VERSION} still exists on npm. Please manually update the version in package.json to a new version.${NC}"
        exit 1
    fi
done

# Confirm before publishing
echo -e "${GREEN}Ready to publish version ${VERSION}${NC}"
read -p "Do you want to continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Publishing cancelled."
    exit 1
fi

# Publish to npm
echo "Publishing to npm..."
npm publish --access public

echo -e "${GREEN}Successfully published version ${VERSION} to npm!${NC}"
echo "You can now install the package using: npm install field-service-sdk" 