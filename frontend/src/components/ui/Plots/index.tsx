import Plot from 'react-plotly.js';
import { FC } from 'react';
import { PlotsPropsType } from './types';

export const Plots: FC<PlotsPropsType> = (props) => {
  const {
    pointsY1TimeArray,
    pointsY2TimeArray,
    pointsTempEArray,
    pointsTempIArray,
    pointsYe2Array,
    pointsYi2Array,
    pointsZArray,
    time,
  } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Plot
          data={[
            {
              x: pointsY1TimeArray,
              y: pointsY2TimeArray,
              z: pointsTempEArray,
              type: 'contour',
            },
          ]}
          layout={{ width: 500, height: 400, title: 'Температура электронного газа' }}
        />
        <Plot
          data={[
            {
              x: pointsY1TimeArray,
              y: pointsY2TimeArray,
              z: pointsTempIArray,
              type: 'contour',
            },
          ]}
          layout={{ width: 500, height: 400, title: 'Температура ионной решётки' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Plot
          data={[
            {
              x: pointsZArray,
              y: pointsYe2Array,
              type: 'scatter',
            },
            {
              x: pointsZArray,
              y: pointsYi2Array,
              type: 'scatter',
            },
          ]}
          layout={{
            width: 500,
            height: 400,
            title: 'Te, Ti',
          }}
        />
        <Plot
          data={[
            {
              x: time,
              y: pointsY1TimeArray,
              type: 'scatter',
            },
            {
              x: time,
              y: pointsY2TimeArray,
              type: 'scatter',
            },
          ]}
          layout={{
            width: 500,
            height: 400,
            title: 'Te, Ti',
          }}
        />
      </div>
    </div>
  );
};
