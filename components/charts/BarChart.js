import { View, Text, Dimensions } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";
const BarChartView = ({ color,data }) => {
  return (
    <BarChart
      data={data}
      showBarTops={false}
      width={Dimensions.get("window").width - 16}
      height={220}
      fromZero={true}
      yAxisLabel="1"
      // yLabelsOffset={}
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
        barPercentage: 0.5,
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
        paddingRight: 15,
      }}
    />
  );
};

export default BarChartView;
