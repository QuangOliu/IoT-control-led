const mqtt = require('mqtt');
const WebSocket = require('ws');
const mysql = require('mysql');

// Kết nối tới MQTT broker
const mqttClient = mqtt.connect('mqtt://mqtt-broker-url');

// Kết nối tới WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Kết nối tới cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'db_user',
  password: 'db_password',
  database: 'db_name'
});

db.connect(err => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
  } else {
    console.log('Đã kết nối cơ sở dữ liệu');
  }
});

// Lắng nghe kết nối WebSocket
wss.on('connection', ws => {
  console.log('Đã kết nối WebSocket');

  // Lắng nghe dữ liệu MQTT từ ESP8266
  mqttClient.subscribe('topic');
  
  mqttClient.on('message', (topic, message) => {
    if (topic === 'topic') {
      const data = JSON.parse(message.toString());
      // Lưu dữ liệu vào cơ sở dữ liệu
      const sql = 'INSERT INTO sensor_data (humidity, temperature, light, led1State, led2State, led3State) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [data.humidity, data.temperature, data.light, data.led1State, data.led2State, data.led3State];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:', err);
        } else {
          console.log('Dữ liệu đã được lưu vào cơ sở dữ liệu');
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Đã ngắt kết nối WebSocket');
  });
});

// Xử lý lỗi MQTT
mqttClient.on('error', err => {
  console.error('Lỗi MQTT:', err);
});

// Xử lý lỗi cơ sở dữ liệu
db.on('error', err => {
  console.error('Lỗi cơ sở dữ liệu:', err);
});
