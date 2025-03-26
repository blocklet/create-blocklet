#!/bin/bash

# 设置默认值
DID=${DID:-"z2qa7BQdkEb3TwYyEYC1psK6uvmGnHSUHt5RM"}
PACKAGE_MANAGER=${PACKAGE_MANAGER:-"pnpm"}
TEMPLATE=${TEMPLATE:-"react-dapp"}

# 获取临时目录
TMP_DIR=$(mktemp -d)
TMP_DIR="/private/var/folders/t8/dd1zk5ms3rq4cl3119p_1yt40000gn/T/tmp.18j2cFSyNG"
CWD=$(pwd)
echo "tmpDir: $TMP_DIR"
echo "cwd: $CWD"

# 清理函数
cleanup() {
  local app_dir=$1
  local pid_file="$app_dir/dev.pid"
  if [ -f "$pid_file" ]; then
    local pid=$(cat "$pid_file")
    echo "Cleaning up process $pid..."
    kill "$pid" 2>/dev/null || true
    rm -f "$pid_file"
  fi
}

# 测试模板函数
test_template() {
  local template=$1
  echo "Testing template: $template"
  echo "Using package manager: $PACKAGE_MANAGER"

  # 创建测试目录
  local test_dir="$TMP_DIR/apps"
  echo "test_dir is $test_dir"
  mkdir -p "$test_dir"

  # 创建应用
  echo "pwd is $(pwd)"
  cd "$test_dir" && node "$CWD/packages/create-app/index.js" \
    --did "$DID" \
    --e2e \
    --template "$template" \
    --packageName "$template" \
    --authorName "test-author" \
    --authorEmail "test@example.com" \
    --packageManager "$PACKAGE_MANAGER"

  local app_dir="$test_dir/$template"
  echo "appDir is $app_dir, install deps..."

  # 安装依赖
  cd "$app_dir"
  $PACKAGE_MANAGER install

  echo "start blocklet dev"

  # 启动开发服务器并等待服务就绪
  cd "$app_dir" && npm run dev >dev.log &
  echo $! >dev.pid

  # 等待服务启动（最多等待30秒）
  echo "Waiting for service to start..."
  for i in {1..30}; do
    if grep -q "You can access with the following URL" dev.log; then
      break
    fi
    sleep 1
  done

  # 等待30秒确保服务稳定
  echo "Waiting for 30 seconds..."
  sleep 30

  # 提取应用URL并检查状态
  local app_url=$(grep -aiE 'https?://.*\.did\.abtnet\.io' dev.log | sed 's/^- //')
  if [ -n "$app_url" ]; then
    echo "Found application URL: $app_url"
    echo "Checking application status..."
    if curl -I "$app_url" 2>/dev/null | grep -q "HTTP/.*200"; then
      echo "✅ Application is responding with 200 status code"
    else
      echo "❌ Application is not responding with 200 status code"
      cleanup "$app_dir"
      return 1
    fi
  else
    echo "❌ No application URL found in the output"
    cleanup "$app_dir"
    return 1
  fi

  # 执行 npm run bundle
  echo "start bundle"
  cd "$app_dir" && npm run bundle

  # 清理进程
  cleanup "$app_dir"
  echo "✅ Successfully created template: $template"
  return 0
}

# 主函数
main() {
  test_template "$TEMPLATE"
  local result=$?
  if [ $result -ne 0 ]; then
    echo "Test execution failed"
    exit 1
  fi
}

# 运行主函数
main
