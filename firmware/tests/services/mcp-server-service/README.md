# MCP Server Service Test

ModdableでMCPサーバーを起動するテストコードです。

## 実行（Linux）

```bash
cd tests/services/mcp-server-service
source ~/.local/share/xs-dev-export.sh
mcconfig -m -d -p lin
```

## テスト方法

サーバーが起動したら、以下のコマンドでテストできます：

### 1. ヘルスチェック
```bash
curl http://localhost:8080/health
```

### 2. MCPプロトコルの初期化
```bash
curl -X POST http://localhost:8080/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"1","method":"initialize","params":{}}'
```

### 3. 利用可能なツールのリスト
```bash
curl -X POST http://localhost:8080/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tools/list","params":{}}'
```

### 4. ツールの実行（Hello World）
```bash
curl -X POST http://localhost:8080/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"hello_world","arguments":{"name":"Stack-chan"}}}'
```

### 5. ツールの実行（数値計算）
```bash
curl -X POST http://localhost:8080/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"4","method":"tools/call","params":{"name":"add_numbers","arguments":{"a":10,"b":20}}}'
```

## 実装されているツール

- **hello_world**: 挨拶メッセージを返す
- **add_numbers**: 2つの数値を足し算する
- **get_current_time**: 現在時刻を返す
