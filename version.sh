VERSION=0.2.4

cd frontend
npm version $VERSION

cd ../backend
poetry version $VERSION

cd ../
git add .
git commit -m "config: update project version to ${VERSION}"
