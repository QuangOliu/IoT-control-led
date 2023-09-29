const express = require('express');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config(); // Đọc các biến môi trường từ tệp .env

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect(err => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
  } else {
    console.log('Đã kết nối cơ sở dữ liệu');
  }
});

// Kết nối đến MQTT broker
const mqttClient = mqtt.connect(`mqtt://${process.env.MQTT_BROKER}`);

mqttClient.on('connect', () => {
  console.log('Kết nối MQTT broker thành công');
  mqttClient.subscribe('esp8266/sensor');
});

mqttClient.on('message', (topic, message) => {
  if (topic === 'esp8266/sensor') {
    const data = JSON.parse(message.toString());
    // Lưu dữ liệu vào cơ sở dữ liệu
    const sql = 'INSERT INTO sensor_data (humidity, temperature, light, timestamp) VALUES (?, ?, ?, NOW())';

    const values = [data.humidity, data.temperature, data.light, data.led1State, data.led2State];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Lỗi khi thêm dữ liệu vào cơ sở dữ liệu:', err);
      } else {
        console.log('Dữ liệu đã được lưu vào cơ sở dữ liệu');
      }
    });
  }
});

const registeredLeds = {
  led1: { topic: 'esp8266/led1' },
  led2: { topic: 'esp8266/led2' },
  // Thêm thông tin về các đèn LED khác ở đây nếu cần
};
// API để điều khiển đèn
app.post('/control/led/:ledId', (req, res) => {
  const ledId = req.params.ledId;
  const state = req.body.state; // Trạng thái mới của đèn (true hoặc false)

  // Kiểm tra xem ledId có hợp lệ và state có giá trị hợp lệ
  if (registeredLeds.hasOwnProperty(ledId) && (state === true || state === false)) {
    // Lấy thông tin về đèn từ registeredLeds
    const ledInfo = registeredLeds[ledId];

    // Gửi trạng thái đèn đến MQTT broker
    mqttClient.publish(ledInfo.topic, state ? 'on' : 'off');

    // Lưu trạng thái của đèn vào cơ sở dữ liệu
    const sql = 'INSERT INTO led_status (led_id, state, timestamp) VALUES (?, ?, NOW())';
    const values = [ledId, state, state ? new Date() : null, state ? null : new Date()];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Lỗi khi lưu trạng thái đèn vào cơ sở dữ liệu:', err);
      } else {
        console.log(`Trạng thái của ${ledId} đã được lưu vào cơ sở dữ liệu`);
      }
    });

    res.json({ success: true, message: `Đã thay đổi trạng thái của ${ledId} thành ${state ? 'Bật' : 'Tắt'}` });
  } else {
    res.status(400).json({ success: false, message: 'Yêu cầu không hợp lệ' });
  }
});



app.listen(port, () => {
  console.log(`Máy chủ Node.js đang lắng nghe trên cổng ${port}`);
});
