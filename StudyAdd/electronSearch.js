// 模拟元器件数据
const partsData = [
	// 数据
	{
		name: '电阻 (Resistor)',
		usage_description: '用于限制电流或分压。<br><img src="electronicImages/resistor.png" alt="开关示意图" style="max-width:100%;">',
		programming_code: '#define RESISTOR_VALUE 1000  // 1kΩ\nint main() {\n    int voltage = 5;  // 5V\n    int current = voltage / RESISTOR_VALUE;\n    printf("Current: %d mA\\n", current);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/resistor-doc'
	},
	{
		name: '电容 (Capacitor)',
		usage_description: '用于存储电荷，平滑电压波动。',
		programming_code: '#define CAPACITOR_VALUE 10e-6  // 10μF\nint main() {\n    float time_constant = RESISTOR_VALUE * CAPACITOR_VALUE;\n    printf("Time Constant: %.2f seconds\\n", time_constant);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/capacitor-doc'
	},
	{
		name: '二极管 (Diode)',
		usage_description: '用于单向导电，防止电流反向流动。二极管，（英语：Diode），电子元件当中，一种具有两个电极的装置，只允许电流由单一方向流过，许多的使用是应用其整流的功能。',
		programming_code: '#define DIODE_FORWARD_VOLTAGE 0.7  // 0.7V\nint main() {\n    float output_voltage = 5 - DIODE_FORWARD_VOLTAGE;\n    printf("Output Voltage: %.2f V\\n", output_voltage);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/diode-doc'
	},
	{
		name: '晶体管 (Transistor)',
		usage_description: '用于放大电流或作为开关。',
		programming_code: '#define BASE_CURRENT 10e-3  // 10mA\n#define GAIN 100  // 放大倍数\nint main() {\n    float collector_current = BASE_CURRENT * GAIN;\n    printf("Collector Current: %.2f A\\n", collector_current);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/transistor-doc'
	},
	{
		name: 'LED (Light Emitting Diode)',
		usage_description: '用于发光，常用于指示灯。',
		programming_code: '#define LED_FORWARD_VOLTAGE 2.0  // 2.0V\n#define RESISTOR_VALUE 330  // 330Ω\nint main() {\n    float current = (5 - LED_FORWARD_VOLTAGE) / RESISTOR_VALUE;\n    printf("LED Current: %.2f mA\\n", current * 1000);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/led-doc'
	},
	{
		name: '电感 (Inductor)',
		usage_description: '用于存储磁场能量，常用于滤波和振荡电路。',
		programming_code: '#define INDUCTOR_VALUE 10e-3  // 10mH\nint main() {\n    float time_constant = INDUCTOR_VALUE / RESISTOR_VALUE;\n    printf("Time Constant: %.2f seconds\\n", time_constant);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/inductor-doc'
	},
	{
		name: '晶振 (Crystal Oscillator)',
		usage_description: '用于提供稳定的时钟信号，常用于单片机时钟源。',
		programming_code: '#define CRYSTAL_FREQUENCY 12e6  // 12MHz\nint main() {\n    printf("Crystal Frequency: %.0f Hz\\n", CRYSTAL_FREQUENCY);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/crystal-doc'
	},
	{
		name: '继电器 (Relay)',
		usage_description: '用于控制高电压或大电流的开关。',
		programming_code: '#define RELAY_COIL_RESISTANCE 200  // 200Ω\nint main() {\n    float current = 5 / RELAY_COIL_RESISTANCE;\n    printf("Relay Coil Current: %.2f mA\\n", current * 1000);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/relay-doc'
	},
	{
		name: '传感器 (Sensor)',
		usage_description: '用于检测环境参数，如温度、湿度等。',
		programming_code: '#define SENSOR_PIN A0\nint main() {\n    int sensor_value = analogRead(SENSOR_PIN);\n    printf("Sensor Value: %d\\n", sensor_value);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/sensor-doc'
	},
	{
		name: '蜂鸣器 (Buzzer)',
		usage_description: '用于发出声音，常用于报警或提示。',
		programming_code: '#define BUZZER_PIN 9\nint main() {\n    pinMode(BUZZER_PIN, OUTPUT);\n    digitalWrite(BUZZER_PIN, HIGH);\n    delay(1000);\n    digitalWrite(BUZZER_PIN, LOW);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/buzzer-doc'
	},
	{
		name: 'Arduino Uno',
		usage_description: '常用的开源微控制器主板，基于ATmega328P芯片。',
		programming_code: '#define LED_PIN 13\nvoid setup() {\npinMode(LED_PIN, OUTPUT);\n}\nvoid loop() {\ndigitalWrite(LED_PIN, HIGH);\ndelay(1000);\ndigitalWrite(LED_PIN, LOW);\ndelay(1000);\n}',
		official_doc_url: 'https://www.arduino.cc/en/Guide/ArduinoUno'
	},
	{
		name: 'Raspberry Pi',
		usage_description: '基于ARM架构的单板计算机，广泛用于物联网和嵌入式系统。',
		programming_code: 'import RPi.GPIO as GPIO\nimport time\n\nLED_PIN = 18\nGPIO.setmode(GPIO.BCM)\nGPIO.setup(LED_PIN, GPIO.OUT)\n\ntry:\nwhile True:\nGPIO.output(LED_PIN, GPIO.HIGH)\n        time.sleep(1)\nGPIO.output(LED_PIN, GPIO.LOW)\n        time.sleep(1)\nexcept KeyboardInterrupt:\nGPIO.cleanup()',
		official_doc_url: 'https://www.raspberrypi.org/documentation/'
	},
	{
		name: '74HC595 Shift Register',
		usage_description: '用于扩展微控制器的输出引脚，通过串行输入并行输出。',
		programming_code: '#define DATA_PIN 2\n#define LATCH_PIN 3\n#define CLOCK_PIN 4\n\nvoid setup() {\n    pinMode(DATA_PIN, OUTPUT);\n    pinMode(LATCH_PIN, OUTPUT);\n    pinMode(CLOCK_PIN, OUTPUT);\n}\n\nvoid loop() {\n    for (int i = 0; i < 256; i++) {\n        digitalWrite(LATCH_PIN, LOW);\n        shiftOut(DATA_PIN, CLOCK_PIN, MSBFIRST, i);\n        digitalWrite(LATCH_PIN, HIGH);\n        delay(500);\n    }\n}',
		official_doc_url: 'https://www.ti.com/lit/ds/symlink/sn74hc595.pdf'
	},
	{
		name: 'LM35 Temperature Sensor',
		usage_description: '线性温度传感器，输出电压与温度成正比。',
		programming_code: '#define SENSOR_PIN A0\n\nvoid setup() {\n    Serial.begin(9600);\n}\n\nvoid loop() {\n    int sensorValue = analogRead(SENSOR_PIN);\n    float voltage = sensorValue * (5.0 / 1023.0);\n    float temperature = voltage * 100;\n    Serial.print("Temperature: ");\n    Serial.print(temperature);\n    Serial.println(" C");\n    delay(1000);\n}',
		official_doc_url: 'https://www.ti.com/lit/ds/symlink/lm35.pdf'
	},
	{
		name: 'HC-SR04 Ultrasonic Sensor',
		usage_description: '用于测量距离的超声波传感器。',
		programming_code: '#define TRIG_PIN 9\n#define ECHO_PIN 10\n\nvoid setup() {\n    Serial.begin(9600);\n    pinMode(TRIG_PIN, OUTPUT);\n    pinMode(ECHO_PIN, INPUT);\n}\n\nvoid loop() {\n    digitalWrite(TRIG_PIN, LOW);\n    delayMicroseconds(2);\n    digitalWrite(TRIG_PIN, HIGH);\n    delayMicroseconds(10);\n    digitalWrite(TRIG_PIN, LOW);\n\n    long duration = pulseIn(ECHO_PIN, HIGH);\n    float distance = duration * 0.034 / 2;\n\n    Serial.print("Distance: ");\n    Serial.print(distance);\n    Serial.println(" cm");\n    delay(1000);\n}',
		official_doc_url: 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf'
	},
	{
		name: '光敏电阻 (Photoresistor)',
		usage_description: '用于检测光线强度，常用于光控电路。',
		programming_code: '#define PHOTORESISTOR_PIN A0\nint main() {\n    int lightValue = analogRead(PHOTORESISTOR_PIN);\n    printf("Light Value: %d\\n", lightValue);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/photoresistor-doc'
	},
	{
		name: '电位器 (Potentiometer)',
		usage_description: '用于调节电压或电流，常用于模拟输入。',
		programming_code: '#define POTENTIOMETER_PIN A1\nint main() {\n    int potValue = analogRead(POTENTIOMETER_PIN);\n    printf("Potentiometer Value: %d\\n", potValue);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/potentiometer-doc'
	},
	{
		name: 'MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor)',
		usage_description: '用于控制大电流，常用于开关电源。',
		programming_code: '#define MOSFET_PIN 7\nint main() {\n    pinMode(MOSFET_PIN, OUTPUT);\n    digitalWrite(MOSFET_PIN, HIGH);\n    delay(1000);\n    digitalWrite(MOSFET_PIN, LOW);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/mosfet-doc'
	},
	{
		name: '运算放大器 (Operational Amplifier)',
		usage_description: '用于放大信号，常用于信号处理电路。',
		programming_code: '#define OPAMP_PIN A2\nint main() {\n    int opampValue = analogRead(OPAMP_PIN);\n    printf("Operational Amplifier Value: %d\\n", opampValue);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/opamp-doc'
	},
	{
		name: '电流传感器 (Current Sensor)',
		usage_description: '用于测量电流，常用于电源管理。',
		programming_code: '#define CURRENT_SENSOR_PIN A3\nint main() {\n    int currentValue = analogRead(CURRENT_SENSOR_PIN);\n    printf("Current Value: %d\\n", currentValue);\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/current-sensor-doc'
	},
	{
		name: '8031',
		usage_description: '8031是MCS-51系列单片机的一种基本型芯片，不带内部程序存储器，需要外部扩展ROM。',
		programming_code: '#include <reg51.h>\nvoid main() {\n    // 8031 初始化代码\n    while (1) {\n        // 主循环代码\n    }\n}',
		official_doc_url: 'https://www.example.com/8031-doc'
	},
	{
		name: '8051',
		usage_description: '8051是MCS-51系列单片机的一种基本型芯片，带有4KB的内部程序存储器。',
		programming_code: '#include <reg51.h>\nvoid main() {\n    // 8051 初始化代码\n    while (1) {\n        // 主循环代码\n    }\n}',
		official_doc_url: 'https://www.example.com/8051-doc'
	},
	{
		name: '8751',
		usage_description: '8751是MCS-51系列单片机的一种基本型芯片，带有4KB的内部EPROM。',
		programming_code: '#include <reg51.h>\nvoid main() {\n    // 8751 初始化代码\n    while (1) {\n        // 主循环代码\n    }\n}',
		official_doc_url: 'https://www.example.com/8751-doc'
	},
	{
		name: 'AT89C51 (常用51单片机)',
		usage_description: 'AT89C51是常用的51单片机，带有4KB的内部Flash存储器。',
		programming_code: '#include <reg51.h>\nvoid main() {\n    // AT89C51 初始化代码\n    while (1) {\n        // 主循环代码\n    }\n}',
		official_doc_url: 'https://www.example.com/at89c51-doc'
	},
	{
		name: 'CAP-POL (极化电容（径向）)',
		usage_description: '有极性电容。有极性电容是不可逆的。正极必须接高电位端，负极必须接低电位端。',
		programming_code: '#define CAP_POL_PIN 1\nint main() {\n    // 极化电容使用示例\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/cap-pol-doc'
	},
	{
		name: 'RESPACK-8 (排阻)',
		usage_description: '排阻用于数字电路，集成若干单一电阻，内部方式可以串联，或者并联；简化PCB板设计、安装更加方便、保证SMT 焊接质量、减小成套设备的体积。阻抗匹配后对本级信号基本无影响。',
		programming_code: '#define RESPACK_PIN 2\nint main() {\n    // 排阻使用示例\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/respack-8-doc'
	},
	{
		name: 'SWITCH (开关)',
		usage_description: '开关用于控制电路的通断。<br><img src="electronicImages/switch.png" alt="开关示意图" style="max-width:100%;">',
		programming_code: '#define SWITCH_PIN 3\nint main() {\n    // 开关使用示例\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/switch-doc'
	},
	{
		name: 'SOUNDER (数字蜂鸣器)',
		usage_description: '数字蜂鸣器用于发出声音，常用于报警或提示。',
		programming_code: '#define SOUNDER_PIN 4\nint main() {\n    // 数字蜂鸣器使用示例\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/sounder-doc'
	},
	{
		name: 'SPEAKER (扬声器)',
		usage_description: '扬声器用于模拟信号的仿真，可以播放语音之类的。',
		programming_code: '#define SPEAKER_PIN 5\nint main() {\n    // 扬声器使用示例\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/speaker-doc'
	},
	{
		name: 'BUZZER (直流驱动的蜂鸣器)',
		usage_description: '直流驱动的蜂鸣器，默认驱动电压是12V，可以调节。',
		programming_code: '#define BUZZER_PIN 6\nint main() {\n    // 蜂鸣器使用示例\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/buzzer-doc'
	},
	{
		name: '7SEG-MPX1-CA (共阳数码管)',
		usage_description: '共阳数码管用于显示数字，常用于计时器、计数器等。',
		programming_code: '#define SEG_PIN 7\nint main() {\n    // 共阳数码管使用示例\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/7seg-mpx1-ca-doc'
	},
	{
		name: 'PNP (PNP型三极管)',
		usage_description: 'PNP型三极管是由2块P型半导体中间夹着1块N型半导体所组成的三极管，所以称为PNP型三极管。也可以描述成，电流从发射极E流入的三极管。',
		programming_code: '#define PNP_PIN 8\nint main() {\n    // PNP型三极管使用示例\n    return 0;\n}',
		official_doc_url: 'https://www.example.com/pnp-doc'
	}
];

// 搜索功能
function searchParts(query) {
	query = query.toLowerCase();
	return partsData.filter(part => part.name.toLowerCase().includes(query));
}

// 高级搜索功能
function advancedSearchParts(name, usage, code) {
	return partsData.filter(part => {
		let matchesName = name ? part.name.toLowerCase().includes(name.toLowerCase()) : true;
		let matchesUsage = usage ? part.usage_description.toLowerCase().includes(usage.toLowerCase()) : true;
		let matchesCode = code ? part.programming_code.toLowerCase().includes(code.toLowerCase()) : true;
		return matchesName && matchesUsage && matchesCode;
	});
}

// 显示搜索结果
function displayResults(results) {
	let searchResults = $('#searchResults');
	searchResults.empty();

	if (results.length === 0) {
		searchResults.append('<p class="text-center">没有找到匹配的元器件。</p>');
	} else {
		results.forEach(part => {
			searchResults.append(`
                <div class="list-group-item">
                    <h5>${part.name}</h5>
                    <p>${part.usage_description}</p>
                    <pre>${part.programming_code}</pre>
                    <a href="${part.official_doc_url}" target="_blank">查看文档</a>
                </div>
            `);
		});
	}
}

$(document).ready(function() {
	console.log('Document is ready!');
	console.log('jQuery is loaded and ready!');

	// 搜索表单提交事件
	$('#searchForm').on('submit', function(e) {
		console.log('Search form submitted!');
		e.preventDefault();
		let query = $('#searchInput').val().trim();
		console.log('Query:', query);
		if (query) {
			let results = searchParts(query);
			console.log('Results:', results);
			displayResults(results);
		}
	});

	// 高级搜索表单提交事件
	$('#advancedSearchForm').on('submit', function(e) {
		console.log('Advanced search form submitted!');
		e.preventDefault();
		let name = $('#advancedSearchName').val().trim();
		let usage = $('#advancedSearchUsage').val().trim();
		let code = $('#advancedSearchCode').val().trim();
		console.log('Name:', name, 'Usage:', usage, 'Code:', code);
		let results = advancedSearchParts(name, usage, code);
		console.log('Results:', results);
		displayResults(results);
	});

	// 高级检索按钮点击事件
	$('#advancedSearchToggle').on('click', function() {
		console.log('Advanced search toggle clicked!');
		$('#advancedSearchForm').toggle();
	});
});