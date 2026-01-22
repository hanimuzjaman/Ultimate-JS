/**
 * Module 3: Functions
 * Practice: Temperature Converter
 *
 * Functions for temperature conversion and weather calculations
 * Difficulty: Beginner to Intermediate
 */

// ============================================
// Exercise 1: Basic Temperature Conversions
// ============================================
function exercise1() {
  console.log("Exercise 1: Basic Temperature Conversions\n");

  // Celsius to Fahrenheit: F = (C × 9/5) + 32
  function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  // Fahrenheit to Celsius: C = (F - 32) × 5/9
  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  // Celsius to Kelvin: K = C + 273.15
  function celsiusToKelvin(celsius) {
    return celsius + 273.15;
  }

  // Kelvin to Celsius: C = K - 273.15
  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  console.log("0°C to Fahrenheit:", celsiusToFahrenheit(0)); // 32
  console.log("32°F to Celsius:", fahrenheitToCelsius(32)); // 0
  console.log("25°C to Kelvin:", celsiusToKelvin(25)); // 298.15
  console.log("298.15K to Celsius:", kelvinToCelsius(298.15)); // 25
}

// ============================================
// Exercise 2: Temperature Converter Function
// ============================================
function exercise2() {
  console.log("\nExercise 2: Universal Temperature Converter\n");

  function convertTemperature(value, fromUnit, toUnit) {
    const units = ["C", "F", "K"];

    if (!units.includes(fromUnit) || !units.includes(toUnit)) {
      return "Invalid unit. Use C (Celsius), F (Fahrenheit), or K (Kelvin)";
    }

    // Convert to Celsius first
    let celsius;
    if (fromUnit === "C") celsius = value;
    else if (fromUnit === "F") celsius = ((value - 32) * 5) / 9;
    else if (fromUnit === "K") celsius = value - 273.15;

    // Convert from Celsius to target unit
    let result;
    if (toUnit === "C") result = celsius;
    else if (toUnit === "F") result = (celsius * 9) / 5 + 32;
    else if (toUnit === "K") result = celsius + 273.15;

    return {
      original: `${value}°${fromUnit}`,
      converted: `${result.toFixed(2)}°${toUnit}`,
      exact: result,
    };
  }

  console.log(convertTemperature(0, "C", "F")); // 32°F
  console.log(convertTemperature(100, "C", "F")); // 212°F
  console.log(convertTemperature(98.6, "F", "C")); // 37°C
  console.log(convertTemperature(273.15, "K", "C")); // 0°C
}

// ============================================
// Exercise 3: Temperature Classification
// ============================================
function exercise3() {
  console.log("\nExercise 3: Temperature Classification\n");

  function classifyTemperature(celsius) {
    let classification = "";

    if (celsius < -40) classification = "Extremely Cold";
    else if (celsius < 0) classification = "Freezing";
    else if (celsius < 10) classification = "Cold";
    else if (celsius < 20) classification = "Cool";
    else if (celsius < 30) classification = "Warm";
    else if (celsius < 40) classification = "Hot";
    else classification = "Extremely Hot";

    return {
      temperature: celsius,
      fahrenheit: (celsius * 9) / 5 + 32,
      classification,
    };
  }

  console.log(classifyTemperature(-50)); // Extremely Cold
  console.log(classifyTemperature(5)); // Cold
  console.log(classifyTemperature(25)); // Warm
  console.log(classifyTemperature(45)); // Extremely Hot
}

// ============================================
// Exercise 4: Weather Comfort Index
// ============================================
function exercise4() {
  console.log("\nExercise 4: Weather Comfort Index\n");

  function calculateComfortIndex(celsius) {
    let comfortLevel = 0;
    let recommendation = "";

    if (celsius >= 20 && celsius <= 25) {
      comfortLevel = 10; // Very comfortable
      recommendation = "Perfect weather!";
    } else if (celsius >= 15 && celsius < 20) {
      comfortLevel = 8;
      recommendation = "Comfortable, light jacket recommended";
    } else if (celsius >= 25 && celsius <= 30) {
      comfortLevel = 8;
      recommendation = "Warm, light clothing recommended";
    } else if (celsius >= 10 && celsius < 15) {
      comfortLevel = 6;
      recommendation = "Cool, jacket required";
    } else if (celsius >= 30 && celsius < 35) {
      comfortLevel = 6;
      recommendation = "Hot, stay hydrated";
    } else if (celsius >= 0 && celsius < 10) {
      comfortLevel = 4;
      recommendation = "Cold, warm clothing needed";
    } else if (celsius < 0) {
      comfortLevel = 2;
      recommendation = "Freezing, heavy winter gear required";
    } else {
      comfortLevel = 3;
      recommendation = "Very hot, seek shade and hydrate";
    }

    return {
      temperature: celsius,
      comfortLevel: comfortLevel + "/10",
      recommendation,
    };
  }

  console.log(classifyTemperature(22)); // Perfect
  console.log(classifyTemperature(10)); // Cool
  console.log(classifyTemperature(35)); // Very hot
}

// ============================================
// Exercise 5: Heat Index Calculator
// ============================================
function exercise5() {
  console.log("\nExercise 5: Heat Index (Apparent Temperature)\n");

  function calculateHeatIndex(temperatureF, humidity) {
    if (temperatureF < 80) {
      return {
        temperature: temperatureF,
        humidity,
        heatIndex: temperatureF,
        message: "Heat index equals actual temperature",
      };
    }

    // Simplified heat index formula
    const c1 = -42.379;
    const c2 = 2.04901523;
    const c3 = 10.14333127;
    const c4 = -0.22475541;
    const c5 = -0.00683783;
    const c6 = -0.05481717;
    const c7 = 0.00122874;
    const c8 = 0.00085282;
    const c9 = -0.00000199;

    const T = temperatureF;
    const RH = humidity;

    const HI =
      c1 +
      c2 * T +
      c3 * RH +
      c4 * T * RH +
      c5 * T * T +
      c6 * RH * RH +
      c7 * T * T * RH +
      c8 * T * RH * RH +
      c9 * T * T * RH * RH;

    let caution = "";
    if (HI < 80) caution = "Caution: No significant heat stress";
    else if (HI < 91) caution = "Extreme Caution: Heat cramps possible";
    else if (HI < 104) caution = "Danger: Heat exhaustion possible";
    else caution = "Extreme Danger: Heat stroke likely";

    return {
      actualTemperature: temperatureF,
      humidity: humidity + "%",
      heatIndex: HI.toFixed(1),
      caution,
    };
  }

  console.log(calculateHeatIndex(95, 50)); // Moderate heat index
  console.log(calculateHeatIndex(100, 70)); // High heat index
  console.log(calculateHeatIndex(85, 30)); // Low heat index
}

// ============================================
// Exercise 6: Wind Chill Calculator
// ============================================
function exercise6() {
  console.log("\nExercise 6: Wind Chill Factor\n");

  function calculateWindChill(temperatureF, windSpeedMph) {
    if (temperatureF > 50 || windSpeedMph < 3) {
      return {
        temperature: temperatureF,
        windSpeed: windSpeedMph,
        windChill: temperatureF,
        message: "Wind chill not applicable",
      };
    }

    // Wind chill formula
    const windChill =
      35.74 +
      0.6215 * temperatureF -
      35.75 * Math.pow(windSpeedMph, 0.16) +
      0.4275 * temperatureF * Math.pow(windSpeedMph, 0.16);

    let advisory = "";
    if (windChill > -28)
      advisory = "Caution: Exposed skin may freeze within 30 minutes";
    else if (windChill > -50)
      advisory = "Warning: Exposed skin may freeze within 10 minutes";
    else advisory = "Danger: Exposed skin may freeze within 5 minutes";

    return {
      actualTemperature: temperatureF,
      windSpeed: windSpeedMph + " mph",
      apparentTemperature: windChill.toFixed(1),
      advisory,
    };
  }

  console.log(calculateWindChill(32, 20)); // Below freezing with wind
  console.log(calculateWindChill(0, 30)); // Very cold with high wind
  console.log(calculateWindChill(40, 10)); // Minimal wind chill
}

// ============================================
// Exercise 7: Daily Temperature Range
// ============================================
function exercise7() {
  console.log("\nExercise 7: Daily Temperature Statistics\n");

  function analyzeTemperatures(temperaturesCelsius) {
    const temperatures = [...temperaturesCelsius];
    const min = Math.min(...temperatures);
    const max = Math.max(...temperatures);
    const avg = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
    const range = max - min;

    return {
      count: temperatures.length,
      minimum: min,
      maximum: max,
      average: avg.toFixed(2),
      range,
      fahrenheit: {
        minimum: ((min * 9) / 5 + 32).toFixed(2),
        maximum: ((max * 9) / 5 + 32).toFixed(2),
        average: ((avg * 9) / 5 + 32).toFixed(2),
      },
    };
  }

  const dailyTemps = [18, 20, 22, 24, 25, 23, 19];
  console.log("Daily temperatures analysis:");
  console.log(analyzeTemperatures(dailyTemps));
}

// ============================================
// Exercise 8: Temperature Comparison
// ============================================
function exercise8() {
  console.log("\nExercise 8: Temperature Comparison\n");

  function compareTemperatures(temp1C, temp2C) {
    const difference = Math.abs(temp1C - temp2C);
    const hotter =
      temp1C > temp2C
        ? "Temperature 1"
        : temp2C > temp1C
          ? "Temperature 2"
          : "Equal";

    return {
      temperature1: temp1C + "°C",
      temperature2: temp2C + "°C",
      difference: difference + "°C",
      differenceF: ((difference * 9) / 5).toFixed(2) + "°F",
      hotter,
    };
  }

  console.log(compareTemperatures(25, 30));
  console.log(compareTemperatures(10, 5));
  console.log(compareTemperatures(20, 20));
}

// ============================================
// Exercise 9: Dew Point Calculator
// ============================================
function exercise9() {
  console.log("\nExercise 9: Dew Point Calculation\n");

  function calculateDewPoint(temperatureC, humidity) {
    // Magnus formula for dew point
    const a = 17.27;
    const b = 237.7;

    const numerator =
      (a * temperatureC) / (b + temperatureC) + Math.log(humidity / 100);
    const dewPoint = (b * numerator) / (a - numerator);

    let comfort = "";
    if (dewPoint < 10) comfort = "Dry (comfortable)";
    else if (dewPoint < 15) comfort = "Comfortable";
    else if (dewPoint < 20) comfort = "Humid";
    else if (dewPoint < 25) comfort = "Very humid";
    else comfort = "Oppressive";

    return {
      temperature: temperatureC + "°C",
      humidity: humidity + "%",
      dewPoint: dewPoint.toFixed(2) + "°C",
      comfort,
    };
  }

  console.log(calculateDewPoint(25, 60)); // Comfortable
  console.log(calculateDewPoint(30, 80)); // Oppressive
  console.log(calculateDewPoint(15, 40)); // Dry
}

// ============================================
// Exercise 10: Seasonal Temperature Analyzer
// ============================================
function exercise10() {
  console.log("\nExercise 10: Seasonal Temperature Analyzer\n");

  function analyzeSeason(monthlyAverages) {
    // monthlyAverages should be array of 12 values
    const seasons = {
      winter:
        (monthlyAverages[0] + monthlyAverages[1] + monthlyAverages[11]) / 3,
      spring:
        (monthlyAverages[2] + monthlyAverages[3] + monthlyAverages[4]) / 3,
      summer:
        (monthlyAverages[5] + monthlyAverages[6] + monthlyAverages[7]) / 3,
      autumn:
        (monthlyAverages[8] + monthlyAverages[9] + monthlyAverages[10]) / 3,
    };

    const annual = monthlyAverages.reduce((a, b) => a + b) / 12;

    return {
      winterAvg: seasons.winter.toFixed(2),
      springAvg: seasons.spring.toFixed(2),
      summerAvg: seasons.summer.toFixed(2),
      autumnAvg: seasons.autumn.toFixed(2),
      annualAvg: annual.toFixed(2),
      hottest: Math.max(...Object.values(seasons)).toFixed(2),
      coldest: Math.min(...Object.values(seasons)).toFixed(2),
    };
  }

  // Example monthly averages
  const monthlyTemps = [5, 6, 10, 15, 20, 25, 28, 27, 22, 15, 9, 6];
  console.log("Seasonal analysis:");
  console.log(analyzeSeason(monthlyTemps));
}

// Run all exercises
exercise1();
exercise2();
exercise3();
exercise4();
exercise5();
exercise6();
exercise7();
exercise8();
exercise9();
exercise10();
