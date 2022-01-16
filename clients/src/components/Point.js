import React, { useEffect, useRef, useState, useMemo, memo } from 'react';

import {  MeshLambertMaterial } from 'three';


function Point({ model, x, y, color, text }) {
    const position = [
        text === "x" ? x+0.45 : x-0.5,
        text === "x" ? y-0.3 : y-0.3,
        0.4
    ]
    const clonedModel = useMemo(() => model.clone(true), [])

    clonedModel.children.forEach((mesh, i) => { mesh.material = new MeshLambertMaterial({ color }) });

    // console.log(clonedModel)

    return (
        <primitive 
            object={clonedModel} 
            scale={0.1} 
            position={position}
        />
    );
}

export default memo(Point);