import Plot from 'react-plotly.js';
import { FC } from 'react';
import { PlotsPropsType } from './types';

export const Plots: FC<PlotsPropsType> = (props) => {
  const { pointsXArray, pointsYArray, pointsTempEArray, pointsTempIArray } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Plot
        data={[
          {
            x: pointsXArray,
            y: pointsYArray,
            z: pointsTempEArray,
            type: 'contour',
          },
        ]}
        layout={{ width: 500, height: 400, title: 'Температура электронного газа' }}
      />
      <Plot
        data={[
          {
            x: pointsXArray,
            y: pointsYArray,
            z: pointsTempIArray,
            type: 'contour',
          },
        ]}
        layout={{ width: 500, height: 400, title: 'Температура ионной решётки' }}
      />
    </div>
  );
};
