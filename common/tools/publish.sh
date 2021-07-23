set -e

VERSION=$(cat version | awk '{$1=$1;print}')
echo "publish version ${VERSION}"

echo "bundling..."
echo "SKIP_PREFLIGHT_CHECK=true" > .env
npm run bundle

echo "publishing to blocklet registry..."
blocklet config registry ${BLOCKLET_REGISTRY}
blocklet publish --developer-sk ${BLOCKLET_REGISTRY_SK}

make release

# deploy to remote ABT Node
set +e
NAME=$(cat package.json | grep name | head -n 1 |  awk '{print $2}' | sed 's/"//g' | sed 's/,//g')
VERSION=$(cat package.json | grep version | head -n 1 |  awk '{print $2}' | sed 's/"//g' | sed 's/,//g')

if [ "${STAGING_NODE_ENDPOINT}" != "" ]; then
  blocklet deploy .blocklet/bundle --endpoint ${STAGING_NODE_ENDPOINT} --access-key ${STAGING_NODE_ACCESS_KEY} --access-secret ${STAGING_NODE_ACCESS_SECRET} --skip-hooks
  if [ $? == 0 ]; then
    echo "deploy to ${STAGING_NODE_ENDPOINT} success"
    curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"${NAME} v${VERSION} was successfully deployed to ${STAGING_NODE_ENDPOINT}\"}" ${SLACK_WEBHOOK}
  else
    echo "deploy to ${STAGING_NODE_ENDPOINT} failed"
    curl -X POST -H 'Content-type: application/json' --data "{\"text\":\":x: Faild to deploy ${NAME} v${VERSION} to ${STAGING_NODE_ENDPOINT}\"}" ${SLACK_WEBHOOK}
  fi
fi
