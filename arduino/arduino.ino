#include <DHT.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#define DHTPIN 14  // Chân dữ liệu của cảm biến DHT11
#define DHTTYPE DHT11
#define LED1 2           // Chân GPIO của LED 1
#define LED2 4           // Chân GPIO của LED 2
#define LIGHT_SENSOR A0  // Chân analog của cảm biến ánh sáng

DHT dht(DHTPIN, DHTTYPE);

// Thiết lập kết nối Wi-Fi
const char* ssid = "ssid";
const char* password = "123456781";

// Thiết lập thông tin MQTT broker
const char* mqtt_broker = "192.168.95.214";
const int mqtt_port = 1883;
const char* mqtt_topic_led1 = "esp8266/led1";  // Chủ đề MQTT cho LED 1
const char* mqtt_topic_led2 = "esp8266/led2";  // Chủ đề MQTT cho LED 2
const char* mqtt_sensor_topic = "esp8266/sensor";

bool led1State = false;
bool led2State = false;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  // Khởi động kết nối Wi-Fi
  Serial.begin(115200);
  delay(10);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Kết nối WiFi thành công");

  // Setting LED pins as output
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  digitalWrite(LED1, LOW);  // Turn off LED 1 initially
  digitalWrite(LED2, LOW);  // Turn off LED 2 initially

  // Kết nối đến MQTT broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
    String client_id = "esp8266-client-";
    client_id += String(WiFi.macAddress());
    Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
    if (client.connect(client_id.c_str())) {
      Serial.println("Public MQTT broker connected");
      client.subscribe(mqtt_topic_led1);
      client.subscribe(mqtt_topic_led2);
    } else {
      Serial.print("Failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

  // Đăng ký callback
  client.setCallback(callback);

  // Kết nối đến MQTT broker và subscribe vào các topic
  reconnect();
}

void loop() {
  delay(2000);
  client.loop();
  delay(100);  // Delay for a short period in each loop iteration

  // Đọc dữ liệu từ cảm biến DHT11 và cảm biến ánh sáng
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int lightValue = analogRead(LIGHT_SENSOR);

  // Tạo đối tượng JSON
  StaticJsonDocument<200> jsonDoc;
  jsonDoc["humidity"] = humidity;
  jsonDoc["temperature"] = temperature;
  jsonDoc["light"] = lightValue;
  jsonDoc["led1State"] = led1State;
  jsonDoc["led2State"] = led2State;

  // Chuyển đối tượng JSON thành chuỗi JSON
  String jsonString;
  serializeJson(jsonDoc, jsonString);

  // Gửi chuỗi JSON tới MQTT topic
  client.publish(mqtt_sensor_topic, jsonString.c_str());

  // In ra màn hình Serial (tùy chọn)
  Serial.println(jsonString);
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];  // Convert *byte to string
  }
  Serial.print(message);

  if (strcmp(topic, mqtt_topic_led1) == 0) {
    Serial.print("đã vào đây: ");
    Serial.println(topic);
    if (message == "on" && !led1State) {
      digitalWrite(LED1, HIGH);  // Bật đèn LED 1
      led1State = true;
    } else if (message == "off" && led1State) {
      digitalWrite(LED1, LOW);  // Tắt đèn LED 1
      led1State = false;
    }
  } else if (strcmp(topic, mqtt_topic_led2) == 0) {
    Serial.print("đã vào đây: ");
    Serial.println(topic);
    if (message == "on" && !led2State) {
      digitalWrite(LED2, HIGH);  // Bật đèn LED 2
      led2State = true;
    } else if (message == "off" && led2State) {
      digitalWrite(LED2, LOW);  // Tắt đèn LED 2
      led2State = false;
    }
  }

  Serial.println();
  Serial.println("-----------------------");
}

void reconnect() {
  // Kết nối lại tới MQTT broker
  while (!client.connected()) {
    Serial.print("Kết nối tới MQTT broker...");
    if (client.connect("ESP8266Client")) {
      Serial.println("Kết nối MQTT thành công");
      client.subscribe(mqtt_topic_led1);
      client.subscribe(mqtt_topic_led2);
    } else {
      Serial.print("Kết nối MQTT thất bại. Thử lại sau 5 giây...");
      delay(5000);
    }
  }
}
