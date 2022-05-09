import Plot from 'react-plotly.js';
import { FC } from 'react';
import { PlotsPropsType } from './types';

export const Plots: FC<PlotsPropsType> = (props) => {
  const { pointsXArray, pointsYArray, pointsTempEArray, pointsTempIArray } = props;

  return (
    <div>
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
          layout={{ width: 500, height: 400, title: 'Electrons' }}
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
          layout={{ width: 500, height: 400, title: 'Lattice' }}
        />
      </div>
      <Plot
        data={[
          {
            x: pointsXArray,
            y: pointsYArray,
            z: pointsTempEArray,
            type: 'heatmap',
          },
        ]}
        layout={{ width: 1000, height: 500, title: 'Electrons heatmap' }}
      />
    </div>
  );
};
