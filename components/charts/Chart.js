import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LineChart } from "react-native-wagmi-charts";
import TimeChart from "./TimeChart";
import React, { useState, useEffect, useRef } from "react";
import Colors from "../../constants/Colors";
const vw = Dimensions.get("window").width;
const vh = Dimensions.get("window").height;
export default function Chart() {
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const data = useRef();
  const [squares, setSquares] = useState([
    { id: 1, name: "Day", on: true },
    { id: 2, name: "Week", on: false },
    { id: 3, name: "Month", on: false },
    { id: 4, name: "Year", on: false },
  ]);
  useEffect(() => {
    const fetchMarketData = async () => {
      let arrData = [];
      arrData[0] = [
        {
          timestamp: 1625945400000,
          value: 10575.25,
        },
        {
          timestamp: 1625946300000,
          value: 33545.25,
        },
        {
          timestamp: 1625947200000,
          value: 20510.25,
        },
        {
          timestamp: 1625948100000,
          value: 15215.25,
        },
      ];
      arrData[1] = [
        {
          timestamp: 1625945400000,
          value: 33575.25,
        },
        {
          timestamp: 1625946300000,
          value: 33545.25,
        },
        {
          timestamp: 1625947200000,
          value: 33510.25,
        },
        {
          timestamp: 1625948100000,
          value: 3321.25,
        },
      ];
      arrData[2] = [
        {
          timestamp: 1625945400000,
          value: 33575.25,
        },
        {
          timestamp: 1625946300000,
          value: 33545.25,
        },
        {
          timestamp: 1625947200000,
          value: 33510.25,
        },
        {
          timestamp: 1625948100000,
          value: 33215.25,
        },
      ];
      arrData[3] = [
        {
          timestamp: 1625945400000,
          value: 33575.25,
        },
        {
          timestamp: 1625946300000,
          value: 33545.25,
        },
        {
          timestamp: 1625947200000,
          value: 33510.25,
        },
        {
          timestamp: 1625948100000,
          value: 33215.25,
        },
      ];
      setSelectedCoinData(arrData[0]);
      data.current = arrData;
    };
    fetchMarketData();
  }, []);
  const handleClick = (id) =>
    setSquares((prevSquares) => {
      return prevSquares.map((square) => {
        if (square.id === id) {
          setSelectedCoinData(data.current[id - 1]);
          return { ...square, on: true };
        } else {
          return { ...square, on: false };
        }
      });
    });
  return (
    <GestureHandlerRootView style={styles.container}>
      {selectedCoinData ? (
        <>
          <LineChart.Provider data={selectedCoinData}>
            <LineChart width={vw - 30} height={vh * 0.25}>
              <LineChart.Path width={3} color={Colors.blue} />
              <LineChart.CursorCrosshair color={Colors.blue}>
                <LineChart.Tooltip cursorGutter={30} precision={4} />
                <LineChart.Tooltip position="bottom" cursorGutter={10}>
                  <LineChart.DatetimeText />
                </LineChart.Tooltip>
              </LineChart.CursorCrosshair>
            </LineChart>
          </LineChart.Provider>

          <View style={styles.timeContainer}>
            {squares.map((item) => {
              return (
                <TimeChart
                  key={item.id}
                  time={item.name}
                  on={item.on}
                  handleClick={() => handleClick(item.id)}
                />
              );
            })}
          </View>
        </>
      ) : (
        <View className="items-center justify-center h-full">
          <ActivityIndicator size="large" color="blue"></ActivityIndicator>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  timeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "relative",
    bottom: 7,
  },
});
