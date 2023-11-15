npm version --no-git-tag-version patch
cd projects/custom-display
npm version --no-git-tag-version patch
cd ../../
rm -rf dist/*
ng build dy-custom-display --configuration production
cd dist/*/
npm publish
