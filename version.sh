VERSION=0.2.1

cd frontend
npm version $VERSION

cd ../backend
poetry version $VERSION

cd ../
git add .
git commit -m "config: update project version to ${VERSION}"
