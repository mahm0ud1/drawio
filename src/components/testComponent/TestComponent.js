import React, { useRef, useEffect } from 'react';
import './App.css';
// import { mxGraph, mxRubberband, mxConstants, mxPerimeter, mxEvent, mxUtils } from 'mxgraph-js';
import mx from 'mxgraph';

const {
  mxGraph,
  mxRubberband,
  mxEvent,
  mxUtils,
  mxConstants,
  mxPerimeter,
  mxDragSource
} = mx({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

const TestComponent = () => {
  const containerRef = useRef(null);
  const graphRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if the graph has already been initialized
    if (graphRef.current) return;

    const graph = new mxGraph(containerRef.current);
    graph.setEnabled(true);
    graph.setConnectable(true);
    graph.setCellsEditable(false);
    graph.setCellsResizable(false);
    graph.setDropEnabled(true);
    graph.setPanning(true);
    graph.setTooltips(true);
    graph.setAllowLoops(false);
    graph.setMultigraph(false);
    graph.setAllowDanglingEdges(false);
    graph.centerZoom = true;

    new mxRubberband(graph);

    // Store the graph instance in the useRef
    graphRef.current = graph;

    // Toolbar for shapes
    const shapes = ['rectangle', 'ellipse', 'triangle'];

    const createShape = (graph, x, y, shape) => {
      const style = `${mxConstants.STYLE_SHAPE}=${shape};${mxConstants.STYLE_STROKECOLOR}=red;${mxConstants.STYLE_FILLCOLOR}=green;`;
      const vertex = graph.insertVertex(graph.getDefaultParent(), null, shape, x, y, 80, 80, style);
    };

    shapes.forEach((shape) => {
      const button = document.createElement('button');
      button.innerHTML = shape;
      graph.container.appendChild(button);
    
      let offsetX = 0;
      let offsetY = 0;
      let isDragging = false;
    
      const onMouseMove = (evt) => {
        if (!isDragging) return;
        graph.container.style.cursor = 'move';
      };
    
      const onMouseDown = (evt) => {
        isDragging = true;
        offsetX = evt.clientX - button.getBoundingClientRect().left;
        offsetY = evt.clientY - button.getBoundingClientRect().top;
        mxEvent.addListener(graph.container, 'mousemove', onMouseMove);
      };
    
      const onMouseUp = (evt) => {
        if (isDragging) {
          const containerBounds = graph.container.getBoundingClientRect();
          const x = mxEvent.getClientX(evt) - offsetX - containerBounds.left - 20;
          const y = mxEvent.getClientY(evt) - offsetY - containerBounds.top - 20;
          const validDropTarget = graph.getCellAt(x, y);
      
          if (validDropTarget === null) {
            createShape(graph, x, y, shape);
          }
      
          graph.container.style.cursor = 'default';
          isDragging = false;
        }
        mxEvent.removeListener(graph.container, 'mousemove', onMouseMove);
      };
    
      mxEvent.addListener(button, 'mousedown', onMouseDown);
      mxEvent.addListener(document, 'mouseup', onMouseUp);
    });
  }, [containerRef]);

  const addClass = () => {
    const graph = graphRef.current;

    const parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try {
      const style = graph.getStylesheet().getDefaultVertexStyle();
      style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
      style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
      style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
      // Build normal
      const v1 = graph.insertVertex(parent, null, 'Class 1', 20, 20, 80, 30);
      const v2 = graph.insertVertex(parent, null, 'Class 2', 200, 20, 80, 30);
      // Build with another shape
      const shape = mxConstants.SHAPE_DOUBLE_ELLIPSE;
      const newStyle = `${mxConstants.STYLE_SHAPE}=${shape};${mxConstants.STYLE_STROKECOLOR}=black;${mxConstants.STYLE_FILLCOLOR}=red;`;
      const v3 = graph.insertVertex(parent, null, 'Class 3', 400, 20, 80, 30, newStyle);

      const edgeStyle = `${mxConstants.STYLE_STARTARROW}=${mxConstants.ARROW_DIAMOND};${mxConstants.STYLE_ENDARROW}=${mxConstants.NONE};${mxConstants.STYLE_STROKECOLOR}=black;`;
      const edge = graph.insertEdge(parent, null, 'test', v2, v3, edgeStyle);

      const e1 = graph.insertEdge(parent, null, 'relation', v1, v2);
      
    } finally {
      graph.getModel().endUpdate();
    }
  }

  const getAllCells = () => {
    const cells = {
      vertices: [],
      edges: [],
    };

    const graph = graphRef.current;
    const parent = graph.getDefaultParent();
    const childCount = graph.model.getChildCount(parent);

    for (let i = 0; i < childCount; i++) {
      const child = graph.model.getChildAt(parent, i);
      if (graph.model.isVertex(child)) {
        cells.vertices.push(child);
      } else if (graph.model.isEdge(child)) {
        cells.edges.push(child);
      }
    }

    return cells;
  };

  const getSelectedObjects = () => {
    const graph = graphRef.current;
    const selectedCells = graph.getSelectionCells();
    console.log(selectedCells)
  }

  return (
    <div className="App">
      <h1>RedHat</h1>
      <div className="toolbar"></div>
      <div onClick={getAllCells}>Print</div>
      <div onClick={getSelectedObjects}>get selected</div>
      <div onClick={addClass}>Add</div>
      <div
        ref={containerRef}
        className="graphContainer"
        style={{ width: '98%', height: '55vh', border: '1px solid black' }}
      ></div>
    </div>
  );
}

export default TestComponent;