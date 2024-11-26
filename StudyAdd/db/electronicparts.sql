-- 创建数据库
CREATE DATABASE electronicparts;

-- 使用数据库
USE electronicparts;

-- 创建元器件表
CREATE TABLE parts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    usage_description TEXT NOT NULL,
    programming_code TEXT NOT NULL,
    official_doc_url VARCHAR(255) NOT NULL
);

-- 插入初始数据
INSERT INTO parts (name, usage_description, programming_code, official_doc_url) VALUES
('电阻 (Resistor)', '用于限制电流或分压。', '#define RESISTOR_VALUE 1000  // 1kΩ\nint main() {\n    int voltage = 5;  // 5V\n    int current = voltage / RESISTOR_VALUE;\n    printf("Current: %d mA\\n", current);\n    return 0;\n}', 'https://www.example.com/resistor-doc'),
('电容 (Capacitor)', '用于存储电荷，平滑电压波动。', '#define CAPACITOR_VALUE 10e-6  // 10μF\nint main() {\n    float time_constant = RESISTOR_VALUE * CAPACITOR_VALUE;\n    printf("Time Constant: %.2f seconds\\n", time_constant);\n    return 0;\n}', 'https://www.example.com/capacitor-doc'),
('二极管 (Diode)', '用于单向导电，防止电流反向流动。', '#define DIODE_FORWARD_VOLTAGE 0.7  // 0.7V\nint main() {\n    float output_voltage = 5 - DIODE_FORWARD_VOLTAGE;\n    printf("Output Voltage: %.2f V\\n", output_voltage);\n    return 0;\n}', 'https://www.example.com/diode-doc'),
('晶体管 (Transistor)', '用于放大电流或作为开关。', '#define BASE_CURRENT 10e-3  // 10mA\n#define GAIN 100  // 放大倍数\nint main() {\n    float collector_current = BASE_CURRENT * GAIN;\n    printf("Collector Current: %.2f A\\n", collector_current);\n    return 0;\n}', 'https://www.example.com/transistor-doc'),
('LED (Light Emitting Diode)', '用于发光，常用于指示灯。', '#define LED_FORWARD_VOLTAGE 2.0  // 2.0V\n#define RESISTOR_VALUE 330  // 330Ω\nint main() {\n    float current = (5 - LED_FORWARD_VOLTAGE) / RESISTOR_VALUE;\n    printf("LED Current: %.2f mA\\n", current * 1000);\n    return 0;\n}', 'https://www.example.com/led-doc'),
('电感 (Inductor)', '用于存储磁场能量，常用于滤波和振荡电路。', '#define INDUCTOR_VALUE 10e-3  // 10mH\nint main() {\n    float time_constant = INDUCTOR_VALUE / RESISTOR_VALUE;\n    printf("Time Constant: %.2f seconds\\n", time_constant);\n    return 0;\n}', 'https://www.example.com/inductor-doc'),
('晶振 (Crystal Oscillator)', '用于提供稳定的时钟信号，常用于单片机时钟源。', '#define CRYSTAL_FREQUENCY 12e6  // 12MHz\nint main() {\n    printf("Crystal Frequency: %.0f Hz\\n", CRYSTAL_FREQUENCY);\n    return 0;\n}', 'https://www.example.com/crystal-doc'),
('继电器 (Relay)', '用于控制高电压或大电流的开关。', '#define RELAY_COIL_RESISTANCE 200  // 200Ω\nint main() {\n    float current = 5 / RELAY_COIL_RESISTANCE;\n    printf("Relay Coil Current: %.2f mA\\n", current * 1000);\n    return 0;\n}', 'https://www.example.com/relay-doc'),
('传感器 (Sensor)', '用于检测环境参数，如温度、湿度等。', '#define SENSOR_PIN A0\nint main() {\n    int sensor_value = analogRead(SENSOR_PIN);\n    printf("Sensor Value: %d\\n", sensor_value);\n    return 0;\n}', 'https://www.example.com/sensor-doc'),
('蜂鸣器 (Buzzer)', '用于发出声音，常用于报警或提示。', '#define BUZZER_PIN 9\nint main() {\n    pinMode(BUZZER_PIN, OUTPUT);\n    digitalWrite(BUZZER_PIN, HIGH);\n    delay(1000);\n    digitalWrite(BUZZER_PIN, LOW);\n    return 0;\n}', 'https://www.example.com/buzzer-doc'),
('Arduino Uno', '常用的开源微控制器主板，基于ATmega328P芯片。', '#define LED_PIN 13\nvoid setup() {\npinMode(LED_PIN, OUTPUT);\n}\nvoid loop() {\ndigitalWrite(LED_PIN, HIGH);\ndelay(1000);\ndigitalWrite(LED_PIN, LOW);\ndelay(1000);\n}', 'https://www.arduino.cc/en/Guide/ArduinoUno'),
('Raspberry Pi', '基于ARM架构的单板计算机，广泛用于物联网和嵌入式系统。', 'import RPi.GPIO as GPIO\nimport time\n\nLED_PIN = 18\nGPIO.setmode(GPIO.BCM)\nGPIO.setup(LED_PIN, GPIO.OUT)\n\ntry:\nwhile True:\nGPIO.output(LED_PIN, GPIO.HIGH)\n        time.sleep(1)\nGPIO.output(LED_PIN, GPIO.LOW)\n        time.sleep(1)\nexcept KeyboardInterrupt:\nGPIO.cleanup()', 'https://www.raspberrypi.org/documentation/'),
('74HC595 Shift Register', '用于扩展微控制器的输出引脚，通过串行输入并行输出。', '#define DATA_PIN 2\n#define LATCH_PIN 3\n#define CLOCK_PIN 4\n\nvoid setup() {\n    pinMode(DATA_PIN, OUTPUT);\n    pinMode(LATCH_PIN, OUTPUT);\n    pinMode(CLOCK_PIN, OUTPUT);\n}\n\nvoid loop() {\n    for (int i = 0; i < 256; i++) {\n        digitalWrite(LATCH_PIN, LOW);\n        shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, i);\n        digitalWrite(LATCH_PIN, HIGH);\n        delay(500);\n    }\n}', 'https://www.ti.com/lit/ds/symlink/sn74hc595.pdf'),
('LM35 Temperature Sensor', '线性温度传感器，输出电压与温度成正比。', '#define SENSOR_PIN A0\n\nvoid setup() {\n    Serial.begin(9600);\n}\n\nvoid loop() {\n    int sensorValue = analogRead(SENSOR_PIN);\n    float voltage = sensorValue * (5.0 / 1023.0);\n    float temperature = voltage * 100;\n    Serial.print("Temperature: ");\n    Serial.print(temperature);\n    Serial.println(" C");\n    delay(1000);\n}', 'https://www.ti.com/lit/ds/symlink/lm35.pdf'),
('HC-SR04 Ultrasonic Sensor', '用于测量距离的超声波传感器。', '#define TRIG_PIN 9\n#define ECHO_PIN 10\n\nvoid setup() {\n    Serial.begin(9600);\n    pinMode(TRIG_PIN, OUTPUT);\n    pinMode(ECHO_PIN, INPUT);\n}\n\nvoid loop() {\n    digitalWrite(TRIG_PIN, LOW);\n    delayMicroseconds(2);\n    digitalWrite(TRIG_PIN, HIGH);\n    delayMicroseconds(10);\n    digitalWrite(TRIG_PIN, LOW);\n\n    long duration = pulseIn(ECHO_PIN, HIGH);\n    float distance = duration * 0.034 / 2;\n\n    Serial.print("Distance: ");\n    Serial.print(distance);\n    Serial.println(" cm");\n    delay(1000);\n}', 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf');