import { useEffect } from "react"
import { useThree } from "@react-three/fiber"

function Camera({ cameraPosition }) {
    const { camera } = useThree()
  
    // can not change the position but can modify its value
    camera.position.z = 7
    camera.position.x = cameraPosition && cameraPosition[0] || 0
    camera.position.y = cameraPosition && cameraPosition[1] || 0
  
  
    // useEffect(() => { console.log(camera) }, [])
    return <perspectiveCamera/>
} 

export default Camera