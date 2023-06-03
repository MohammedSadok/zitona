import { View, Text, Dimensions } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
const BarChartView = ({ color }) => {
  return (
    <BarChart
      data={{
        labels: [
          "1/1/2015",
          "Févr",
          "Mars",
          "Avr",
          "Mai",
          "Juin",
          "Juil",
          "Août",
          "Sept",
          "Oct",
        ],
        datasets: [
          {
            data: [20, 45, 28, 80, 150, 43, 45, 28, 80, 99],
          },
        ],
      }}
      showBarTops={false}
      width={Dimensions.get("window").width - 16}
      height={220}
      fromZero={true}
      yAxisLabel="1"
      yLabelsOffset={25}
      withInnerLines={false}
      flatColor={true}
      withHorizontalLabels={false}
      // withCustomBarColorFromData={true}
      showValuesOnTopOfBars={true}
      chartConfig={{
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        backgroundGradientFromOpacity: 1,
        backgroundGradientToOpacity: 1,
        fillShadowGradient: color,
        fillShadowGradientOpacity: 1,
        fillShadowGradientToOpacity: 0.6,
        barPercentage: 0.67,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barRadius: 2,
        propsForLabels: {
          fontSize: "10",
        },

        style: {
          borderRadius: 16,
        },
      }}
      style={{
        // marginVertical: 8,

        borderRadius: 16,
        paddingRight: 0,
      }}
    />
  );
};

export default BarChartView;
