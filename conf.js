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
            "apiUrl": "https://dev.boodskap.io/api",
            "domainKey": "XLOYLUDCHY",
            "apiKey": "7wqaskN4z31b",
            "mqtt": {
                "hostName": 'dev.boodskap.io',
                "portNo": 443,
                "ssl": true
            }
        }
    }
}