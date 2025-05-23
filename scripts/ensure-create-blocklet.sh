#!/bin/bash

###########################################
# 配置和环境变量
###########################################

# 默认配置
DID=${DID:-"z2qa7BQdkEb3TwYyEYC1psK6uvmGnHSUHt5RM"}
PACKAGE_MANAGER=${PACKAGE_MANAGER:-"pnpm"}
TEMPLATE=${TEMPLATE:-"react-dapp"}

# 检查环境变量
if [ "$TEMPLATE" = "react-aigne-dapp" ]; then
  if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ 使用 react-aigne-dapp 模板时必须设置 OPENAI_API_KEY 环境变量"
    exit 1
  else
    echo "✅ OPENAI_API_KEY 环境变量已设置"
  fi
fi

# 工作目录设置
TMP_DIR=${TMP_DIR:-$(mktemp -d)}
CWD=$(pwd)

# 输出初始配置信息
echo "=== 初始化配置 ==="
echo "临时目录: $TMP_DIR"
echo "当前目录: $CWD"
echo "==================="

###########################################
# 辅助函数
###########################################

# 清理进程和临时文件
cleanup() {
  local app_dir=$1
  local pid_file="$app_dir/dev.pid"

  if [ -f "$pid_file" ]; then
    local pid=$(cat "$pid_file")
    echo "正在清理进程 $pid..."
    kill "$pid" 2>/dev/null || true
    rm -f "$pid_file"
  fi
  rm -fr "$app_dir/dev.log"
  rm -fr $TMP_DIR
}

# 更新依赖包版本
update_package_version() {
  local app_dir=$1
  local package_name=$2
  local latest_version=$3

  # 使用兼容 GNU 和 BSD sed 的方式
  if [ "$(uname)" = "Darwin" ]; then
    # macOS (BSD sed)
    cd "$app_dir" && sed -i '' "s/\"$package_name\": \".*\"/\"$package_name\": \"$latest_version\"/" package.json
  else
    # Linux/other (GNU sed)
    cd "$app_dir" && sed -i "s/\"$package_name\": \".*\"/\"$package_name\": \"$latest_version\"/" package.json
  fi
}

###########################################
# 主要测试函数
###########################################

test_template() {
  local template=$1
  echo "=== 开始测试模板: $template ==="
  echo "使用包管理器: $PACKAGE_MANAGER"

  # 创建测试目录
  local test_dir="$TMP_DIR/apps"
  mkdir -p "$test_dir"

  echo "=== 创建应用 ==="
  cd "$test_dir" && node "$CWD/packages/create-app/index.js" \
    --did "$DID" \
    --e2e \
    --template "$template" \
    --packageName "$template" \
    --authorName "test-author" \
    --authorEmail "test@example.com" \
    --packageManager "$PACKAGE_MANAGER"

  local app_dir="$test_dir/$template"
  echo "=== 安装依赖 ==="
  LATEST_VERSION=$(npm show vite-plugin-blocklet version)
  update_package_version "$app_dir" "vite-plugin-blocklet" "$LATEST_VERSION"
  cd "$app_dir" && $PACKAGE_MANAGER install

  echo "=== 启动开发服务器 ==="
  if [ "$TEMPLATE" = "react-aigne-dapp" ]; then
    echo "OPENAI_API_KEY=$OPENAI_API_KEY" >.env
  fi
  cd "$app_dir" && npm run dev >dev.log &
  echo $! >dev.pid

  # 等待服务启动
  echo "等待服务启动中..."
  for i in {1..30}; do
    if grep -q "You can access with the following URL" dev.log; then
      break
    fi
    sleep 1
    echo -n "."
  done
  echo ""

  echo "等待服务稳定(30秒)..."
  sleep 30

  # 检查应用状态
  local app_url=$(grep -aiE 'https?://.*\.did\.abtnet\.io' dev.log | sed 's/^- //')
  if [ -n "$app_url" ]; then
    echo "应用URL: $app_url"
    echo "检查应用状态..."
    if curl -I "$app_url" 2>/dev/null | grep -q "HTTP/.*200"; then
      echo "✅ 应用响应正常 (200)"
    else
      echo "❌ 应用响应异常"
      cleanup "$app_dir"
      return 1
    fi
  else
    echo "❌ 未找到应用URL"
    cat dev.log
    cleanup "$app_dir"
    return 1
  fi

  echo "=== 打包应用 ==="
  cd "$app_dir" && npm run bundle

  # 清理环境
  cleanup "$app_dir"
  echo "✅ 模板测试完成: $template"
  return 0
}

###########################################
# 主函数
###########################################

main() {
  if [ "$TEMPLATE" == "react-aigne-dapp" ]; then
    if [ -z "$OPENAI_API_KEY" ]; then
      echo "❌ 使用 react-aigne-dapp 模板时必须设置 OPENAI_API_KEY 环境变量"
      exit 1
    fi
    echo "✅ OPENAI_API_KEY 环境变量已设置"
  fi

  test_template "$TEMPLATE"
  local result=$?

  if [ $result -ne 0 ]; then
    echo "❌ 测试执行失败"
    exit 1
  fi

  echo "✅ 测试执行成功"
}

# 执行主程序
main
