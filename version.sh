VERSION=0.1.1

cd frontend
npm version $VERSION

cd ../backend
poetry version $VERSION
