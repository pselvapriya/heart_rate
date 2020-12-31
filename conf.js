module.exports = {
    "web": {
        "port": 7201,
        "host": "0.0.0.0",
        "basepath": "/hrmonitor"
    },
    "settings": {
        "appApiUrl": "http://localhost:7201/hrmonitor",
        "url": "http://localhost:7201/hrmonitor",
        "boodskap": {
            "apiUrl": "https://orientation.boodskap.io/api",
            "domainKey": "JJBRZBNFHQ",
            "apiKey": "tezsJPT8ZmaR",
            "mqtt": {
                "hostName": 'orientation.boodskap.io',
                "portNo": 443,
                "ssl": true
            }
        }
    }
}