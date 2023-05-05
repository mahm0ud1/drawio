import mxgraph from 'mxgraph';

const mx = mxgraph({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export const {
  mxGraph,
  mxRubberband,
  mxEvent,
  mxUtils,
  mxConstants,
  mxPerimeter,
  mxDragSource,
} = mx;
