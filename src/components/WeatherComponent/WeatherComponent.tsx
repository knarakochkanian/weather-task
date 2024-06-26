import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "./WeatherComponent.module.scss";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const API_KEY = '02509b47a795467d2172a0769c982f1d';

interface WeatherData {
    temp: number;
    description: string;
    icon: string;
}

interface HourlyWeatherData {
    time: string;
    temp: number;
    description: string;
    icon: string;
}

interface DailyWeatherData {
    date: string;
    temp: number;
    description: string;
    icon: string;
}

const WeatherComponent: React.FC = () => {
    const convertTemperature = (temp: number, isCelsius: boolean) => {
        return isCelsius ? (temp - 273.15).toFixed(2) : ((temp - 273.15) * 9 / 5 + 32).toFixed(2);
    };

    const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
    const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherData[]>([]);
    const [weeklyWeather, setWeeklyWeather] = useState<DailyWeatherData[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const isCelsius = useSelector((state: RootState) => state.general.isCelsius);
    const city = useSelector((state: RootState) => state.general.city);

    const fetchWeatherData = async (url: string) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    };

    useEffect(() => {
        const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

        const fetchCurrentWeather = async () => {
            const data = await fetchWeatherData(CURRENT_WEATHER_URL);
            if (data) {
                setCurrentWeather({
                    temp: data.main.temp,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                });
            }
        };

        const fetchForecastWeather = async () => {
            const data = await fetchWeatherData(FORECAST_URL);
            if (data) {
                const today = new Date().toISOString().split('T')[0];
                const hourlyData = data.list
                    .filter((item: any) => item.dt_txt.startsWith(selectedDate))
                    .map((item: any) => ({
                        time: item.dt_txt,
                        temp: item.main.temp,
                        description: item.weather[0].description,
                        icon: item.weather[0].icon,
                    }));
                setHourlyWeather(hourlyData);

                const dailyData: { [key: string]: any[] } = {};
                data.list.forEach((item: any) => {
                    const date = item.dt_txt.split(' ')[0];
                    if (!dailyData[date]) {
                        dailyData[date] = [];
                    }
                    dailyData[date].push(item);
                });

                const weeklyData = Object.keys(dailyData).slice(0, 7).map(date => {
                    const dayData = dailyData[date];
                    const avgTemp = dayData.reduce((acc: number, curr: any) => acc + curr.main.temp, 0) / dayData.length;
                    const description = dayData[0].weather[0].description;
                    const icon = dayData[0].weather[0].icon;
                    return {
                        date,
                        temp: avgTemp,
                        description,
                        icon,
                    };
                });
                setWeeklyWeather(weeklyData);
            }
        };

        fetchCurrentWeather();
        fetchForecastWeather();
    }, [city, selectedDate]);

    const handleDayClick = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <div className={styles.Wrapper}>
            {currentWeather ? (
                <div>
                    <div className={styles.WrapperCurrentToday}>
                        <div className={styles.WrapperCurrent}>
                            <h1>Weather in {city}</h1>
                            <p>Temperature: {convertTemperature(currentWeather.temp, isCelsius)}°{isCelsius ? 'C' : 'F'}</p>
                            <img src={`http://openweathermap.org/img/w/${currentWeather.icon}.png`} alt="Weather Icon" />
                            <p className={styles.WrapperCurrentDescription}>{currentWeather.description}</p>
                        </div>
                        <div>
                            <ul className={styles.WrapperHourly}>
                                {hourlyWeather.map((hour, index) => (
                                    <li key={index}>
                                        <p>Time: {new Date(hour.time).toLocaleTimeString()}</p>
                                        <p>Temperature: {convertTemperature(hour.temp, isCelsius)}°{isCelsius ? 'C' : 'F'}</p>
                                        <p>{hour.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <h2>Weekly Weather</h2>
                    <ul className={styles.WrapperDaily}>
                        {weeklyWeather.map((day, index) => (
                            <li key={index} onClick={() => handleDayClick(day.date)}>
                                <p>Date: {new Date(day.date).toLocaleDateString()}</p>
                                <p>Temperature: {convertTemperature(day.temp, isCelsius)}°{isCelsius ? 'C' : 'F'}</p>
                                <p>{day.description}</p>
                                <img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt="Weather Icon" />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default WeatherComponent;
