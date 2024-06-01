npm version --no-git-tag-version patch
cd projects/custom-display
npm version --no-git-tag-version patch
cd ../../
cd projects/dy-edit-dev
npm version --no-git-tag-version patch
cd ../../
rm -rf dist/*
ng build dy-edit-dev --configuration production
cd dist/dy-edit-dev/ && npm publish
