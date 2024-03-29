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
          layout={{
            width: 500,
            height: 400,
            title: 'Температура электронного газа (K)',
            xaxis: {
              title: 'x ячейки',
              titlefont: { size: 12 },
            },
            yaxis: {
              title: 'z ячейки',
              titlefont: { size: 12 },
            },
          }}
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
          layout={{
            width: 500,
            height: 400,
            title: 'Температура ионной решётки (К)',
            xaxis: {
              title: 'x ячейки',
              titlefont: { size: 12 },
            },
            yaxis: {
              title: 'z ячейки',
              titlefont: { size: 12 },
            },
          }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Plot
          data={[
            {
              x: time,
              y: pointsY1TimeArray,
              type: 'scatter',
              mode: 'lines',
              name: 'ионная решётка',
            },
            {
              x: time,
              y: pointsY2TimeArray,
              type: 'scatter',
              mode: 'lines',
              name: 'электронный газ',
            },
          ]}
          layout={{
            width: 1000,
            height: 400,
            title: 'Te, Ti',
            xaxis: {
              title: 'время (фс)',
              titlefont: { size: 12 },
            },
            yaxis: {
              title: 'Температура (K)',
              titlefont: { size: 12 },
            },
          }}
        />
      </div>
    </div>
  );
};
