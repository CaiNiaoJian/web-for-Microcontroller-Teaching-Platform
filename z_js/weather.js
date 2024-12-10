// 和风天气 API 配置
const QWEATHER_KEY = 'd9bb191d8523467abc2725de7740e94d';
const QWEATHER_BASE_URL = 'https://devapi.qweather.com/v7';
const QWEATHER_GEO_URL = 'https://geoapi.qweather.com/v2';

// 天气图标映射
const QWEATHER_ICONS = {
    '100': 'sun', // 晴
    '101': 'cloud-sun', // 多云
    '102': 'cloud-sun', // 少云
    '103': 'cloud', // 晴间多云
    '104': 'cloud', // 阴
    '150': 'moon', // 晴（夜间）
    '151': 'cloud-moon', // 多云（夜间）
    '152': 'cloud-moon', // 少云（夜间）
    '153': 'cloud-moon', // 晴间多云（夜间）
    '300': 'cloud-rain', // 阵雨
    '301': 'cloud-showers-heavy', // 强阵雨
    '302': 'bolt', // 雷阵雨
    '303': 'bolt', // 强雷阵雨
    '304': 'bolt-cloud', // 雷阵雨伴有冰雹
    '305': 'cloud-rain', // 小雨
    '306': 'cloud-rain', // 中雨
    '307': 'cloud-showers-heavy', // 大雨
    '308': 'cloud-showers-heavy', // 极端降雨
    '309': 'cloud-rain', // 毛毛雨/细雨
    '310': 'cloud-showers-heavy', // 暴雨
    '311': 'cloud-showers-heavy', // 大暴雨
    '312': 'cloud-showers-heavy', // 特大暴雨
    '313': 'cloud-rain', // 冻雨
    '314': 'cloud-rain', // 小到中雨
    '315': 'cloud-showers-heavy', // 中到大雨
    '316': 'cloud-showers-heavy', // 大到暴雨
    '317': 'cloud-showers-heavy', // 暴雨到大暴雨
    '318': 'cloud-showers-heavy', // 大暴雨到特大暴雨
    '399': 'cloud-rain', // 雨
    '400': 'snowflake', // 小雪
    '401': 'snowflake', // 中雪
    '402': 'snowflake', // 大雪
    '403': 'snowflake', // 暴雪
    '404': 'cloud-snow', // 雨夹雪
    '405': 'cloud-snow', // 雨雪天气
    '406': 'cloud-snow', // 阵雨夹雪
    '407': 'snowflake', // 阵雪
    '408': 'snowflake', // 小到中雪
    '409': 'snowflake', // 中到大雪
    '410': 'snowflake', // 大到暴雪
    '499': 'snowflake', // 雪
    '500': 'smog', // 薄雾
    '501': 'smog', // 雾
    '502': 'smog', // 霾
    '503': 'dust', // 扬沙
    '504': 'dust', // 浮尘
    '507': 'dust', // 沙尘暴
    '508': 'dust', // 强沙尘暴
    '509': 'smog', // 浓雾
    '510': 'smog', // 强浓雾
    '511': 'smog', // 中度霾
    '512': 'smog', // 重度霾
    '513': 'smog', // 严重霾
    '514': 'fog', // 大雾
    '515': 'fog', // 特强浓雾
    '900': 'sun', // 热
    '901': 'snowflake', // 冷
    '999': 'question' // 未知
};

// 更新时间显示
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');

    // 更新时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    // 更新日期
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    dateElement.textContent = `${year}年${month}月${date}日`;
}

// 获取用户位置
async function getUserLocation() {
    try {
        const position = await new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('浏览器不支持地理位置'));
                return;
            }
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });

        return {
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4)
        };
    } catch (error) {
        console.error('获取位置失败:', error);
        // 默认返回北京坐标
        return {
            latitude: '39.9042',
            longitude: '116.4074'
        };
    }
}

// 获取天气信息
async function getWeather() {
    try {
        // 获取用户位置
        const location = await getUserLocation();
        const locationString = `${location.longitude},${location.latitude}`;
        
        // 并行请求天气和城市信息
        const [weatherResponse, geoResponse] = await Promise.all([
            fetch(`${QWEATHER_BASE_URL}/weather/now?key=${QWEATHER_KEY}&location=${locationString}`),
            fetch(`${QWEATHER_GEO_URL}/city/lookup?key=${QWEATHER_KEY}&location=${locationString}`)
        ]);
        
        if (!weatherResponse.ok || !geoResponse.ok) {
            throw new Error('API请求失败');
        }

        const [weatherData, geoData] = await Promise.all([
            weatherResponse.json(),
            geoResponse.json()
        ]);
        
        if (weatherData.code !== '200' || geoData.code !== '200') {
            throw new Error('API返回数据无效');
        }

        const weather = weatherData.now;
        const city = geoData.location?.[0]?.name || '未知位置';
        
        // 更新显示
        document.getElementById('temperature').textContent = `${weather.temp}°C`;
        document.getElementById('weatherDesc').textContent = weather.text;
        document.getElementById('location').textContent = city;
        
        // 更新天气图标
        const iconName = QWEATHER_ICONS[weather.icon] || 'cloud';
        document.getElementById('weatherIcon').innerHTML = `<i class="fas fa-${iconName}"></i>`;

        // 缓存天气数据
        localStorage.setItem('weatherData', JSON.stringify({
            data: {
                temperature: weather.temp,
                weather: weather.text,
                city: city,
                icon: weather.icon
            },
            timestamp: Date.now()
        }));

    } catch (error) {
        console.error('获取天气信息失败:', error);
        // 使用缓存数据
        const cachedWeather = localStorage.getItem('weatherData');
        if (cachedWeather) {
            const { data, timestamp } = JSON.parse(cachedWeather);
            // 如果缓存时间不超过1小时，使用缓存数据
            if (Date.now() - timestamp < 3600000) {
                document.getElementById('temperature').textContent = `${data.temperature}°C`;
                document.getElementById('weatherDesc').textContent = data.weather;
                document.getElementById('location').textContent = data.city;
                const iconName = QWEATHER_ICONS[data.icon] || 'cloud';
                document.getElementById('weatherIcon').innerHTML = `<i class="fas fa-${iconName}"></i>`;
                return;
            }
        }
        
        // 如果没有缓存或缓存过期，显示默认数据
        document.getElementById('temperature').textContent = '25°C';
        document.getElementById('weatherDesc').textContent = '晴天';
        document.getElementById('location').textContent = '获取位置中...';
        document.getElementById('weatherIcon').innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// 初始化
function init() {
    // 更新时间
    updateTime();
    setInterval(updateTime, 1000);

    // 获取天气信息
    getWeather();
    // 每1.5小时更新一次天气
    setInterval(getWeather, 5400000);  // 90分钟 = 5400000毫秒
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
} 