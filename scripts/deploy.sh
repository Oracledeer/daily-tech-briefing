#!/bin/bash
# 每日技术晨报 — 部署脚本
# 用法: ./scripts/deploy.sh <commit-message>
# 功能: git add/commit/push 到 GitHub Pages

set -e

cd "$(dirname "$0")/.."
MSG="${1:-"🔄 daily update $(date +%Y-%m-%d)"}"

git add -A
git commit -m "$MSG" 2>/dev/null || echo "ℹ️  Nothing to commit"

# Push with retry
for i in 1 2 3; do
  if git push origin main 2>/dev/null; then
    echo "✅ Deployed: $MSG"
    exit 0
  fi
  echo "⏳ Push attempt $i failed, retrying in 5s..."
  sleep 5
done

echo "❌ Push failed after 3 attempts"
exit 1
