import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const PieChart = ({ data }) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const total = data.reduce((acc, item) => acc + item.value, 0);

  const renderChart = () => {
    let startAngle = 0;
    let endAngle = 0;
    return data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const strokeDashoffset =
        circleCircumference - (circleCircumference * percentage) / 100;
      const angle = (item.value / total) * 360;

      startAngle = endAngle;
      endAngle += angle;

      return (
        <Circle
          key={index}
          cx="50%"
          cy="50%"
          r={radius}
          stroke={item.color}
          fill="transparent"
          strokeWidth="40"
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          rotation={startAngle}
          originX="90"
          originY="90"
        />
      );
    });
  };

  return (
    <View style={styles.graphWrapper}>
      <Svg height="160" width="160" viewBox="0 0 180 180">
        <G rotation={-90} originX="90" originY="90">
          {total === 0 ? (
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#ffffff"
              fill="transparent"
              strokeWidth="40"
            />
          ) : (
            renderChart()
          )}
        </G>
      </Svg>
      <Text style={styles.label}>{total}</Text>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
  },
});
