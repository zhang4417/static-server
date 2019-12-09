var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号\nnode server.js 8888 像这样!')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    const filePath = (path === '/' ? '/index.html' : path)
    response.statusCode = 200
    const index = filePath.lastIndexOf('.')
    const suffix = filePath.substring(index)
    console.log(suffix)
    const hashMap = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".jpg": "image/jpeg",
        ".png": "image/png"
    }
    response.setHeader('Content-Type', `${hashMap[suffix]};charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`./public/${filePath}`)
    } catch (error) {
        response.statusCode = 404
        content = '此路径不存在'
    }
    response.write(content)
    response.end()
    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)
