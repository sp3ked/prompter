import React from "react";
import Wave from "react-wavify";

const Waves = () => {
  return (
    <div className="waves-container">
      <Wave
        fill="#0e7eda"
        paused={false}
        options={{
          height: 180,
          amplitude: 40,
          speed: 0.15,
          points: 3,
        }}
      />
      <Wave
        fill="#0d80dd9e"
        paused={false}
        options={{
          height: 100,
          amplitude: 35,
          speed: 0.2,
          points: 4,
        }}
      />
      <Wave
        fill="#068bf8a4"
        paused={false}
        options={{
          height: 80,
          amplitude: 30,
          speed: 0.25,
          points: 5,
        }}
      />
      <Wave
        fill="#018dff68"
        paused={false}
        options={{
          height: 60,
          amplitude: 25,
          speed: 0.3,
          points: 6,
        }}
      />
    </div>
  );
};

export default Waves;
