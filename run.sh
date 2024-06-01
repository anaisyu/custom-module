npm version --no-git-tag-version patch
cd projects/custom-display
npm version --no-git-tag-version patch
cd ../../
cd projects/dy-edit-dev
npm version --no-git-tag-version patch
cd ../../
rm -rf dist/*
ng build dy-custom-display --configuration production
cd dist/custom-display/ && npm publish
